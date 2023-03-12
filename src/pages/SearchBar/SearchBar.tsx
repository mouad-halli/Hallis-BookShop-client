import React, { useState } from 'react'
import { IoIosSearch } from 'react-icons/io'
import { createSearchParams, useNavigate } from 'react-router-dom'

export const SearchBar = () => {

	const navigate = useNavigate()
	const [input, setInput] = useState('')

	const handleSubmit = (e: any) => {
		e.preventDefault()
		navigate({ pathname: 'search', search: createSearchParams({ type: 'search', q: input }).toString() })
	}

	return (
		<form className=' w-full text-md' onSubmit={(e) => handleSubmit(e)}>
			<div className='relative flex items-center group'>
				<IoIosSearch size={19} className=' group-focus-within:text-blue-500 text-slate-400 absolute ml-2 pointer-events-none' />
				<input
					type="search"
					name='search'
					placeholder='Search by title, genre or author'
					className='w-full h-8 pl-8 pr-2 pt-0.5 outline-none placeholder:text-[90%] text-black group-focus-within:placeholder-blue-500/90 placeholder:text-sm placeholder-gray-400 ring-[1.5px] ring-slate-400 focus:ring-[1.5px] focus:ring-blue-500 rounded-3xl border-none'
					onChange={(e) => setInput(e.target.value)}
				/>
			</div>
		</form>
	)
}
