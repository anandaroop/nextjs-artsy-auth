import { useUser } from "../lib/hooks";
import Link from "next/link";

export const Header = () => {
  const user = useUser();

  return (
    <>
      <header>
        <nav>
          {user && (
            <>
              <Link href="/">
                <a>Home</a>
              </Link>
              <Link href="/authenticated">
                <a>Authenticated page</a>
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
      </header>

      <style jsx>{`
        header {
          background: black;
          color: white;
        }
        nav {
          display: flex;
          justify-content: flex-end;
        }
        a {
          padding: 1em;
        }
      `}</style>
    </>
  );
};
