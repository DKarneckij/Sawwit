import React from 'react'

const Button = ({ onClick }) => {
  return (
    <button onClick={onClick} className="bg-blue-500 text-white px-4 py-2 rounded">
        Login
    </button>
  )
}

export default Button;