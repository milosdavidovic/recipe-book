// post.tsx
import Link from "next/link";
import client from "../../../client";
import groq from "groq";
import { PortableText } from "@portabletext/react";
import Layout from "../../components/Layout/Layout";
import { PostModel } from "@/types/sanity";
import { ptComponents } from "@/helpers/sanityPortableText";
import RatioImage from "@/components/RatioImage/RatioImage";
import Chip from "@/components/Chip";
import BackButton from "@/components/BackButton";
import AboutAuthor from "@/components/AboutAuthor";

const Post = ({ post }: { post: PostModel }) => {
  return (
    <Layout>
      <div>
        <Link href="/posts">
          <BackButton style={{ marginLeft: "-100px", position: "absolute" }} />
        </Link>
      </div>
      <article>
        <h1>{post.title}</h1>
        <PortableText value={post.body} components={ptComponents()} />
        <br />
        {post.mainImage && <RatioImage image={post.mainImage} />}
        <br />
        <h4>Ingredients ({post.servings} servings):</h4>
        <ul>
          {post.ingredients.map((ing) => {
            return (
              <li key={ing.text}>
                {ing.text} ({ing.amount})
              </li>
            );
          })}
        </ul>
        <h4>Preparation ({post.prepTime}):</h4>
        <ol>
          {post.steps.map((step) => {
            return <li key={step.slice(0, 20)}>{step}</li>;
          })}
        </ol>
        <div>
          <h4>Categories:</h4>
          <div style={{ display: "inline-flex", gap: "4px" }}>
            {post.categories.map((c) => (
              <Chip key={c} text={c}></Chip>
            ))}
          </div>
        </div>

        <div>
          <h4>About author</h4>
          <AboutAuthor
            name={post.authorName}
            image={post.authorImage}
            description={post.authorBio}
          />
        </div>
      </article>
    </Layout>
  );
};

export async function getStaticPaths() {
  const paths = await client.fetch(
    groq`*[_type == "post" && defined(slug.current)][].slug.current`
  );

  const params = paths.map((path: string) => ({
    params: { slug: path },
  }));
  return {
    paths: params,
    fallback: false,
  };
}

export async function getStaticProps(context: { params: { slug: string } }) {
  const { slug = "" } = context.params;

  const post = await client.fetch(
    groq`
    *[_type == "post" && slug.current == $slug][0]{
      _id,
      title,
      mainImage,
      "categories":  categories[]->title,
      body,
      "authorName": author->name,
      "authorImage": author->image,
      "authorBio": author->bio,
      ingredients,
      steps,
      servings,
      prepTime
      }
  `,
    { slug }
  );

  return { props: { post } };
}

export default Post;
