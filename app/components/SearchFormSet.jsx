"use client";
import Link from 'next/link';
import React from 'react'

function SearchFormSet() {

  const reset=()=>{
        const form=document.querySelector(".search-form")
        if(form) form.reset()
  }  

  return (
    <button type='reset' onClick={reset}>
        <Link href={'/'} className='search-btn text-white'>
        X
        </Link>
    </button>
      
    
  )
}

export default SearchFormSet
