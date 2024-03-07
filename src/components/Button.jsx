import React from 'react'

function Button({
    children,
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className = '',
    ...props

}) {
  return (
    <button className={`px-4 py-2 rounded-lg ${className} ${bgColor} ${textColor}`}{...props}>{children}</button>
  )
}

export default Button
// ! "    children,    type = 'button',   bgColor = 'bg-blue-600'"  these are  all default values and many more default values 
// ? baki ...props ko spread kar leygey if user passes some additional property like type 
// className ='' means kuch classes we add kuch class some other person want to add
//! here children  === text 