// Registers this server's webhook with Telegram.
// Usage: npm run webhook:set -- https://your-host.example.com
const base = process.argv[2]
const token = process.env.TELEGRAM_BOT_TOKEN
const secret = process.env.TELEGRAM_WEBHOOK_SECRET

if (!base || !token || !secret) {
  console.error('Usage: npm run webhook:set -- <public https base url>')
  console.error('Needs TELEGRAM_BOT_TOKEN and TELEGRAM_WEBHOOK_SECRET in .env')
  process.exit(1)
}

const res = await fetch(`https://api.telegram.org/bot${token}/setWebhook`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    url: new URL('/telegram/webhook', base).href,
    secret_token: secret,
    allowed_updates: ['message'],
  }),
})
console.log(await res.json())
