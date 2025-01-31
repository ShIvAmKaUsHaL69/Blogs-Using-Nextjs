import Hello from "@/app/components/hello";
export default function Home() {
  console.log('hello')
  return (
    <>
 <h1 className="text-3xl">Welcome to Nextjs</h1>
 <Hello />
</>
  );
}
