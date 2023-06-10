import React, { useState,useEffect } from 'react'
import SideBarHome from './SideBarHome'

import { Movies } from '../../Data/MovieData';

import Tablecom from '../compodashboard/Tablecom';
import axios from 'axios';
import authorization from '../../authorization';
import { useNavigate} from 'react-router-dom';
let url = 'http://localhost:1001/accounts/favoriteFilms/'
function FavoritesMovies() {
    const [data,setData] = useState([])
    const [userID,setUserID] = useState()
    const navigate = useNavigate()
    const [isDeleteSuccess, setIsDeleteSucess] = useState(false);
    const [url_set,setUrl] = useState(url)
    const [isAnime, setIsAnime] = useState(false);
    const OnDeletedFunction = async (data)=>
    {
        let isDelete = window.confirm("Bạn chắc muốn xóa chứ")
        if (isDelete) {
          let data1 = await axios.delete(`${url_set}${userID}/delete/${data.id}`)
    
          if (data1.data.errCode) {
            alert(`Xóa thể loại phim ${data.name} thành công`)
            setIsDeleteSucess(true)
          }
    
        }
    }
    useEffect(() => {

        async function AuthorToken() {
            let data = await authorization()
            setUserID(data.id)
            if(data===undefined) navigate('/404-notfound')
        }
        async function getData()
        {
            let result = await axios(url_set+userID)
            setData(result.data)
        }
        getData()
        AuthorToken()
    },[userID,data,isDeleteSuccess,url_set])
  return (
   <SideBarHome>
     <button className='btn_film_anime' onClick={() => {
        setIsAnime(false)
        setUrl('http://localhost:1001/accounts/favoriteFilms/')
      }} >PHIM</button>
      <button className='btn_film_anime' onClick={() => {
        setIsAnime(true)
        setUrl('http://localhost:1001/accounts/favoriteAnimes/')
      }}>ANIME</button>
    <div className='flex flex-col gap-6'>
        <div className='flex-btn gap-2'>
            <h2 className='text-xl font-bold'>Favorites Movies</h2>
            <button className='bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded '>
                Xóa tất cả
            </button>
        </div>
        {
            
            <Tablecom data={data} admin={false} OnDeletedFunction={OnDeletedFunction} anime={isAnime} />

        }
       
    </div>
   </SideBarHome>
  )
}

export default FavoritesMovies
