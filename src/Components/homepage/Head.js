import React from 'react'

function Head({title}) {
  return (
    <div className='"W-full bg-deepGray lg:h-64 relative overflow-hidden  rounded-md bg-main'>
    
      <img src='http://localhost:1001/serverImages/hinh-anh-hoa-anh-dao-3.jpg' />
      <div className='absolute lg:top-24 top-16 w-full flex-colo'> 
        <h1 className='text-2xl lg:text-h1 nhapnhay text-center font-bold'>
            {title&&title}
        </h1>
      </div>
    </div>
  )
}

export default Head
