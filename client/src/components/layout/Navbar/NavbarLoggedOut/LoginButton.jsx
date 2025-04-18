const LoginButton = ({onClick}) => {
  return (
    <button onClick={onClick} className='flex justify-center items-center flex-shrink-0 h-[38px] px-7 max-[1050px]:px-5 max-[600px]:px-3 whitespace-nowrap text-white font-bold bg-sawwit-blue hover:bg-sawwit-blue-dark rounded-full'>
      Log In
    </button>
  )
}

export default LoginButton