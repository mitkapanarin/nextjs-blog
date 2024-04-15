import BlogContent from "@/components/BlogContent";
import Hero from "@/components/Hero";
import { client } from "../../../sanity/lib/client";
import { groq } from "next-sanity";
import Features from "@/components/Features";
import About from "@/components/About";

export const revalidate = 30;
const query = groq`*[_type == 'post']{
  ...,
  author->,
  categories[]->
} | order(_createdAt asc)`;

export default async function Home() {
  const posts = await client.fetch(query);

  return (
    <main>
      <Hero />
      <BlogContent posts={posts} />
      <Features />
      <About />
    </main>
  );
}
