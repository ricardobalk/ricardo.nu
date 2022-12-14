# Personal Link Collection

This is my personal link collection, built with Nuxt 3 (Vite, Vue 3, TypeScript, PostCSS and TailwindCSS).

## Setup

Make sure to install the dependencies

```bash
yarn install
```

## Development

Start the development server on http://localhost:3000

```bash
yarn dev
```

## Production

Build the static page with:

```bash
yarn generate
```

Then, put it on a webserver. The real pros put it on the server with `rsync`:
  
```bash
rsync -avz --delete dist/ username@some-server:/var/www/domains/example.com
```

You could also use third-party hosting for it. For example, Vercel, Netlify, or Heroku. You can also put your build on a 1,44M diskette. Pro tip: be sure to bundle and compress it with `tar cJf` :wink:.