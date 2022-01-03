import { useUser } from "../lib/hooks"
import Link from "next/link"

export const Header = () => {
  const user = useUser()

  return (
    <>
      <header>
        <Nav user={user} />
      </header>

      <style jsx>{`
        header {
          background: black;
          color: white;
        }
      `}</style>
    </>
  )
}

const Nav: React.FC<{ user: unknown }> = ({ user }) => {
  return (
    <>
      <nav>
        {user && (
          <>
            <Link href="/">
              <a>Home</a>
            </Link>
            <Link href="/authenticated">
              <a>Authenticated page</a>
            </Link>
            <Link href="/gravity">
              <a>Gravity example</a>
            </Link>
            <Link href="/metaphysics">
              <a>Metaphysics example</a>
            </Link>
            <Link href="/artist-series">
              <a>Artist series</a>
            </Link>
            <Link href="/api/logout">
              <a>Logout</a>
            </Link>
          </>
        )}

        {!user && (
          <Link href="/login">
            <a>Login</a>
          </Link>
        )}
      </nav>

      <style jsx>{`
        nav {
          display: flex;
          justify-content: flex-end;
        }
        a {
          padding: 1em 1.25em;
          text-decoration: none;
        }
        a:hover {
          background: #333;
          text-decoration: underline;
        }
      `}</style>
    </>
  )
}
