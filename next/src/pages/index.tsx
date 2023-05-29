import groq from "groq";
import client from "../../client";
import Layout from "../components/Layout/Layout";
import RecipeCard from "@/components/RecipeCard";
import Link from "next/link";
import Banner from "@/components/Banner/Banner";

const Home = ({ featured }) => {
  return (
    <Layout>
      <div style={{ minHeight: "90vh" }}>
        <div style={{ margin: "60px 0" }}>
          <Banner />
        </div>
        <h1>Our Latest Recipes</h1>
        <div style={{ display: "flex", flexGrow: 1, gap: "8px" }}>
          {featured.items.map((item) => {
            return (
              <RecipeCard
                key={item.title}
                author={item.authorName}
                image={item.mainImage}
                title={item.title}
                link={`/posts/${item.slug}`}
              />
            );
          })}
        </div>
        <h2>
          ...not interested in these?
          <span>
            <Link href={"/posts"} style={{ color: "#CC6A4D" }}>
              See other {featured.total}
            </Link>
          </span>
        </h2>
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  const featured = await client.fetch(
    groq`{
      "items": *[_type == "post"] | order(publishedAt desc)[0...3] {
        "slug": slug.current,
        title,
        mainImage,
        "authorName": author->name
      },
      "total": count(*[_type == "post"]) 
    }`
  );

  return { props: { featured } };
}

export default Home;
