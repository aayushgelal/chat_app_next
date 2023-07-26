"use client"
import React, { useState,useEffect } from 'react'
import './login.global.css'
import NavItem from '../../components/NavItem'
import validator from 'validator';
import { useRouter } from 'next/navigation'
import { io } from 'socket.io-client';
import { AiFillGoogleCircle } from 'react-icons/ai';
import {FcGoogle} from 'react-icons/fc'
import {GoogleAuthProvider,createUserWithEmailAndPassword, signInWithPopup} from 'firebase/auth'
import { FirebaseAuth } from '../../utils/FirebaseConfig';



export default function LoginPage() {
  const router = useRouter()

  const [roomName, setRoomName] = useState('')
  const [emailError, setEmailError] = useState('')
  const [email,setEmail] =useState('');
  const [Password,setPassword] =useState('');
  const handlelogin= async () => {
        const provider = new GoogleAuthProvider();
        const {user:{displayName:name,email,photoURL}} =await signInWithPopup(FirebaseAuth,provider);
        try{
          if(email){


          }

        }catch(err){
          console.log(err)

        }



  }



  const validationEmail = (e: any) => {
   
    var emailValue = e.target.value;
    
    setEmail(emailValue);

   
     
    }
    const handleSubmit =() =>{

    if (!email) {
      setEmailError('Required Email :')
    } 
     else if (!validator.isEmail(email)) {
   
      alert('Enter valid Email!');
      }
      else{
       
        
      }
     
    }
  

  
// Email Validation


  return (
    
    <div className=' flex   p-10 flex-col items-center justify-center'>
      <h1 className='text-2xl font-medium'>SignUp</h1>
      
     <div className='px-10  pb-10 w-screen m-10 md:w-fit shadow-md rounded-lg'>
      <div className=' flex flex-col items-center justify-center  space-y-10'>
      <input placeholder='Username' value={email} onChange={validationEmail} className='logininput'/>
      <input placeholder='Password' onChange={e =>setPassword(e.target.value)} className='logininput'/>
  
      </div>
      <br></br>
    


      <div className='flex items-center justify-center'><button onClick={handleSubmit} ><NavItem link={""} name={"Login"} size={'150px'} /></button></div>
      <div className='flex justify-around '>
      <h1 className=' text-gray-500 font-extralight'>Already Have an Account? </h1>
      <div className=' underline cursor-pointer text-sky-600 mx-2'>Sign Up</div>
      </div>
      <br></br>
      <button className='w-full'> <div className='bg-sky-600  text-center p-2 rounded-lg text-white flex items-center justify-center ' onClick={handlelogin}><FcGoogle color='red' size={40} className='mr-5' /> Login With Google</div>
      </button>
      </div>
      </div>

  )
  }
