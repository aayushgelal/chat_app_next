"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import NavItem from './NavItem'
import { URL } from 'url'
import { url } from 'inspector'
import Image from 'next/image'
import { AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai'
import SearchBar from './SearchBar'
import { useSelector } from 'react-redux'
import { setCredentials } from '../reducers/authreducer'

export default function Navbar() {
  const dataselector=useSelector((state:any) => state.auth.user)
  const [isloggedin,setisloggedin]=useState(false)
  useEffect(()=> {
    dataselector==null?setisloggedin(false):setisloggedin(true)
    console.log(dataselector)
  },[dataselector])
  return (
    <div id='navbar-main' className=' sticky  flex items-center justify-between shadow-sm p-4'>
      <div className='flex items-center'>
            <Image src='/vercel.svg' width={150} height={150} alt=''/>
            {/* <a className="btn btn-ghost normal-case text-xl">My Website</a> */}
            </div>
      
        <div className='flex justify-between items-center space-x-6 ' >
         <SearchBar />
         {isloggedin?<NavItem name={'Logout'} link='/login'/>:<NavItem name={'Login'} link={'/login'} />}
         <button><AiOutlineShoppingCart size={30} color='gray' /></button>

 


        </div>


    </div>
  )
}
