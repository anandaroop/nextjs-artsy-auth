
# Next.js Artsy Auth

<img style="max-height: 400px" alt="pumpkins" src="https://user-images.githubusercontent.com/140521/89754650-c43f4e00-daaa-11ea-8e3c-a7dd745ce587.png">

A proof-of-concept Next.js app that can:

- Authenticate with Gravity and create a user session
- Support two-factor authentication
- Support Vercel's [SWR](https://swr.vercel.app) for data fetching with caching, deduping, revalidating etc
- Provide custom hooks (useGravity, useMetaphysics) to further simplify data fetching from Artsy sources
- Render some sample pages using data from Gravity and Metaphysics

**[➽ See the step-by-step commit history](https://github.com/anandaroop/nextjs-artsy-auth/commits/master) to see how this was put together**

## Use this app as a starter

You may use this app as a starting point for your own Next app by using the `yarn create` command as follows:

```sh
yarn create next-app my-artsy-nextjs-app --example https://github.com/anandaroop/nextjs-artsy-auth

cp .env.local.example .env.local
```

This uses the [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) command to create a new Next.js app, configured the same was as this one. You need only update `.env.local` with credentials for a valid Gravity `ClientApplication`.
