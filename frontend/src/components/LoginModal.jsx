import React, { useState } from 'react'
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";

export default function LoginModa(props) {

  const { setShowLogin } = props

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <div className="space-y-8 px-10 h-[350px]">
        <h1 className="text-[25px] font-bold text-gray-900 dark:text-white">Log In</h1>
          <div>
            <TextInput
              id="email"
              placeholder="Email or Username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type='name'
              required
            />
          </div>
          <div>
            <TextInput
              id='password'
              placeholder='Password'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type='password'
              required
            />
          </div>
          <div className="flex justify-between">
            <a href="#" className="text-sm text-cyan-700 hover:underline dark:text-cyan-500">
              Forget Password?
            </a>
          </div>
          <div className="flex gap-2 justify-start text-sm font-medium text-gray-500 dark:text-gray-300">
            New to Sawwit?
            <a href="#" onClick={() => setShowLogin(false)} className="text-cyan-700 hover:underline dark:text-cyan-500">
              Sign Up
            </a>
          </div>
      </div>
      <div className="flex justify-center">
            <Button className='bg-sawwit_blue rounded-full w-[250px] font-bold'>Log In</Button>
        </div>
    </>
  )

}
