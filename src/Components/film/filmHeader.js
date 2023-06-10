import react, { useState, useEffect } from 'react'
import './filmHeader.css';
import { BiSearchAlt } from "react-icons/bi";
import axios from 'axios';
let url = 'http://localhost:1001/films/'
const FilmHeader = ({
    setUrl,
    setCurrentPage
}) => {
    const [listCategories, setListCategories] = useState([])
    const [search, setSearch] = useState("");
    useEffect(() => {
        const getCategories = async () => {
            let categories = await axios.get('http://localhost:1001/categoryFilms')
            setListCategories(categories.data.data)
        }
        getCategories()
    }, [])
    const searchMovie = (evt) => {
        if (evt.key == "Enter") {
            if (search.trim().length != 0) {
                let urlNew = url + `search/${search.trim()}`;
                setUrl(urlNew);
                setSearch("");
                setCurrentPage(1)
            }
            else {
                setUrl(url)
                setCurrentPage(1)
            }


        }
    }
    const HandleClickSearch= () =>
    {
        if (search.trim().length != 0) {
            let urlNew = url + `search/${search.trim()}`;
            setUrl(urlNew);
            setSearch("");
            setCurrentPage(1)
        }
        else 
        {
            setUrl(url)
            setCurrentPage(1)
        }
    }
    return (
        <div className='header-film-alone'>
            <div className='header-80'>
                <div className='task'>
                    <a onClick={()=> setUrl(url)} className='main-page-film'>TRANG CHỦ</a>
                    <a className='hover-list-item'>THỂ LOẠI
                        <div className='kind-hover'>
                            {
                                listCategories.map((data, index) => {
                                    return (
                                        <a onClick={() => {
                                            setUrl(url + `categories/${data.id}`)
                                            setCurrentPage(1)
                                        }}>{data.name}</a>
                                    )
                                })
                            }
                        </div>
                    </a>
                </div>
                <div className='search-header'>

                    <input type='text' placeholder='Tìm kiếm ...' onChange={(e) => { setSearch(e.target.value) }}
                        value={search} onKeyPress={searchMovie}></input>
                    <BiSearchAlt onClick={HandleClickSearch} />
                </div>
            </div>
        </div>
    )
}
export default FilmHeader