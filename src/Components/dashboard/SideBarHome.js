import React from 'react';
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt, FaUsers, FaHeart } from "react-icons/fa";
import { RiMovie2Fill, RiLockPasswordLine } from "react-icons/ri";
import { HiViewGridAdd } from "react-icons/hi";
import { FiSettings } from "react-icons/fi";

import { Link, NavLink ,useNavigate} from 'react-router-dom';
import { hover } from '@testing-library/user-event/dist/hover';
import { useState, useEffect } from 'react'
import authorization from '../../authorization';
import Layout from '../Layout/Layout';
function SideBarHome({ children }) {
    const [admin, setAdmin] = useState(false)
    const [notUser,setNotUser] = useState()
    const navigate = useNavigate()
    useEffect(() => {

        async function AuthorToken() {
            let data = await authorization()

            data?.role == 1 ? setAdmin(true) : setAdmin(false)
            if(data==null ||data==undefined) setNotUser(true)
        }
        AuthorToken()
    });
    let SideLinks =[]
    admin ? SideLinks = [
        {
            name: "Dashboard",
            link: "/dashboard",
            icon: BsFillGridFill,
        },
        {
            name: "Film/Anime",
            link: "/movieslist",
            icon: FaListAlt,
        },
        
        {
            name: "Categories",
            link: "/categories",
            icon: HiViewGridAdd,
        },
        {
            name: "Users",
            link: "/users",
            icon: FaUsers,
        },
        {
            name: "Update Profile",
            link: "/profile",
            icon: FiSettings,
        },
        {
            name: "Favorites Movie",
            link: "/favorites",
            icon: FaHeart,
        },
        {
            name: "Change Password",
            link: "/password",
            icon: RiLockPasswordLine,
        },

    ] : SideLinks = [
       
        {
            name: "Update Profile",
            link: "/profile",
            icon: FiSettings,
        },
        {
            name: "Favorites Movie",
            link: "/favorites",
            icon: FaHeart,
        },
        {
            name: "Change Password",
            link: "/password",
            icon: RiLockPasswordLine,
        },

    ];
    if(notUser) navigate('/404-notfound')
    const active = "bg-dryGray text-subMain "
    const hover = "hover:text-white hover:bg-main"
    const inActive = "rounded font-medium text-sm transitions flex gap-3 items-center p-4"

    const Hover = ({ isActive }) =>
        isActive ? `${active} ${inActive}` : `${inActive} ${hover}`;

    return (
        <Layout>
        <div className='min-h-screen container-alone mx-auto px-2'>
            <div className='xl:grid grid-cols-8 gap-10 items-start md:py-12 py-6'>
                <div className='col-span-2 sticky bg-dry border border-gray-800 p-6 rounded-md xl:mb-0 mb-5'>
                    {
                        SideLinks.map((link, index) => (
                            <NavLink to={link.link} key={index} className={Hover}>
                                <link.icon /> <p>{link.name}</p>
                            </NavLink>
                        ))
                    }
                </div>
                <div
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-delay="10"
                    data-aos-offset="200"
                    className='col-span-6 rounded bg-dry  border-gray-800 p-6'>
                    {children}

                </div>

            </div>
        </div>
        </Layout>





    )
}

export default SideBarHome
