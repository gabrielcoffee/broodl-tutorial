'use client'

import { Fugaz_One } from 'next/font/google'
import React, { useEffect, useState }from 'react'
import Button from './Button'
import { useAuth } from '@/context/AuthContext'

const fugaz = Fugaz_One({
  subsets: ['latin'],
  weight: ['400'],
})

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);

  const { signup, login } = useAuth(); 

  async function handleSubmit() {
    if (!email || !password || password.length < 6) {
      return
    }

    setAuthenticating(true);
    try {
      if (isRegister) {
        console.log("Signing new user");
        await signup(email, password);
      } else {
        console.log("Loggin in existing user");
        await login(email, password);
      }
    }
    catch (err) {
      console.log(err.message);
    }
    finally {
      setAuthenticating(false);
    }
  }


  return (
    <div className="flex flex-col flex-1 justify-center items-center gap-4">

      <h3 className={" text-4xl sm:text-5xl md:text-6xl " + fugaz.className}>
      {isRegister ? 'Register' : 'Log In'}
      </h3>

      <p>You're one step away</p>

      <input value={email} type="email" onChange={(e) => {
        setEmail(e.target.value);
      }} className="max-w-[400px] w-full mx-auto px-3 py-2 sm:py-3 border border-solid border-indigo-400 focus:border-indigo-700 hover:border-indigo-700 rounded-full outline-none duration"  
      placeholder="Email"/>

      <input value={password} type="password" onChange={(e) => {
        setPassword(e.target.value);
      }} className="max-w-[400px] w-full mx-auto px-3 py-2 sm:py-3 border border-solid border-indigo-400 focus:border-indigo-700 hover:border-indigo-700 rounded-full outline-none"
         placeholder='Password'
      />


      <div className="max-w-[400px] w-full mx-auto">
        <Button clickHandler={handleSubmit} text={authenticating ? "Submitting..." : "Submit"} full/>
      </div>


      <p>{!isRegister ? "Don't have an account?" : "Already have an account"} <button onClick={() => {
        setIsRegister(!isRegister);
      }} className='text-indigo-500 font-medium'>{isRegister ? "Sign in" : "Sign up"}</button></p>
    </div>
  )
}
