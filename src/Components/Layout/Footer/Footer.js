import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {

  const Links =[

    {
      title:'Chung',
      links:[
        {
          name:'Trang chủ',
          link:'/',
        },
        {
          name:'Phim',
          link:'/phim'
        },
        {
          name:'Anime',
          link:'/Anime'
        },

      ]
    },
    {
      title:'Thể loại nổi bật',
      links:[
        {
          name:'Phim phổ biến',
          link:'/bxh'
        },
        {
          name:'Anime nổi bật',
          link:'/bxh',
        },
      ]
    },
    {
      title:'Tài khoản của tôi',
      links:[
        {
          name:'Phim yêu thích',
          link:'/favorites',
        },
        {
          name:'Thông tin cá nhân',
          link:'/profile'
        },
        {
          name:'Thay đổi mật khẩu',
          link:'/Password'
        },

      ]
    },
    
  ]

  return (
    <div className='bg-main3 py-3 border=t-2 border-black mt-7'>
      <div className='container mx-auto px-2'>
        <div className='grid grid-cols-2 md:grid-cols-7 xl:grid-cols-12 gap-5 sm:gap-9 lg:gap-11 xl:gap-7 py-10 justify-between'>
        {
          Links.map((link,index) => (
            <div key={index} className='col-span-1 md:col-span-2 lg:col-span-3 pb-3.5 sm:pb-0'>
              <h3 className=' text-white text-md lg:leading-7 font-medium mb-4 sm:mb-5 lg:mb-6 pb-0.5'>{link.title}</h3>
                <ul className='text-sm flex flex-col space-y-3'>
                  {link.links.map((text,index) => (
                    <li key={index} className='flex items-baseline'>
                      <Link to={text.link} className='text-white inline-block w-full hover:text-subMain'>
                        {text.name}
                      </Link>
                    </li>
                  ))}

                </ul>

            </div>
          ))
        }

        <div className='pb-3.5 sm:pb-0 col-span-1 md:col-span-2 lg:col-span-3'>
          <Link to="/">
            <img src="data:image/png;base64,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"
            alt="logo"
            className='w-2/4 object-contain h-12' />
          </Link>
          <p className=' text-white leading-7 text-sm mt-3'>
              Đại học bách khao Đà Nẵng, <br/> PBL5, Đà Nẵng 2023
          </p>
        </div>
        </div>

      </div>
    </div>
  )
}

export default Footer
