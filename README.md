# Mac Motz

React/Vite portfolio for photographer Mac Motz. This is the second-generation site, rebuilt from the ground up around a cinematic editorial layout and Motion-powered interactions.

## Pages

- `/` — Home: immersive introduction plus featured collections
- `/portfolio` — filterable collection archive
- `/about` — editorial biography and credentials
- `/contact` — inquiry form and direct email

## Run locally

```bash
npm install
npm run dev
```

Use `npm run build` for a production verification/build.

## Stack

- React 19 + Vite
- Tailwind CSS v4
- Motion for React
- React Router for the four-page experience

## Content note

The photographs currently use carefully selected Unsplash stand-ins. Replace their URLs in `src/App.jsx` with Mac’s supplied photography before launch, preserving meaningful alt text.

The contact form has a polished client-side confirmation state, but must be connected to a form endpoint such as Formspree, Basin, or a custom server before launch.
