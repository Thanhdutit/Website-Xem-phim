
import React, { useState, useEffect, useRef } from 'react';
import './HomeStyle.css';
import { AiFillDatabase, AiOutlinePoweroff,AiFillDollarCircle,AiOutlineThunderbolt } from "react-icons/ai";
import authorization from '../../authorization';
const Footer = (props) => {
    const [onHidden, setonHidden] = useState(false)
    const [admin, setAdmin] = useState(false)
    const [data, setData] = useState()
    const [vip,setVip] = useState(false)
    const handleClick = () => {
        setonHidden(!onHidden)
    }
    const handleClickLogOut = () => {
        localStorage.removeItem('token')
    }
    let menuRef = useRef();
    useEffect(() => {
        async function AuthorToken() {
            let data = await authorization()
            if (data != undefined) {
                data?.role == 1 ? setAdmin(true) : setAdmin(false)
                setData(data)
                data.VIP ==1 ?setVip(true):setVip(false)
            }
        }
        AuthorToken()
        let handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setonHidden(false);
            }
        };
        document.addEventListener('mousedown', handler)
        return () => {
            document.removeEventListener("mousedown", handler);
        }
    },[data])
    return (
        <div className='face-login' ref={menuRef} >
            <h5 className={vip?'nhapnhay vip':'hidden'}>VIP</h5>
            <img className='face-img' src={data?.image ? data.image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDZ3sl-uWEz_3FQhY92IoGCiRwUjDe73vUEg&usqp=CAU'} title={data?.name ? data.name : 'Any One'} onClick={handleClick} >
            </img>
            <div className={onHidden ? 'block' : 'hidden'}>
                <a href={admin ? '/dashboard' : '/profile'}><AiFillDatabase></AiFillDatabase><h5>Quản lý tài khoản</h5></a>
                <br />
                <a href={vip ? '/':'/pay'}>{vip?<AiOutlineThunderbolt/>:<AiFillDollarCircle/>}<h5>{vip?'Chức năng VIP':'Nâng cấp VIP (20$)'}</h5></a>
                <br />
                <a href='/' onClick={handleClickLogOut} ><AiOutlinePoweroff></AiOutlinePoweroff><h5>Đăng xuất</h5></a>
            </div>
        </div>

    )
}
export default Footer