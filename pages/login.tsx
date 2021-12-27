import { useState, FormEvent } from "react"
import { useUser } from "../lib/hooks"

const TWO_FACTOR_MISSING_RESPONSE = /invalid.*code/

const Login = () => {
  const user = useUser({ redirectIfFound: true, redirectTo: "/" })

  const [errorMsg, setErrorMsg] = useState("")
  const [isTwoFactorEnabled, setTwoFactorEnabled] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (errorMsg) setErrorMsg("")

    const form = e.currentTarget as HTMLFormElement

    const body = {
      username: form.username.value,
      password: form.password.value,
      otp: form.otp.value,
    }

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      if (res.status === 200) {
        window.location.href = "/"
      } else {
        throw new Error(await res.text())
      }
    } catch (error) {
      if (error.message.match(TWO_FACTOR_MISSING_RESPONSE)) {
        setErrorMsg("Please supply two-factor authentication code")
        setTwoFactorEnabled(true)
      } else {
        console.error("An unexpected error occurred:", error)
        setErrorMsg(error.message)
      }
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
          <div
            className={isTwoFactorEnabled ? "otp-field revealed" : "otp-field"}
          >
            <label>
              Authentication code
              <input type="text" name="otp" disabled={!isTwoFactorEnabled} />
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

          label,
          input,
          button {
            font-size: 1em;
            line-height: 1em;
            padding: 0.25em 0;
            margin: 0.25em 0;
          }

          input {
            padding: 0.25em;
            width: 100%;
          }

          .otp-field {
            visibility: hidden;
            height: 0;
            opacity: 0;
            overflow: hidden;
            transition: height 0.2s, opacity 0.4s;
          }

          .otp-field.revealed {
            visibility: visible;
            height: 3.5em;
            opacity: 1;
          }

          .error {
            color: red;
          }
        `}</style>
      </>
    )
  )
}

export default Login
