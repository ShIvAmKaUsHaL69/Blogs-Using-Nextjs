
import BlogCard, { Blogcardskeleton } from "@/components/BlogCard";
import SearchForm from "../../components/SearchForm";
import { BLOGS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";
import { Suspense } from "react";

export default async function Home({ searchParams }: {
  searchParams: Promise<{ query?: string}>
} ) {

  const query = (await searchParams).query;

  const params = {search : query || null};

  const session = await auth();

  // const post = await client.fetch(BLOGS_QUERY, params);
  const {data:post} = await sanityFetch({query: BLOGS_QUERY, params})


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
        <Suspense fallback={<Blogcardskeleton />}>
        {post?.length > 0 ?(
          post.map((BlogCardType,i) => (<BlogCard key={BlogCardType?._id} post={BlogCardType}/>))
        ) : (<p className="no-results">No Blogs found</p>)}
        </Suspense>
      </ul>

    </section>
    
    <SanityLive />
  </>
  );
}
