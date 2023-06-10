import React from 'react'
import { Link,NavLink } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import { CgUser } from 'react-icons/cg'
import { FaHeart } from 'react-icons/fa'


function Navbar() {
    const hover = "hover:text-subMain transitions text-white";
    const Hover = ({isActive}) => (isActive ? 'text-subMain' : hover);

  return (
    <>
        <div className='bg-main1 shadow-md sticky top-0 z-20'>
            <div className='container  mx-auto py-6 px-2 lg:grid gap-10 grid-cols-7 justify-between items-center'>
                <div className='col-span-1 lg:block hidden'>
                    <Link to="/">
                        <img src = "/images/logo.png" alt="logo" className='w-full h-20 object-contain'/>

                    </Link>
                </div>
                {/* Search form */}
                    <div className='col-span-3'>
                        <form className='w-full text-sm bg-dryGray rounded flex-btn gap-4'>
                            <button type="submit" className='bg-main2 w-12 flex-colo h-12 rounded text-white'>
                                <FaSearch/>
                            </button>
                            <input  type="text" placeholder="Tìm kiếm phim" className=' font-medium placeholder:text-border text-sm w-11/12 h-12 border-none bg-transparent px-2 text-black' />
                        </form>
                    </div>
                    {/* menu */}
                    <div className='col-span-3 font-medium text-lg hidden xl:gap-14 2xl:gap-20 justify-between lg:flex xl:justify-end items-center'>
                        <NavLink to='/phim' className={Hover}>
                            Phim
                        </NavLink>
                        <NavLink to='/Anime' className={Hover}>
                            Anime
                        </NavLink>
                        <NavLink to='/ContactUS' className={Hover}>
                            Liên hệ
                        </NavLink>
                        <NavLink to='/favorites' className={Hover}>
                            <FaHeart  className="w-6 h-8"/>
                        </NavLink>
                        <NavLink to='/dangnhap' className={Hover}>
                            <CgUser  className="w-8 h-8"/>
                        </NavLink>
                        
                    </div>
            </div>
        </div>

    </>
  )
}

export default Navbar
