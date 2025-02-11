import Image from "next/image";
import Link from "next/link";

export default function Commentscard({ post, commentid }: { post: commentcard , commentid : number}) {
  return (
    <li className="blog-card group">
        <div className="flex-between mt-5 gap-5">
            <div className="flex-1">
                <Link href={`/user/${post.author?._id}`}>
                    <p className="text-16-medium line-clamp-1">{post.author?.name}</p>
                </Link>
            </div>
            <Link href={`/user/${post.author?._id}`} >
                <Image src={post.author?.image} alt='placeholder' width={48} height={48} className='rounded-full'/>
            </Link>
        </div>
        <div className="flex-between gap-3 mt-5">
                <p className="text-16-medium">{post.comments[commentid]}</p>
        </div>
    </li>
  )
}
