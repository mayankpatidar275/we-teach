This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# Build the images

docker compose build

# Tag and push the we-teach_we-teach image

docker tag we-teach_we-teach:latest mkpatidar/we-teach:latest
docker push mkpatidar/we-teach:latest

# Tag and push the we-teach_keyboard-drum image

docker tag we-teach_keyboard-drum:latest mkpatidar/keyboard-drum:latest
docker push mkpatidar/keyboard-drum:latest

# Tag and push the we-teach_bubble-game image

docker tag we-teach_bubble-game:latest mkpatidar/bubble-game:latest
docker push mkpatidar/bubble-game:latest

# Tag and push the we-teach_runner-game image

docker tag we-teach_runner-game:latest mkpatidar/runner-game:latest
docker push mkpatidar/runner-game:latest

# Tag and push the we-teach_api-gateway image

docker tag we-teach_api-gateway:latest mkpatidar/api-gateway:latest
docker push mkpatidar/api-gateway:latest
