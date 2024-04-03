import React, {useState} from 'react'
import SignUpModalFirst from './SignUpModalFirst'
import SignUpModalSecond from './SignUpModalSecond'
import signupService from '../services/signup'

export default function SignUpModal(props) {

  const { setShowLogin } = props

  const [isFirstPart, setFirstPart] = useState(true)
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSignUp = async () => {

    console.log("Signing up:", email, username, password)
    
    try {
      console.log("Here");
      const user = await signupService.signup({
        email, username, password})

      
      useAuth.signin(user)

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
