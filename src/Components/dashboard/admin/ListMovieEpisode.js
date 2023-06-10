import React from 'react'
import SideBarHome from '../SideBarHome'
import Tablecom3 from '../../compodashboard/Tablecom3'
import axios from 'axios';
import { useState, useEffect } from 'react'
import authorization from '../../../authorization';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../Pagination';
import EpisodeModal from '../../Modals/EpisodeModal';
import '../style.css'
let url = 'http://localhost:1001/filmitems/'
function ListMovieEpisode() {
    let {id} = useParams()
    const [data, setData] = useState([])
    const [dataEpisode,setDataEpisode] = useState(null)
    const [isDeleteSuccess, setIsDeleteSucess] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(5);
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate()
    const OnEditFunction = async (data) => {
        setDataEpisode(data)
        setModalOpen(true)
       
    }
    const OnDeletedFunction = async (data) => {
        let isDelete = window.confirm("Bạn chắc muốn xóa tập phim này chứ")
        if (isDelete) {
            let data1 = await axios.delete(`http://localhost:1001/filmitems/${data.id}`)
            if (data1.data.errCode) {
                alert(`Xóa tập ${data.episode} thành công`)
                setIsDeleteSucess(!isDeleteSuccess)
            }
        }
    }
    useEffect(() => {
        if (modalOpen === false) {
            setDataEpisode();
        }
        async function AuthorToken() {
            let data = await authorization()
            let isAdmin = false
            data?.role == 1 ? isAdmin = true : isAdmin = false
            if (data === undefined || isAdmin === false) navigate('/404-notfound')
        }
        AuthorToken()
        async function getData() {
            let result = await axios(url+id)
            setData(result.data)
        }
        getData()
    }, [modalOpen,isDeleteSuccess])
    let ListEpisodeSlice =[]
    if (data.length>=1) {
        const lastPostIndex = currentPage * postsPerPage;
        const firstPostIndex = lastPostIndex - postsPerPage;
        ListEpisodeSlice = data.slice(firstPostIndex, lastPostIndex);
    }

    return (
        <SideBarHome>
            <EpisodeModal setModalOpen={setModalOpen} modalOpen={modalOpen} data={dataEpisode} anime={false} />
            <div className='flex flex-col gap-6'>
                <div className='flex-btn gap-2  w-full grid md:grid-cols-2'>
                    <h2 className='text-xl font-bold'>DANH SÁCH TẬP PHIM</h2>
                    <div className='flex-btn gap-2 '>
                        <button onClick={()=>setModalOpen(true)} className='bg-main font-medium transitions hover:bg-subMain border border-subMain text-white  py-3 px-6 rounded '>
                            Thêm
                        </button>
                        <button className='bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded '>
                            Xóa tất cả
                        </button>
                    </div>
                </div>

                <Tablecom3 data={ListEpisodeSlice} admin={true} OnEditFunction={OnEditFunction} OnDeletedFunction={OnDeletedFunction} />

            </div>
            <Pagination 
                totalPosts={data.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage} />
        </SideBarHome>
    )
}

export default ListMovieEpisode
