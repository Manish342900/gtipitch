import React from 'react'
import Form from "next/form"
import SearchFormSet from './SearchFormSet'
import { SearchIcon } from '@sanity/icons'

async function SearchForm({query}) {
    
    return (
        <Form action="/" scroll={false} className='search-form'>
            <input
                placeholder='Search Startups'
                name='query'
                defaultValue={query}
                className='search-input'
                type='text'
            />
            <div className='flex gap-2'>
                {
                    query && <SearchFormSet/>
                    
                }
                <button type='submit' className='search-btn text-white-100'>
                    <SearchIcon className='size-6'/>
                </button>
                
            </div>
        </Form>
    )
}

export default SearchForm
