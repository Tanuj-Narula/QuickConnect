import React, { useEffect } from 'react'
import Login from '../components/Login'


function LoginPage({use}) {
  useEffect(()=>{
    document.title = "QuickConnect | " + use;
  }, [use])

  return (
    <div className='w-full h-screen bg-[url(/wickedbackground1.png)] bg-cover flex'>
      <Login use={use} />
    </div>
  )
}

export default LoginPage
