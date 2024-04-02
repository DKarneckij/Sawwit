import React, {useState} from 'react'
import SignUpModalFirst from './SignUpModalFirst'
import SignUpModalSecond from './SignUpModalSecond'

export default function SignUpModal(props) {

  const { setShowLogin } = props

  const [isFirstPart, setFirstPart] = useState(true)
  

  return (
    <>
      { isFirstPart ? <SignUpModalFirst setShowLogin={setShowLogin} setFirstPart={setFirstPart} /> : <SignUpModalSecond setShowLogin={setShowLogin} setFirstPart={setFirstPart}/> }
    </>
  )
}
