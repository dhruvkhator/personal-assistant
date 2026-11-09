```
npm install
npm run dev
```

```
open http://localhost:3000
```

## Telegram echo bot

`POST /telegram/webhook` receives Telegram updates and sends every message back to its sender: text, photos, stickers, voice notes and so on.

1. Put `TELEGRAM_BOT_TOKEN` (from @BotFather) and `TELEGRAM_WEBHOOK_SECRET` in `.env`. The secret is 1 to 256 characters from `A-Z`, `a-z`, `0-9`, `_` and `-`.
2. Deploy, or expose your local server over public HTTPS (for example with a tunnel). Telegram only calls HTTPS URLs on ports 443, 80, 88 or 8443.
3. Register the webhook:

   ```
   npm run webhook:set -- https://your-host.example.com
   ```

Requests without the matching `X-Telegram-Bot-Api-Secret-Token` header get a 401.
