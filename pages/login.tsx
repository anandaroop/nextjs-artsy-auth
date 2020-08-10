import { useState, FormEvent } from "react";

import { useUser } from "../lib/hooks";

const Login = () => {
  const user = useUser({ redirectIfFound: true, redirectTo: "/" });

  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (errorMsg) setErrorMsg("");

    const form = e.currentTarget as HTMLFormElement;

    const body = {
      username: form.username.value,
      password: form.password.value,
    };

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        window.location.href = "/";
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setErrorMsg(error.message);
    }
  }

  return (
    !user && (
      <>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Username
              <input type="text" name="username" required />
            </label>
          </div>
          <div>
            <label>
              Password
              <input type="password" name="password" required />
            </label>
          </div>
          <div>
            <button type="submit">Login</button>
          </div>

          {errorMsg && <div className="error">{errorMsg}</div>}
        </form>

        <style jsx>{`
          div {
            width: 20em;
            margin: 1em auto;
          }

          input {
            margin: 0.25em 0;
            width: 100%;
          }

          input,
          button {
            font-size: 1rem;
            padding: 0.25em;
          }

          .error {
            color: red;
          }
        `}</style>
      </>
    )
  );
};

export default Login;
