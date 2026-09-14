# Telegram delivery on REG.RU

The public site sends the form to `/api/inquiry.php`. The production package is
prepared with:

```sh
npm run build:reg-ru
```

Upload the contents of `deploy-reg-ru` to the website document root.

Create `telegram-config.php` one level above that document root using
`telegram-config.example.php` as the template. The real bot token must never be
placed in the website directory or committed to Git.

The server needs PHP with the cURL extension enabled. After deployment, submit
one synthetic test application and confirm that it arrives in the intended
Telegram chat.
