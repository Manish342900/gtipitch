import React from 'react'
import SearchForm from '../components/SearchForm'
import StartupCard from '../components/StartupCard'
import { STARTUPS_QUERY } from '@/sanity/lib/query'
import { sanityFetch, SanityLive } from '@/sanity/lib/live'
import { auth } from '@/auth'

async function page({ searchParams }) {
  const query = (await searchParams).query
  const params={search:query || null}

  const {data:posts}=await sanityFetch({query:STARTUPS_QUERY,params})
  const session=await auth()
  
  

  
  
  return (
    <>
      <section className='pink_container'>
        <h1 className='heading'>Pitch Your Startup, <br />Connect With Entrepreneur</h1>
        <p className='sub-heading max-w-3xl'>
          Submit Ideas, Vote on Pitches and Get noticed in Virtual Competitions.
        </p>
        <SearchForm query={query} />
      </section>
      <section className='section_container'>
        <p className='text-30-semibold'>
          {query?`Search result for ${query}`:`All Startups`}
        </p>
        <ul className='mt-7 card_grid'>
            {
              posts?.length>0?(
                
                posts.map((post,index)=><StartupCard key={index} post={post}/>)
                
              ):(<p className='no-results'>No startup</p>)
            }
        </ul>
      </section>

      <SanityLive/>
    </>
  )
}

export default page
