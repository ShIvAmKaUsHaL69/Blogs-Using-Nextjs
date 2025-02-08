import { auth } from "@/auth";
import Blogform from "@/components/Blogform";
import { redirect } from "next/navigation";

export default async function page() {
    const session = await auth();
    if(!session) redirect('/');
  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <h1 className="heading">Create a New Blog</h1>
      </section>
      <section>
        <Blogform/>
      </section>
    </>
  )
}
