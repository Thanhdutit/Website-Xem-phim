import React from 'react'
import SideBarHome from '../SideBarHome'
import { FaRegListAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import Tablecom from '../../compodashboard/Tablecom';
import { HiViewGridAdd } from 'react-icons/hi';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import Loader from '../../Loader/Loader';
import '../style.css'
let url = 'http://localhost:1001/films/'
let urlCate = 'http://localhost:1001/categoryFilms'
function Dashboard() {

    const [data, setData] = useState([])
    const [SumUser, setSumUser] = useState(0)
    const [isAnime, setIsAnime] = useState(false);
    const [url_set,setUrl] = useState(url)
    const [url_Cate,setUrlCate] = useState(urlCate)
    const [sumCate, setSumCate] = useState(0)
    const [isDeleteSuccess,setIsDeleteSucess] = useState(false)
    useEffect(() => {
        async function getData() {
            let result = await axios(url_set)
            setData(result.data)
        }
        async function getUser() {
            let result = await axios.get('http://localhost:1001/accounts')
            setSumUser(result.data.length)
        }
        async function getCategories() {
            let result = await axios.get(url_Cate)
            setSumCate(result.data.data.length)
        }
        getCategories()
        getUser()
        getData()
    }, [url_set,isDeleteSuccess,url_Cate])
    const OnDeletedFunction = async (data) => {
        let isDelete = window.confirm("Bạn chắc muốn xóa chứ")
        if (isDelete) {
            let url_new = url_set+ data.id
            let data1 = await axios.delete(url_new)

            if (data1.data.errCode) {
                alert(`Xóa ${data.name} thành công`)
                setIsDeleteSucess(true)
            }

        }
    }
    const DashboardData = [
        {
            bg: "bg-orange-600",
            icon: FaRegListAlt,
            title:isAnime?"Tổng anime":"Tổng phim" ,
            total: data.length
        },
        {
            bg: "bg-blue-700",
            icon: HiViewGridAdd,
            title: "Tổng loại",
            total: sumCate
        },
        {
            bg: "bg-green-600",
            icon: FaUser,
            title: "Tổng người dùng",
            total: SumUser
        },
    ]

    return (

        <>

            <SideBarHome>
                <button className='btn_film_anime' onClick={()=>{
                    setUrl('http://localhost:1001/films/')
                    setIsAnime(false)
                    setUrlCate('http://localhost:1001/categoryFilms')
                }} >PHIM</button>
                <button className='btn_film_anime' onClick={()=>{
                    setUrl('http://localhost:1001/animes/')
                    setIsAnime(true)
                    setUrlCate('http://localhost:1001/categoryAnimes')
                }}>ANIME</button>
                <h2 className='text-xl font-bold'>Bảng điều khiển</h2>
                <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4'>
                    {DashboardData.map((data, index) => (
                        <div key={index}
                            className='p-4 rounded bg-main border-border grid grid-cols-4 gap-2'>
                            <div className={`col-span-1 rounded-full h-12 w-12 flex-colo ${data.bg}`}>
                                <data.icon className='text-2xl text-white' />
                            </div>
                            <div className='col-span-3'>
                                <h2 >{data.title}</h2>
                                <p className='text-text mt-2 font-bold'>{data.total}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <h3 className='text-md font-medium my-6 text-border'>{isAnime?'Anime gần đây':'Phim gần đây'}</h3>
                <Tablecom data={data.slice(data.length - 5, data.length)} anime={isAnime} admin={true} OnDeletedFunction={OnDeletedFunction} />
            </SideBarHome>
        </>
    )
}

export default Dashboard
