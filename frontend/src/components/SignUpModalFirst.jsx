import React, { useState } from 'react'
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";

export default function SignUpModalFirst(props) {

  const { setShowLogin, setFirstPart, setEmail, email } = props

  return (
    <>
      <div className="space-y-10 px-10 h-[350px]">
        <h1 className="text-[25px] font-bold text-gray-900 dark:text-white">Sign Up</h1>
          <div>
            <TextInput
              id="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type='name'
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
            <Button onClick={() => setFirstPart(false)} className='bg-sawwit_blue rounded-full w-[250px] font-bold justify-self-end'>Continue</Button>
      </div>
    </>
  )
}
