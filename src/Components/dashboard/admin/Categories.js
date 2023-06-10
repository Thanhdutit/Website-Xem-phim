import React from 'react'
import SideBarHome from '../SideBarHome'
import { HiPlusCircle } from 'react-icons/hi'
import Tablecom2 from '../../compodashboard/Tablecom2'
import ModalAddUpdate from '../../Modals/ModalAddUpdate'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react'
import authorization from '../../../authorization';
import Pagination from '../../Pagination';
import '../style.css'
let urlCate = 'http://localhost:1001/categoryFilms/'

function Categories() {
  const [modalOpen, setModalOpen] = useState(false);
  const [listCategories, setListCategories] = useState([])
  const [url_Cate,setUrlCate] = useState(urlCate)
  const [isAnime, setIsAnime] = useState(false);
  const navigate = useNavigate()
  const [category, setCategory] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [cateID, setCateID] = useState();
  const [isUpdate, setIupdate] = useState(false);
  const [isDeleteSuccess, setIsDeleteSucess] = useState(false);
  const OnEditFunction = (data) => {
    setCategory(data.name)
    setCateID(data.id)
    setIupdate(true)
    setModalOpen(!modalOpen);
  }
  const onDeleteFunction = async (data) => {
    let isDelete = window.confirm("Bạn chắc muốn xóa thể loại này chứ")
    if (isDelete) {
      let data1 = await axios.delete(url_Cate+ data.id)

      if (data1.data.errCode) {
        alert(`Xóa thể loại phim ${data.name} thành công`)
        setIsDeleteSucess(!isDeleteSuccess)
        setCurrentPage(1)
      }

    }
  }

  useEffect(() => {
    if (modalOpen === false) {
      setCategory();
    }
    async function AuthorToken() {
      let data = await authorization()
      let isAdmin = false
      data?.role == 1 ? isAdmin = true : isAdmin = false
      if (data === undefined || isAdmin === false) navigate('/404-notfound')
    }
    const getCategories = async () => {
      let categories = await axios.get(url_Cate)
      setListCategories(categories.data.data)
    }
    getCategories()
    AuthorToken()
  }, [modalOpen, isDeleteSuccess,url_Cate]);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const categoriesSlice = listCategories.slice(firstPostIndex, lastPostIndex);
  return (
    <SideBarHome>
      <button className='btn_film_anime' onClick={() => {
        setIsAnime(false)
        setUrlCate('http://localhost:1001/categoryFilms/')
      }} >PHIM</button>
      <button className='btn_film_anime' onClick={() => {
        setIsAnime(true)
        setUrlCate('http://localhost:1001/categoryAnimes/')
      }}>ANIME</button>
      <ModalAddUpdate modalOpen={modalOpen} setModalOpen={setModalOpen} category={category} categoriesID={cateID} isUpdate={isUpdate} anime={isAnime} />

      <div className='flex flex-col gap-6'>
        <div className='flex-btn gap-2'>
          <h2 className='text-xl font-bold'>DANH SÁCH THỂ LOẠI</h2>
          <button
            onClick={() => {
              setModalOpen(true)
              setIupdate(false)
            }}
            className='bg-subMain flex-rows grap-4 font-medium transitions hover:bg-main border border-subMain text-white py-2 px-4 rounded '>
            <HiPlusCircle className='mr-2' /> THÊM
          </button>
        </div>

        <Tablecom2 data={categoriesSlice} users={false} OnEditFunction={OnEditFunction} onDeleteFunction={onDeleteFunction} />

      </div>
      <Pagination
        totalPosts={listCategories.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage} />
    </SideBarHome>
  )
}

export default Categories
