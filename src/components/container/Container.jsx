import React from 'react'

function Container({children}) {
  return (
    <div className='w-full max-w-7xl mx-auto px-4'>
      {children}
    </div>
  )
}

export default Container
// container accepts your properties as a children
// container like flutter container here we define style properties , h ,w 

