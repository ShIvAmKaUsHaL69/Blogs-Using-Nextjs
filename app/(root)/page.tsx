
import BlogCard from "@/components/BlogCard";
import SearchForm from "../../components/SearchForm";

export default async function Home({ searchParams }: {
  searchParams: Promise<{ query?: string}>
} ) {

  const query = (await searchParams).query;

  const post = [{ _createdAt: new Date(),
                  views: 55,
                  author: { _id: 1, name: 'shivam' },
                  _id: 1,
                  description: 'this is a description.',
                  image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Minecraft-creeper-face.jpg/800px-Minecraft-creeper-face.jpg',
                  category: 'Robots',
                  title: 'We Robots',
               },
              ];
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
          post.map((BlogCardType,i) => (<BlogCard key={BlogCardType._id} post={BlogCardType}/>))
        ) : (<p className="no-results">No Blogs found</p>)}
      </ul>

    </section>
    
  </>
  );
}
