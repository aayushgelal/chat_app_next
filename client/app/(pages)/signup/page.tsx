"use client"
import React, { useState,useEffect } from 'react'
import './login.global.css'
import NavItem from '../../components/NavItem'
import validator from 'validator';
import { useRouter } from 'next/navigation'
import { io } from 'socket.io-client';
import { AiFillGoogleCircle } from 'react-icons/ai';
import {FcGoogle} from 'react-icons/fc'
import {GoogleAuthProvider,createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup} from 'firebase/auth'
import { FirebaseAuth } from '../../utils/FirebaseConfig';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/app/reducers/authreducer';
import axios from 'axios';
import { CHECK_USER_ROUTE, SIGNUP_USER_ROUTE } from '@/app/utils/ApiRoutes';
import Link from 'next/link';



export default function SignupPage() {
  const router = useRouter()

  const [name, setName] = useState('')
  const [emailError, setEmailError] = useState('')
  const [email,setEmail] =useState('');
  const [Password,setPassword] =useState('');
  const dispatch=useDispatch();
  const loginwithgoogle= async () => {
        const provider = new GoogleAuthProvider();
        const {user} =await signInWithPopup(FirebaseAuth,provider);
       await handlelogin(user)



  }
  const handlelogin= async(user:any) =>{
    try{
      if(user.email){
        const {data}=await axios.post(SIGNUP_USER_ROUTE,{
          email:user.email,
          name:name,
          userId:user.uid
        })
        if(!data.status){
          dispatch(setCredentials({
            email:user.email,
            accessToken:user.getIdToken()
          }))
          router.push('/')

        }
      }
    }
   
  
  
    catch(e){
      alert(e)
    }
   

  }



  const validationEmail = (e: any) => {
   
    var emailValue = e.target.value;
    
    setEmail(emailValue);

   
     
    }
    const handleSubmit =async (e: any) =>{
      e.preventDefault();

    if (!email) {
      alert('Required Email :')
    } 
   
    
      else{
      
        const {user}= await createUserWithEmailAndPassword(FirebaseAuth,email,Password)

        await handlelogin(user)
        
       
        
      }
     
    }
  
  return (
    
    <div className=' flex   p-10 flex-col items-center justify-center'>
      <h1 className='text-2xl font-medium'>SignUp</h1>
      
     <div className='px-10  pb-10 w-screen m-10 md:w-fit shadow-md rounded-lg'>
      <div className=' flex flex-col items-center justify-center  space-y-10'>
      <input placeholder='Name' value={name} onChange={(e) =>setName(e.target.value)} className='logininput'/>

      <input placeholder='Email' value={email} onChange={validationEmail} className='logininput'/>
      <input placeholder='Password' onChange={e =>setPassword(e.target.value)} className='logininput'/>
  
      </div>
      <br></br>
    


      <div className='flex items-center justify-center'><button onClick={handleSubmit} ><NavItem link={""} name={"Signup"} size={'150px'} /></button></div>
      <div className='flex justify-around '>
      <h1 className=' text-gray-500 font-extralight'>Already Have an Account? </h1>
      <div className=' underline cursor-pointer text-sky-600 mx-2'><Link href={'/login'}>Sign In</Link></div>
      </div>
      <br></br>
      <button className='w-full'> <div className='bg-sky-600  text-center p-2 rounded-lg text-white flex items-center justify-center ' onClick={loginwithgoogle}><FcGoogle color='red' size={40} className='mr-5' /> Login With Google</div>
      </button>
      </div>
      </div>

  )
  }
