import { timingSafeEqual } from 'node:crypto'
import { Hono } from 'hono'

// Only the fields the echo bot reads. Telegram sends many more.
type Update = {
  update_id: number
  message?: {
    message_id: number
    chat: { id: number }
  }
}

const SECRET_HEADER = 'X-Telegram-Bot-Api-Secret-Token'

function isTelegram(header: string | undefined): boolean {
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET
  if (!secret || !header) return false
  const a = Buffer.from(header)
  const b = Buffer.from(secret)
  return a.length === b.length && timingSafeEqual(a, b)
}

const telegram = new Hono()

telegram.post('/webhook', async (c) => {
  if (!isTelegram(c.req.header(SECRET_HEADER))) {
    return c.text('Unauthorized', 401)
  }

  const update = await c.req.json<Update>()
  const message = update.message
  // Edited messages, button presses, etc. are acknowledged and ignored.
  if (!message) return c.body(null, 200)

  // Answer the webhook with a Bot API call: Telegram runs copyMessage for us,
  // which resends any kind of message (text, photo, sticker, voice, ...).
  // Service messages can't be copied; Telegram drops those silently.
  return c.json({
    method: 'copyMessage',
    chat_id: message.chat.id,
    from_chat_id: message.chat.id,
    message_id: message.message_id,
  })
})

export default telegram
