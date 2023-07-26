"use client"
import React, { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import dummy from './DummyData'  ;


export default function SearchBar() {
    const [searchbar,setsearchbar] =useState(false)
    const [searcedterm,setsearchedterm]=useState('');
    const filteredData = dummy.filter((el) => {
        //if no input the return the original
        if (searcedterm === '') {
            return el;
        }
        //return the item which contains the user input
        else {
            return el.text.toLowerCase().includes(searcedterm)
        }
    })
    

  return (
    <div className=' transition-transform flex items-center'>

      
       {searchbar? <input onChange={e => setsearchedterm(e.target.value.toLowerCase())} placeholder='Search your music' className=' focus:outline-none p-2  focus:border-b-2 focus:border-red-100  transition-color' />:null }
        <button><AiOutlineSearch size={30} color='gray' onClick={()=>{
            setsearchbar(!searchbar)
        
        
        }} /></button>

    </div>
  )
}
