import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { SINGLE_BLOG_QUERY } from '@/sanity/lib/queries';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import  { Suspense } from 'react'
import markdownit from 'markdown-it'
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';

// using ISR to get data from cache if cache no need then false client

export const experimental_ppr = true;

export default async function page({params} : {params: Promise<{id: string}>}) {
    const id = (await params).id

    const postdetail = await client.fetch(SINGLE_BLOG_QUERY, {id});

    if(!postdetail) return notFound()

    const parsedcontent = markdownit().render(postdetail?.description || '')

  return (
    <>
    <section className='pink_container !min-h-[230px]'>
        <p className='tag'>{formatDate(postdetail?._createdAt)}</p>
        <h1 className='heading'>{postdetail.title}</h1>
        <p className='sub-heading !max-w-5xl'>{postdetail.short_description}</p>
    </section>
    <section className='section_container'>
        <img src={postdetail.image} alt='thumbnail' className='w-full h-auto rounded-xl'/>
        <div className='space-y-5 mt-10 max-w-7xl mx-auto'>
            <div className='flex-between gap-5'>
                <Link href={`/user/${postdetail.author?._id}`} className='flex gap-2 items-center mb-3'>
                <Image src={postdetail.author.image} alt='avatar' width={64} height={64} className='rounded-full drop-shadow-lg'/>
                <div>
                    <p className='text-20-medium'>{postdetail.author.name}</p>
                    <p className='text-16-medium !text-black-300'>@{postdetail.author.username}</p>
                </div>
                </Link>
                <p className='category-tag'>{postdetail.category}</p>
            </div>

            {parsedcontent && (
                <article className=' max-w-5xl font-work-sans break-all' dangerouslySetInnerHTML={{__html: parsedcontent}}/>
            )}

        </div>
        <hr className='divider'/>
        <Suspense fallback={<Skeleton className='view_skeleton'/>}>
      <View id={id}/>
      </Suspense>

    </section>

      
    </>
  )
}
