import React, {useState} from 'react'
import SignUpModalFirst from './SignUpModalFirst'
import SignUpModalSecond from './SignUpModalSecond'
import userService from '../../services/userService'
import {useAuth} from '../../contexts/auth'

export default function SignUpModal(props) {

  const { setShowLogin } = props

  const [isFirstPart, setFirstPart] = useState(true)
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const {login} = useAuth();

  const handleSignUp = async () => {
    try {
      const user = await userService.signup({
        email, username, password})
      login(user)
    } catch(error) {
      console.log(error.message);
    }
  }

  return (
    <>
      { isFirstPart ? <SignUpModalFirst 
                        setShowLogin={setShowLogin} 
                        setFirstPart={setFirstPart}
                        email={email}  
                        setEmail={setEmail} 
                      /> 
                    : <SignUpModalSecond 
                        setShowLogin={setShowLogin} 
                        setFirstPart={setFirstPart} 
                        username={username}
                        setUsername={setUsername}
                        password={password}
                        setPassword={setPassword}
                        handleSignUp={handleSignUp}
                      /> }
    </>
  )
}
