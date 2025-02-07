import React from 'react'
import { cn, formatDate } from '../../app/utils'
import {EyeIcon} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';

function StartupCard({post}) {
  return (
    <li className='startup-card group'>
      <div className=' flex-between'>

        <p className='startup_card_date'>
            {formatDate(post?._createdAt)}
        </p>

        <div className='flex gap-2'>
            <EyeIcon className='size-6 text-primary' />
            <span className='text-16-medium'>{post?.views}</span>
        </div>
      </div>
      <div className='flex-between mt-5 gap-5'>
            <div className='flex-1'>
                <Link href={`/users/${post?.name}`}>
                    <p className='text-16-medium line-clamp-1'>{post?.name}</p>
                </Link>
                <Link href={`/startup/${post?._id}`}>
                    <p className='text-3xl font-semibold line-clamp-1'>{post?.title}</p>
                </Link>
            </div>
            <Link href={`/user/${post?.author?._id}`}>
                    <Image style={{ objectFit: 'cover' }} className='rounded-full' width={48 } height={48} src={post?.author?.image} alt='img'/>
            </Link>
        </div>
        <div className='flex gap-2'>
                <Link href={`/startup/${post?._id}`}>
                        <p className='startup-card_desc'>{post?.description}</p>
                        <img src={post?.image} alt='img' className='startup-card_img' />
                </Link>
        </div>
        <div className='flex-between gap-3 mt-5'>
            <Link href={`/?query=${post?.category.toLowerCase()}`}>
                <p className='text-16-medium'>{post?.category}</p>
            </Link>
            <button className='startup-card_btn asChild'>
                <Link href={`/startup/${post?._id}`}>
                Details
                </Link>
            </button>
        </div>
    </li>
  )
}

export const StartupCardSkelton=()=>{
    <>
        {[0,1,2,3,4].map((index)=>(
            <li key={cn('skelton ',index)}>
                <Skeleton className='startup-card_skelton'/>
            </li>
        ))}
    </>
}

export default StartupCard
