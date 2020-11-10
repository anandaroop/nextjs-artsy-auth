import Head from "next/head"
import Link from "next/link"
import { useUser, useMetaphysics } from "../lib/hooks"

export default function Page() {
  const user = useUser({ redirectTo: "/login" })

  const query = `
    query {
      artistSeriesConnection {
        edges {
          node {
            slug
            title
            artists {
              slug
              name
            }
            forSaleArtworksCount
            image {
              url(version: "small")
            }
          }
        }
      }
    }
  `
  const variables = {}

  const { data, error, isLoading } = useMetaphysics(query, variables)

  if (!user) return null

  if (error) return <div>Error! {JSON.stringify({ data, error })}</div>

  const artistSeriesList =
    isLoading || data?.artistSeriesConnection.edges.map(({ node }) => node)

  return (
    <>
      <div>
        <Head>
          <title>Metaphysics</title>
        </Head>

        <h1>Artist series</h1>

        {isLoading ? (
          "Loading…"
        ) : (
          <table>
            <tbody>
              {artistSeriesList.map((series) => {
                return (
                  <tr>
                    <td className="image">
                      <img src={series.image?.url} alt={series.title} />
                    </td>
                    <td className="title">
                      <Link
                        href="/artist-series/[slug]"
                        as={`/artist-series/${series.slug}`}
                      >
                        <a>
                          {series.artists.map((a) => a.name).join(", ")}:{" "}
                          {series.title}
                        </a>
                      </Link>
                    </td>
                    <td className="counts">
                      {series.forSaleArtworksCount} available
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>

      <style jsx>{`
        td {
          padding: 0.5em;
        }

        td.image {
          text-align: right;
        }

        td.image img {
          max-width: 72px;
          max-height: 72px;
        }

        td.title a {
          padding: 1em;
        }
      `}</style>
    </>
  )
}
