import { client } from '@/sanity/lib/client';
import { SINGLE_BLOG_QUERY } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import React from 'react'

export const experimental_ppr = true;

export default async function page({params} : {params: Promise<{id: string}>}) {
    const id = (await params).id

    const postdetail = await client.fetch(SINGLE_BLOG_QUERY, {id});

    if(!postdetail) return notFound()

  return (
    <>
      <h1 className='text-3xl'>{postdetail.title}</h1>
    </>
  )
}
