import Head from "next/head";

export default function Page() {
  return (
    <div>
      <Head>
        <title>Authenticated</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Welcome to Artsy!</h1>

      <p>This page should require a valid login.</p>
    </div>
  );
}
