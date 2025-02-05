
import BlogCard from "@/components/BlogCard";
import SearchForm from "../../components/SearchForm";
import { client } from "@/sanity/lib/client";
import { BLOGS_QUERY } from "@/sanity/lib/queries";

export default async function Home({ searchParams }: {
  searchParams: Promise<{ query?: string}>
} ) {

  const query = (await searchParams).query;

  const params = {search : query || null};

  const post = await client.fetch(BLOGS_QUERY, params);

  console.log(JSON.stringify(post, null, 2))

  return (
  <>
    <section className="pink_container">
      <h1 className="heading">Share Your Voice, <br /> Inspire the World</h1>
      <p className="sub-heading !max-w-3xl">A place to write, connect, and be heard</p>
      <SearchForm query={query}/>
    </section>
    <section className="section_container">
      <p className="text-30-semibold">
        {query ? `Search results for "${query}"` : 'All Blogs'} 
      </p>
      <ul className="mt-7 card_grid">
        {post?.length > 0 ?(
          post.map((BlogCardType,i) => (<BlogCard key={post?._id} post={BlogCardType}/>))
        ) : (<p className="no-results">No Blogs found</p>)}
      </ul>

    </section>
    
  </>
  );
}
