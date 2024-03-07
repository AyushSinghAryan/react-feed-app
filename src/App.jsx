import { useState,useEffect } from 'react'
import {useDispatch} from 'react-redux'
import './App.css'
import authService from './appwrite/auth';
import {login,logout} from "../src/store/authSlice"
// import Footer from './components/Footer/Footer';
import { Header,Footer } from './components';
import { Outlet } from 'react-router-dom'


function App() {
//  console.log(process.env.REACT_APP_APPWRITE_URL); this way use full for the apps that are created using react
    // console.log(import.meta.env.VITE_APPWRITE_URL); //getting access of the anivronment variables 
const [loading,setLoading] = useState(true);
const dispatch = useDispatch();

  useEffect (()=>{
    // authservice sey pucho current user kon
    authService.getCurrentUser()// agar milgaya user then
    .then((userData)=>{
      if(userData){
        dispatch(login({userData})) // here action.payload.userdata == userData
      } else{
       dispatch(logout(
         // agar user sey data nhi mila hai tho user ko notify kar dey ki aap login nhi hu

       )) 
      }
    }) // jo data mila usko hunko dispatch kaena hoga user
    .finally(()=>setLoading(false))// finally run hota hi hai  ,jo bhi result put setLoading == false

  },[])

  // ! here we do conditional rendering 
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
    <div className='w-full block'>
      <Header/>
      <main>
      TODO:  <Outlet />
      </main>
      <Footer/>
    </div></div>
  ):null
  // return (
  //   <>
  //    <h1>A blog app in appwrite</h1>
  //   </>
  // )
}

export default App

// ! enivronment varaibles use for security purpose they must be in project root folder like readme.md project key root folder mey hai
// ! whenever env file reload we need to relunch the project
//  ! agar app create react sey bani then start env name with REACT_APP ,, REACT_APP_APPWRITE_URL
// ! app create using Vite use vit at start VITE_
// ! database key ander collections hotey like tables 
// ! BUCKET == Storage

// ! humko dekna parey ga jasey app load hu raha hai  user logged in hai ki nhi hai 
// ! dekhey gey state sey directly if user is logged then only we will show the posts
// ! make loading kyuki data appwrite sey arha hai and using loading we can do the conditional redering 

// ! jasey hi application load hu tho ek useEffect lo aur useEffect sey pucho us service(authService) sey aap login hu ki nhi hu
