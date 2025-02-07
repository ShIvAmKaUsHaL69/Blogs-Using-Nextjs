import React from 'react'
import Ping from './Ping'
import { client } from '@/sanity/lib/client'
import { BLOGS_VIEW_QUERY } from '@/sanity/lib/queries'
import { writeclient } from '@/sanity/lib/write-client'
import { after } from 'next/server'

// Using SSR to update views dynamically 

export default async function View({id}:{id: string}) {

    const { views: totalviews } = await client.withConfig({
        useCdn: false
    }).fetch(BLOGS_VIEW_QUERY, {id})

    after(async () => await writeclient.patch(id).set({ views: totalviews + 1}).commit())

  return (
    <div className='view-container'>
      <div className='absolute -top-2 -right-2'><Ping/></div>
      <p className='view-text'>
        <span className='font-black'>{totalviews} {totalviews == 1 ? ' View' : ' Views'}</span>
      </p>
    </div>
  )
}
