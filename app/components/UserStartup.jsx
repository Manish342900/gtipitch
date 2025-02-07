import { client } from '@/sanity/lib/client'
import { STARTUPS_BY_AUTHOR_QUERY } from '@/sanity/lib/query'
import React from 'react'
import StartupCard from './StartupCard'

const UserStartup =async ({id}) => {
    const startups=await client.fetch(STARTUPS_BY_AUTHOR_QUERY,{id:id})
    console.log(startups)
  return (
    <>
      {
        startups.length >0?startups.map((startup)=>(
            <StartupCard key={startup._id} post={startup}/>
        )):null
      }
    </>
  )
}

export default UserStartup
