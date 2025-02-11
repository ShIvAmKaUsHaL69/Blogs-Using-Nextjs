import { client } from "@/sanity/lib/client";
import { BLOGS_COMMENTS } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";

export default async function Blogcomments({id}: {id: string}) {
    const comments = await client.fetch(BLOGS_COMMENTS, {id});
  return (
    <div>
        <h3 className="text-black-100 mb-5">Comments:</h3>
        <ul className="flex flex-col gap-5">
      { comments.comments?.length > 0 ? (
                comments.comments.map((comment, i) => (
                    <li className="blog-card group" key={i}>
                    <div className="flex gap-5">
                        <div className="flex-1 flex flex-row gap-5">
                        <Link href={`/user/${comments.author?._id}`} >
                            <Image src={comments.author?.image} alt='placeholder' width={48} height={48} className='rounded-full'/>
                        </Link>
                            <Link className="flex items-center" href={`/user/${comments.author?._id}`}>
                                <p className="text-16-medium line-clamp-1">{comments.author?.name}</p>
                            </Link>
                        </div>
                    </div>
                    <div className="mt-5">
                            <p className="text-16-medium">{comment}</p>
                    </div>
                </li>
                ))
              ) : (<p className="no-results">No Comments Yet</p>)}
        </ul>
    </div>
  )
}
