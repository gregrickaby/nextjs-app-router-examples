# Contributing <!-- omit in toc -->

Here are the ways to get involved with this project:

- [Contributing Code](#contributing-code)
- [Local Setup](#local-setup)
  - [Git Workflow](#git-workflow)
  - [NPM Scripts](#npm-scripts)
  - [Vercel CLI](#vercel-cli)
- [Legal Stuff](#legal-stuff)

---

## Contributing Code

Found a bug you can fix? Fantastic! Patches are always welcome. Here are the steps to get up and running:

---

## Local Setup

Get the code:

```bash
npx create-next-app --example https://github.com/gregrickaby/nextjs-app-router-examples nextjs-app-router-examples
# or
yarn create next-app --example https://github.com/gregrickaby/nextjs-app-router-examples nextjs-app-router-examples
# or
pnpm create next-app --example https://github.com/gregrickaby/nextjs-app-router-examples nextjs-app-router-examples
```

Copy ENV variables:

```bash
cp .env.example .env.local
```

Configure the `.env.local` file:

```text
GOOGLE_MAPS_API_KEY="YOUR-KEY-HERE"
WEATHERAPI_KEY="YOUR-KEY-HERE"
NEXT_PUBLIC_WORDPRESS_URL="https://wordpress.nextjswp.com/graphql"
```

Both services offer free plans. You can get your own keys here:

- [Google Maps API key](https://developers.google.com/maps/documentation/javascript/get-api-key)
- [Weather API key](https://www.weatherapi.com/)

Feel free to leave the `NEXT_PUBLIC_WORDPRESS_URL` as-is. It's a public GraphQL endpoint for a WordPress site I maintain.

Finally, start the dev server:

```bash
npm run dev
```

---

### Git Workflow

1. Fork the repo and create a feature/patch branch off `main`
2. Work locally adhering to coding standards
3. Run `npm run lint`
4. Make sure the app builds locally with `npm run build && npm run start`
5. Push your code, open a PR, and fill out the PR template
6. After peer review, the PR will be merged back into `main`
7. Repeat ♻️

> Your PR must pass automated assertions, deploy to Vercel successfully, and pass a peer review before it can be merged.

---

### NPM Scripts

Start local dev server:

```bash
npm run dev
```

Lint code:

```bash
npm run lint
```

Test a build prior to deployment:

```bash
npm run build && npm start
```

---

### Vercel CLI

I've found that running `vercel` locally is a great way to verify Edge Functions and Middleware are working as expected.

To install the [Vercel CLI](https://vercel.com/docs/cli), run:

```bash
npm i -g vercel
```

Start a Vercel development server locally:

```bash
vercel dev
```

---

## Legal Stuff

This repo is maintained by [Greg Rickaby](https://gregrickaby.com/). By contributing code you grant its use under the [MIT](https://github.com/gregrickaby/nextjs-app-router-examples/blob/main/LICENSE).

---
