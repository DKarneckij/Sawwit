import React from 'react'

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-2">Modal Title</h2>
        <p>Modal content goes here...</p>
        <button onClick={onClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
            Close
        </button>
      </div>
    </div>
  )
}

export default Modal;