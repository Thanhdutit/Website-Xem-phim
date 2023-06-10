import React from 'react'
import SideBarHome from '../SideBarHome'
import Tablecom from '../../compodashboard/Tablecom'
import axios from 'axios';
import { useState, useEffect } from 'react'
import authorization from '../../../authorization';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../Pagination';
import '../style.css'
let url = 'http://localhost:1001/films'
function MovieList() {
    const [data, setData] = useState([])
    const [isDeleteSuccess, setIsDeleteSucess] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(5);
    const [isAnime, setIsAnime] = useState(false);
    const [url_set,setUrl] = useState(url)
    const navigate = useNavigate()
    const OnDeletedFunction = async (data) => {

        let isDelete = window.confirm("Bạn chắc muốn xóa chứ")
        if (isDelete) {
            let data1 = await axios.delete(url_set+data.id)
            if (data1.data.errCode) {
                alert(`Xóa ${data.name} thành công`)
                setIsDeleteSucess(true)
            }

        }
    }
    useEffect(() => {
        async function getData() {
            let result = await axios(url_set)
            setData(result.data)
        }
        async function AuthorToken() {
            let data = await authorization()
            let isAdmin = false
            data?.role == 1 ? isAdmin = true : isAdmin = false
            if (data === undefined || isAdmin === false) navigate('/404-notfound')
        }
        AuthorToken()
        getData()
    }, [data])

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const movieSlice = data.slice(firstPostIndex, lastPostIndex);
    return (
        <SideBarHome>
            <button className='btn_film_anime' onClick={()=>{
                    setUrl('http://localhost:1001/films/')
                    setIsAnime(false)
                  
                }} >PHIM</button>
                <button className='btn_film_anime' onClick={()=>{
                    setUrl('http://localhost:1001/animes/')
                    setIsAnime(true)
                   
                }}>ANIME</button>
            <div className='flex flex-col gap-6'>
                <div className='flex-btn gap-2  w-full grid md:grid-cols-2'>
                    <h2 className='text-xl font-bold'>{isAnime?'DANH SÁCH ANIME':'DANH SÁCH PHIM'}</h2>
                    <div className='flex-btn gap-2 '>
                        <Link to={isAnime?'/addanime':'/addmovie'} className='bg-main font-medium transitions hover:bg-subMain border border-subMain text-white  py-3 px-6 rounded '>
                            Thêm
                        </Link>
                        <button className='bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded '>
                            Xóa tất cả
                        </button>
                    </div>
                </div>

                <Tablecom data={movieSlice} admin={true} OnDeletedFunction={OnDeletedFunction} anime={isAnime}/>

            </div>
            <Pagination 
                totalPosts={data.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage} />
        </SideBarHome>
    )
}

export default MovieList
