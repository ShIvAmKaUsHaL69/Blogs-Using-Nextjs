import SearchForm from "../../components/SearchForm";

export default async function Home({ searchParams }: {
  searchParams: Promise<{ query?: string}>
} ) {

  const query = (await searchParams).query;
  return (
  <>
    <section className="pink_container">
      <h1 className="heading">Share Your Voice, <br /> Inspire the World</h1>
      <p className="sub-heading !max-w-3xl">A place to write, connect, and be heard</p>
      <SearchForm query={query}/>
    </section>
    
  </>
  );
}
