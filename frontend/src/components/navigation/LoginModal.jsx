import React, { useState } from 'react'
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import userService from '../../services/userService'
import {useAuth} from '../../contexts/auth'

export default function LoginModal(props) {

  const { setShowLogin } = props
  const { login } = useAuth();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const user = await userService.login({identifier, password})
      login(user) 
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      <div className="space-y-8 px-10 h-[350px]">
        <h1 className="text-[25px] font-bold text-gray-900 dark:text-white">Log In</h1>
          <div>
            <TextInput
              id="identifier"
              placeholder="Email or Username"
              value={identifier}
              onChange={(event) => setIdentifier(event.target.value)}
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
            <Button onClick={handleLogin} className='bg-sawwit_blue rounded-full w-[250px] font-bold'>Log In</Button>
        </div>
    </>
  )

}
