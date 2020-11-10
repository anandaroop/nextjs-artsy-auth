import Head from "next/head"
import { useUser, useGravity } from "../lib/hooks"

export default function Page() {
  const user = useUser({ redirectTo: "/login" })

  const {
    data: artist,
    error: artistError,
    isLoading: artistIsLoading,
  } = useGravity("artist/yayoi-kusama")

  const {
    data: genome,
    error: genomeError,
    isLoading: genomeIsLoading,
  } = useGravity("artist/yayoi-kusama/genome")

  if (!user) return null

  if (artistError || genomeError)
    return <div>Error! {JSON.stringify([artistError, genomeError])}</div>

  return (
    <div>
      <Head>
        <title>Gravity</title>
      </Head>

      <p>
        <em>
          This page makes two requests to Gravity, one of which requires the
          "admin" role
        </em>
      </p>

      {artistIsLoading ? (
        "Loading artist data…"
      ) : (
        <>
          <h1>{artist.name}</h1>

          <h2>Attributes</h2>

          <dl>
            {Object.entries(artist).map(([key, value]) => {
              return (
                <>
                  <dt>{key}</dt>
                  <dd>{JSON.stringify(value)}</dd>
                </>
              )
            })}
          </dl>
        </>
      )}

      <br />

      {genomeIsLoading ? (
        "Loading genome data…"
      ) : (
        <>
          <h2>Genome</h2>

          <dl>
            {Object.entries(genome.genes).map(([key, value]) => {
              return (
                <>
                  <dt>{key}</dt>
                  <dd>
                    <div
                      style={{
                        width: `${value}%`,
                        // height: "1em",
                        background: "#ccc",
                        color: "#999",
                        padding: "0.25em",
                      }}
                    >
                      {value}
                    </div>
                  </dd>
                </>
              )
            })}
          </dl>
        </>
      )}
    </div>
  )
}
