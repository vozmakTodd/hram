# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# yarn
yarn dev
```

## Production

Build the application for production:

```bash
# yarn
yarn build
```

Locally preview production build:

```bash
# yarn
yarn preview
```

Make sure that you filled all necessary environment variables

- MONGODB_URI - Mongo db address (ex. "mongodb://admin:password@localhost:27017")
- NUXT_MAIL_HOST - smtp host (ex. "smtp.example.email")
- NUXT_MAIL_PORT - smtp port (ex. "587")
- NUXT_MAIL_USER - mail-box address (ex. "info@example.com")
- NUXT_MAIL_PASS - mail-box password
- NUXT_MAIL_ORDER_RECIPIENT - mail-box address that will receive information about orders
- NUXT_AUTH_SECRET - secret key for auth
- NUXT_ROOT_LOGIN - root user login (for administrator)
- NUXT_ROOT_PASS - root user password (for administrator)
- ORIGIN_URL - origin url (ex. example.com)
- SHOP_ID - shop id from yookassa shop
- SECRET_KEY - shop secret auth key for yookassa shop

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
