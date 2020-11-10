import Head from "next/head"
import { useUser } from "../lib/hooks"

export default function Page() {
  const user = useUser({ redirectTo: "/login" })

  if (!user) return null

  return (
    <div>
      <Head>
        <title>Authenticated</title>
      </Head>

      <h1>Welcome to Artsy!</h1>

      <p>This page requires a valid login. Here's your current session info:</p>

      <div>
        <pre>
          {user &&
            JSON.stringify({ ...user, accessToken: "REDACTED" }, null, 2)}
        </pre>
      </div>
    </div>
  )
}
