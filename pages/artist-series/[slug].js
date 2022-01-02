import Head from "next/head";
import Link from "next/link";
import { useRouter } from 'next/router'
import { useUser, useMetaphysics } from "../../lib/hooks";

export default function Page() {
  const user = useUser({ redirectTo: "/login" });

  const query = `
    query ShowArtistSeries($slug: ID!) {
      artistSeries(id: $slug) {
        internalID
        slug
        title
        description
        artists {
          name
        }
        filterArtworksConnection(first: 100) {
          counts {
            total
          }
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
  `;

  const router = useRouter()
  const { slug } = router.query

  const variables = { slug };

  const { data, error, isLoading } = useMetaphysics(query, variables);

  if (!user) return null;

  if (error) return <div>Error! {JSON.stringify({ data, error })}</div>;

  const artistSeries = isLoading || data?.artistSeries;

  return (
    <div>
      <Head>
        <title>Metaphysics</title>
      </Head>

      <p>
        &larr; <Link href="/artist-series"><a>Back to all artist series</a></Link>
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

          {artistSeries.filterArtworksConnection.edges.map(({ node }) => {
            return (
              <div key={node.internalID}>
                <h2>{node.title}</h2>
                <img src={node.imageUrl} alt={node.title} />
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
