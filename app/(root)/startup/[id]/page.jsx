import { STARTUP_BY_ID_QUERY } from '@/sanity/lib/query'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import React, { Suspense } from 'react'
import {client} from "@/sanity/lib/client"
import { formatDate } from '@/app/utils'
import Link from 'next/link'
export const experimental_ppr=true
import MarkdownIt from 'markdown-it'
import { Skeleton } from '@/components/ui/skeleton'
import View from '@/components/ui/View'

const md= new MarkdownIt();

async function pages({params}) {

  const id= (await params).id
  const post =await client.fetch(STARTUP_BY_ID_QUERY,{id})
  
  if(!post){
    return notFound()
  }

  const parseContent=md.render(post?.pitch || '')

  return (
    <>
      
      <section className='pink_container !min-h-[230px]'>
        <div className='tag' >
          {formatDate(post?._createdAt)}
        </div>
        <h1 className='heading'>{post?.title}</h1>
        <p className='sub-heading !max-w-5xl'>
          {post?.description}
        </p>
      </section>
      <section className='section_container'>
        
          <img src={post?.image} alt={'thumbnail'} className='w-full h-auto  object-cover rounded-sm'/>
        
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link href={`/user/${post?.author?._id}`} className='flex gap-2 items-center mb-3'>
              <Image width={64} height={64} src={post?.author?.image} alt="image" className="rounded-full drop-shadow-lg" />
              <div>
                <p className='text-20-medium'>{post?.author?.name}</p>
                <p className='text-16-medium !text-black-300'>@{post?.author?.username}</p> 
            </div>           
            </Link>
          <p className='category-tag'>{post?.category}</p>
          </div>
          <h3 className='text-30-bold'>Pitch Details</h3>
          {parseContent ?(
            <article dangerouslySetInnerHTML={{__html:parseContent}} className='prose max-w-4xl font-work-sans break-all'/>

          ):(
            <p className='no-result'>No details provided</p>
          ) }
        </div>
        <hr className='divider'/>

        <Suspense fallback={<Skeleton className='view-skeleton'/>}>
            <View id={id}/>
        </Suspense>
        
      </section>
    </>
  )
}


export default pages
