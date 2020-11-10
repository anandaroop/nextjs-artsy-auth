import Head from "next/head"
import { useUser, useMetaphysics } from "../lib/hooks"

export default function Page() {
  const user = useUser({ redirectTo: "/login" })

  const query = `
    query($slug: ID!) {
      artistSeries(id: $slug) {
        internalID
        slug
        title
        description
        artists {
          name
        }
        artworksConnection(first: 10) {
          totalCount
          edges {
            node {
              internalID
              title
              imageUrl
            }
          }
        }
      }
    }
  `
  const variables = {
    slug: "kaws-tweety",
  }

  const { data, error, isLoading } = useMetaphysics(query, variables)

  if (!user) return null

  if (error) return <div>Error! {JSON.stringify({ data, error })}</div>

  const artistSeries = isLoading || data?.artistSeries

  return (
    <div>
      <Head>
        <title>Metaphysics</title>
      </Head>

      <p>
        <em>This page makes a request to Metaphysics</em>
      </p>

      {isLoading ? (
        "Loading…"
      ) : (
        <>
          <h1>
            {artistSeries.artists.map((a) => a.name).join(", ")}:{" "}
            {artistSeries.title}
          </h1>

          <div style={{ marginBottom: "2em" }}>{artistSeries.description}</div>

          {artistSeries.artworksConnection.edges.map(({ node }) => {
            return (
              <div key={node.internalID}>
                <h2>{node.title}</h2>
                <img src={node.imageUrl} alt={node.title} />
              </div>
            )
          })}
        </>
      )}
    </div>
  )
}
