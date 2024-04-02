import React, {useState} from 'react'
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";

export default function SignUpModalSecond(props) {

  const { setShowLogin, setFirstPart } = props

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <>
      <div className="space-y-6 px-10 h-[350px]">
        <Button onClick={() => setFirstPart(true)}>Go Back</Button>
        <h1 className="text-[25px] font-bold text-gray-900 dark:text-white">Create your username and password </h1>
          <div>
            <TextInput
              id="username"
              placeholder="Username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type='username'
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
          <div className="flex gap-2 justify-start text-sm font-medium text-gray-500 dark:text-gray-300">
            Already a sawwitor?
            <a href="#" onClick={() => setShowLogin(true)} className="text-cyan-700 hover:underline dark:text-cyan-500">
              Log In
            </a>
          </div>
      </div>
      <div className="flex justify-center">
            <Button className='bg-sawwit_blue rounded-full w-[250px] font-bold'>Sign Up</Button>
        </div>
    </>
  )
}