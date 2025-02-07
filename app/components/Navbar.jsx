
import { auth, signIn, signOut } from '@/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BadgePlusIcon, LogOut, LogOutIcon } from 'lucide-react';
 import Image from 'next/image'
 import Link from 'next/link'
 import React from 'react'


 const Navbar=async()=> {
   const session= await auth()

  

   return (
     <header className='px-5 py-5 bg-white shadow-sm h-[80px] '>
       <nav className='flex justify-between items-center'>
         <Link href="/">
         <div className='flex justify-center items-center'>
          <img src='./gitpitch.png' alt='image'  className='size-10'/>
          <span className='text-3xl font-semibold'>GitPitch</span>
         </div>
         
         </Link>
         <div className='flex items-center gap-5 text-black'>
           {session && session?.user ? (
              <>
              <Link href='/startup/create'>
                <span className='max-sm:hidden'>Create</span>
                <BadgePlusIcon className='size-6 sm:hidden '/>
              </Link>              
              <form onSubmit={async()=>{
                "use server";
                await signOut({ redirect: true, callbackUrl: '/' })
              }} >
              <button type='submit' >
                <span className='max-sm:hidden'>LogIn</span>
                
                <LogOutIcon className='size-6 sm:hidden text-red-600'/>
                
                </button>
              </form>

              <Link href={`/user/${session?.id}`}>
               <Avatar>
                  <AvatarImage src={session?.user?.image}/>
                  <AvatarFallback>CN</AvatarFallback>
               </Avatar>
               
              </Link>
            </>
           )
         
           :(
             <form onSubmit={async()=>{
              "use server";
              await signIn("github")
             }}>
                 <button type='submit'>LogIn</button>
             </form>
           )}
         </div> 
       </nav>
     </header>
   )
 }

export default Navbar


