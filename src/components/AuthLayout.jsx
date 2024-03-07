// mechanism to protect page and routes 

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


export default function Protected({ children, authentication = true }) {

  const navigate = useNavigate()

  const [loader, setLoader] = useState(true)
  const authStatus = useSelector(state => state.auth.status)
  useEffect(() => {
    //TODO: make it more easy to understand

    // if (authStatus ===true){
    //     navigate("/")
    // } else if (authStatus === false) {
    //     navigate("/login")
    // }
   // other way
    //let authValue = authStatus === true ? true : false
    if (authentication && authStatus !== authentication) {
      navigate("/login")
    } else if (!authentication && authStatus !== authentication) {
      navigate("/")
    }
    setLoader(false)
  }, [authStatus, navigate, authentication])

  return loader ? <h1>Loading...</h1> : <>{children}</>
}


// ! file or main function ka name alag hu skata hai 
// ! useEffect sey hi pata chaley ga ki humko login ya homepage kis per jana hai 
// ![] dependecy array mey kuch bhi change hu tho use Effect will run again 


// ? authentication && authStatus !== authentication
// so first authentication tho true hai hi
// so authStatus gives false(means user not authenticated) !== true(authentication)
// false !== true ==> !false ===> true 
// true && true = true  so user will go to login page 
//! user ney authentication mey kuch nhi send then by default i assume true 
// second cond (else if ) mey you are authenticated  so authstatus = true and authentication = false  