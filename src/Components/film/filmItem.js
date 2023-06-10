import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AiFillHeart } from "react-icons/ai";
import './filmItem.css';
import axios from 'axios';
import authorization from '../../authorization';
import { useState } from 'react';
import Loader from '../Loader/Loader';
import Layout from '../Layout/Layout';
let url = 'http://localhost:1001/films/'
function AnimeItem() {
    const { id } = useParams()

    //state
    const [anime, setAnime] = React.useState({})
    const [author, setAuthor] = React.useState()
    const [cate, setCate] = React.useState()
    const [characters, setCharacters] = React.useState([])
    const [showMore, setShowMore] = React.useState(false)
    const [href, setHref] = React.useState("")
    const [userID, setUserID] = useState()
    const [loading, setLoading] = useState(false)
    const [stateBtn, setStateBtn] = useState(false)
    const HandleClickLike = async () => {
        setLoading(true)
       
        stateBtn? await axios.delete(`http://localhost:1001/accounts/favoriteFilms/${userID}/delete/${id}`)
        : await axios.post(`http://localhost:1001/accounts/favoriteFilms/${userID}`, {
            film_id: id
        })
        setStateBtn(!stateBtn)
        setTimeout(() => {
            setLoading(false)
          }, 1000);
        
    }

    const getAnime = async (anime) => {
        const response = await fetch(`http://localhost:1001/films/${anime}`)
        const data = await response.json()
        setAnime(data)
        const cate = await axios('http://localhost:1001/categoryFilms/'+data.categories_id)
        setCate(cate.data.name)
        const au = await axios.get('http://localhost:1001/authors/films/'+data.author_id)
        setAuthor(au.data.data.name)
    }

    const getCharacters = async (id) => {
        let characters = await axios.get(`http://localhost:1001/films/${id}/character`)
        setCharacters(characters.data)
    }
    useEffect(() => {
        getAnime(id)
        setHref("/film/" + id + "/details/1")
        getCharacters(id)
        async function AuthorToken() {
            let data = await authorization()
            if (data != undefined) {
                setUserID(data.id)
            }
        }
        async function getData() {
            let result = await axios(`http://localhost:1001/accounts/favoriteFilms/${userID}`)
            result.data.map(element => {
                if(element.id.toString()==id) setStateBtn(true)
            })
        }
        AuthorToken()
        if(userID!=undefined) getData()
        
       
    }, [userID,loading])

    return (
        <Layout>
        <div className='main-item'>
            <div className='main-item-film'>
                <h1>{anime.name}</h1>
                <div className="details">
                    <div className="detail">
                        <div className="image-film">
                            <img src={anime.image} alt="" />
                        </div>
                        <div className="anime-details">
                            {/* <p><span>Xếp hạng:</span><span>{rating}</span></p> */}
                            <p><span>Đạo diễn:</span><span>{author}</span></p>

                            <p><span>Trạng thái:</span><span>{anime.status}</span></p>
                            <p><span>Thể loại:</span><span>{cate}</span></p>
                            <p><span>Số tập:</span><span>{anime.episode_sum}</span></p>
                            <p><span>Đánh giá:</span><span>{anime.evaluate}</span></p>

                            <div className='btn_details'>
                                <a href={href} className='btn_xem'>Xem ngay</a>
                                {
                                    loading ? <Loader /> : <a onClick={HandleClickLike} className='btn_like'>{stateBtn ? 'Đã thích' : 'Thích'}</a>
                                }
                            </div>
                        </div>
                    </div>
                    <p className="description">
                        {showMore ? anime.description : anime.description?.substring(0, 450) + '...'}
                        <button onClick={() => {
                            setShowMore(!showMore)
                        }}>{showMore ? 'Show Less' : 'Read More'}</button>

                    </p>


                </div>

                <h3 className="title">Trailer</h3>
                <div className="trailer-con">
                    {anime?.trailer ?
                        <iframe
                            src={anime?.trailer}
                            title="Inline Frame Example"
                            width="800"
                            height="450"
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            autoPlay>
                        </iframe> :
                        <h3>Trailer not available</h3>
                    }

                </div>

                <h3 className="title">Nhân Vật</h3>
                <div className="characters">
                    {characters?.map((character, index) => {
                        return <Link key={index}>
                            <div className="character">
                                <img src={character?character.image:'https://tse4.mm.bing.net/th?id=OIP.CXYlQTxpGr_bWh76qvD7EgHaFa&pid=Api&P=0&h=180'} className='' />
                                <h4>{character.name}</h4>
                               
                            </div>
                        </Link>
                    })}
                </div>
            </div>
        </div >
        </Layout>
    )
}



export default AnimeItem