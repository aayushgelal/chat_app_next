"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import NavItem from './NavItem'
import { URL } from 'url'
import { url } from 'inspector'
import Image from 'next/image'
import { AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai'
import SearchBar from './SearchBar'

export default function Navbar() {
  return (
    <div id='navbar-main' className=' sticky  flex items-center justify-between shadow-sm p-4'>
      <div className='flex items-center'>
            <Image src='/vercel.svg' width={150} height={150} alt=''/>
            {/* <a className="btn btn-ghost normal-case text-xl">My Website</a> */}
            </div>
      
        <div className='flex justify-between items-center space-x-6 ' >
         <SearchBar />
         <NavItem name={'Signup'} link='/login'/>
         <button><AiOutlineShoppingCart size={30} color='gray' /></button>

 


        </div>


    </div>
  )
}
