import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  // we show loggedin/loggedout conditionally 
  const authStatus = useSelector((state) => state.auth.status)
  //! hum state sey yeh pata kar rahe is user authenticated or not 
  const navigate = useNavigate()
  // navigation mey array banta hai then usko loop kartey hai

  const navItems = [
    {
      name: 'Home',
      slug: "/", // slug == url
      active: true

    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
    //
  ]
  return (
<header className='py-3 shadow bg-gray-500'>
  <Container>
    <nav className='flex'>
      <div className='mr-4'>
      <Link to='/'>
        <Logo width='70px'/>
      </Link>
      </div>
      <ul className='flex ml-auto'>
        {navItems.map((item)=>
        item.active ? (
          <li key={item.name}>
            <button onClick={()=>navigate(item.slug)}
             className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
            >
            {item.name}
          
            </button>
          </li>
        ):null
        )}
        {authStatus && (
          <li>
            <LogoutBtn/>
          </li>
        )}
      </ul>
    </nav>
  </Container>
</header>
  )
}

export default Header
//? HUM CONDITIONALLY user ko btn login and logout btn show karey gey
// ! jo HTML element repeat hu raha waha per hum keys lagtey jasiey yaha li 
// ? Navigate work by givng the URL       <button onClick={()=>navigate(item.slug)}
// ! agar "authStatus" true hoga tabh dikey ga warna nhi dikey ga  authStatus && ()