// Cloudflare Single Redirect: docs.tokeness.io -> docs.tokeness.ai (301, preserve path + query).
//
// Why not Cloudflare Pages `_redirects`? Pages redirects have no hostname condition and apply
// to every custom domain bound to the project. If both docs.tokeness.io and docs.tokeness.ai
// were bound, a catch-all `/* https://docs.tokeness.ai/:splat 301` would also redirect the
// .ai domain to itself (redirect loop); and today docs.tokeness.io does not even reach Pages
// (its DNS points elsewhere). The redirect must live at the zone level as a Single Redirect.
//
// Prerequisites (verify before running):
//   1. The tokeness.io zone is hosted on Cloudflare.
//   2. docs.tokeness.io has a DNS record in that zone with proxying enabled (orange cloud)
//      so the request reaches the Cloudflare edge and the rule can fire. A placeholder A
//      record (e.g. 192.0.2.1) is enough because the rule redirects before any origin lookup.
//
// Usage:
//   CF_API_TOKEN=<token> CF_ZONE_ID=<zone-id> node scripts/setup-docs-301.mjs
//
// Idempotent: it updates the http_request_dynamic_redirect phase entrypoint, replacing any
// rule with the same description. Run it again to apply changes.
const CF_API_TOKEN = process.env.CF_API_TOKEN
const CF_ZONE_ID = process.env.CF_ZONE_ID

const SOURCE = 'docs.tokeness.io'
const TARGET = 'https://docs.tokeness.ai'
const RULE_DESCRIPTION = '301 docs.tokeness.io -> docs.tokeness.ai'

if (!CF_API_TOKEN || !CF_ZONE_ID) {
  console.error('Missing CF_API_TOKEN or CF_ZONE_ID environment variables')
  process.exit(1)
}

const ENDPOINT = `https://api.cloudflare.com/client/v4/zones/${CF_ZONE_ID}/rulesets/phases/http_request_dynamic_redirect/entrypoint`

const rule = {
  expression: `(http.host eq "${SOURCE}")`,
  description: RULE_DESCRIPTION,
  action: 'redirect',
  action_parameters: {
    from_value: {
      status_code: 301,
      // http.request.uri already contains path + query string, so path and query are preserved.
      target_url: {
        expression: `concat("${TARGET}", http.request.uri)`
      }
    }
  }
}

async function cfRequest(method, url, body) {
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${CF_API_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: body ? JSON.stringify(body) : undefined
  })
  const data = await res.json()
  if (!res.ok || data.success === false) {
    console.error(`Cloudflare ${method} ${url} failed:`, JSON.stringify(data, null, 2))
    process.exit(1)
  }
  return data
}

let existing
try {
  existing = await cfRequest('GET', ENDPOINT)
} catch {
  existing = null // 404 -> no entrypoint yet
}

const currentRules = existing?.result?.rules ?? []
const keptRules = currentRules.filter((r) => r.description !== RULE_DESCRIPTION)
const nextRules = [...keptRules, rule]

await cfRequest('PUT', ENDPOINT, { rules: nextRules })
console.log(`OK: ${SOURCE} -> ${TARGET} 301 configured (${nextRules.length} rule(s) in phase)`)
console.log('Verify with: curl -sSI https://docs.tokeness.io/ | head -1   (expect HTTP/1.1 301)')
