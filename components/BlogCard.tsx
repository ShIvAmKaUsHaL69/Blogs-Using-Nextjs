import { cn, formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

export default function BlogCard({ post }: { post: BlogCardType }) {
  return (
    <li className="blog-card group">
        <div className="flex-between">
            <p className="blog-card_date">{formatDate(post._createdAt)}</p>
            <div className="flex gap-1.5">
                <EyeIcon className="size-6 text-primary" />
                <span className="text-16-medium">{post.views}</span>
            </div>
        </div>
        <div className="flex-between mt-5 gap-5">
            <div className="flex-1">
                <Link href={`/user/${post.author?._id}`}>
                    <p className="text-16-medium line-clamp-1">{post.author?.name}</p>
                </Link>
                <Link href={`/blogs/${post._id}`}>
                    <h3 className="text-26-semibold line-clamp-1">{post.title}</h3>
                </Link>
            </div>
            <Link href={`/user/${post.author._id}`} >
                <Image src={post.author?.image} alt='placeholder' width={48} height={48} className='rounded-full'/>
            </Link>
        </div>
        <Link href={`/blogs/${post._id}`}>
            <p className="blog-card_desc">{post.short_description}</p>
            <img src={post.image} alt="placeholder" className="blog-card_img"/>
        </Link>
        <div className="flex-between gap-3 mt-5">
            <Link href={`/?query=${post.category.toLowerCase()}`} >
                <p className="text-16-medium">{post.category}</p>
            </Link>
            <Button className="blog-card_btn asChild">
                <Link href={`/blogs/${post._id}`}>Details</Link>
            </Button>
        </div>
    </li>
  )
}

export const Blogcardskeleton = () => (
    <>
    {[0,1,2,3,4].map((_ , i: number) => (
        <li key={cn('skeleton', i)}>
            <Skeleton className="blog-card_skeleton"/>
        </li>
    ))}
    </>
)
