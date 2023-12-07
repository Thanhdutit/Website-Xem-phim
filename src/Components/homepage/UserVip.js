import React from 'react'
import Head from './Head'
import Layout from '../Layout/Layout'

function UserVip() {
  return (
    <Layout>
    <div className=' bg-main min-height-screen container mx-auto px-2 my-6'>
      <Head title="CHÍNH SÁCH VIP" />
      <div className='xl:py-20 py-10 px-4'>
        <div className='grid gird-flow-row xl:grid-cols-2 gap-4 xl:gap-16 items-end'>
            <div>
                <h3 className='text-xl lg:text-3xl mb-4 font-semibold'>
                    Chào mừng đến với gói Người dùng VIP
                </h3>
            <div className='mt-3 text-sm leading-8 text-text'>
                <p>
                    Gói tài khoản UserVip là gói cao nhất với kho phim, kho nội dung độc quyền khủng, xem không giới hạn toàn bộ nội dung giải trí trên ứng dụng.
                </p>
                <p>
                Sở hữu đặc quyền : Xem trọn bộ các phim, nội dung hot trên thị trường. Toàn bộ phim chiếu rạp .
                </p>
            </div>
            <div className='grid md:grid-cols-2 gap-6 mt-8'>
                <div className='p-8 bg-dry rounded-lg'>
                     <span className='text-3xl block font-extrabold '>
                        Toàn bộ 
                     </span>
                     <h4 className='text-lg font-semibold my-2'>
                        Danh Sách phim
                     </h4>
                     <p className='mb-0 text-text leading-7 text-sm'>
                            Xem toàn bộ các phim của WEB
                     </p>
                </div>
                <div className='p-8 bg-dry rounded-lg'>
                     <span className='text-3xl block font-extrabold '>
                        20$
                     </span>
                     <h4 className='text-lg font-semibold my-2'>
                     Cho lần năng cấp gói VIP
                     </h4>
                     <p className='mb-0 text-text leading-7 text-sm'>
                        Để tận hưởng trọn vẹn trải nghiệm 
                     </p>
                </div>
            </div>
            </div>
            <div className='mt-10 lg:mt-0'>
                <img src="http://localhost:1001/serverImages/vipuser.png" alt='aboutus' className='w-full xl:block hidden h-header rounded-lg object-cover '/>
            </div>
        </div>
      </div>
    </div>
    </Layout>
  )
}

export default UserVip
