import React, { useState, useEffect } from "react";
import './details.css';
import Episode from "./episode";
import Comment from "./comment";
import { useParams } from "react-router-dom";
import axios from 'axios'
import authorization from '../../../authorization';
import { AiFillHtml5 } from "react-icons/ai";
import Layout from "../../Layout/Layout";
const Details = () => {
    const { id, episode } = useParams()
    const [dataFilm, setDataFilm] = useState([])
    const [listComment, setListComment] = useState([])
    const [dataFilmItem, setdataFilmItem] = useState({})
    const [name, setName] = useState()
    const [state, setState] = useState(false)
    const [value, setValue] = useState()
    const [userID, setUserID] = useState()
    const [isHidden, setIsHidden] = useState(true)
    useEffect(() => {
        const getAll = async () => {
            let data = await axios.get(`http://localhost:1001/filmitems/${id}`)
            setDataFilm(data.data)
        }
        const getEpisode = async () => {
            let data = await axios.get(`http://localhost:1001/filmitems/details/${id}/${episode}`)
            setdataFilmItem(data.data)
        }
        const getFilmByID = async () => {
            let data = await axios.get(`http://localhost:1001/films/${id}`)
            setName(data.data.name)
        }
        const getComments = async () => {
            let data = await axios.get(`http://localhost:1001/comments/${id}`)
            setListComment(data.data)
        }
        async function AuthorToken() {
            let data = await authorization()
            if (data != undefined) {
                setUserID(data.id)
                setIsHidden(false)
            }

        }

        getComments()
        getFilmByID()
        getAll()
        getEpisode()
        AuthorToken()
    }, [userID, state])
    const HandleClickSubmitBtn = async () => {

        let data = await axios.post(`http://localhost:1001/comments/${userID}/addComments/${id}`, {
            content: value
        })

        setState(!state)
    }



    return (
        <Layout>
            <div className="container">
                <div className="container-details-film border-soild border-2 ">
                    <div className="video-container">
                        <iframe

                            src={dataFilmItem?.video}
                            width="800px"
                            height="450px"
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            autoplay>
                        </iframe>

                    </div>


                    <div className="div-name">
                        <div className="div-left">
                            <div className="name_movie-details">
                                <img src="https://cdn.popsww.com/popsapp/assets/images/icons/ic-playlist-orange.svg?format=webp"></img>
                                <h5 >{name ? name : 'Không có dữ liệu'}</h5>
                            </div>
                            <h1 className="NameEpisode">{dataFilmItem?.name} Tập {dataFilmItem?.episode} : {dataFilmItem?.episode_description} </h1>
                        </div>
                        <div className="div-right">

                        </div>
                    </div>
                    
                    <div className="episode-title">
                       <AiFillHtml5 className="mr-3 ml-2 text-amber-600 text-3xl" /> DANH SACH TAP PHIM
                    </div>
                    <div className="episode_all">
                        {
                            dataFilm.map((data, index) => {
                                return (
                                    <>
                                        <a href={`/film/${id}/details/${index + 1}`} className="episode">{index + 1}</a>
                                    </>
                                )
                            })
                        }
                    </div>
                    <div className="comment-details ">
                        <h3 class="mb-4 text-lg font-semibold text-gray-900  ml-4 mt-10">Comments</h3>
                        <hr />
                        <div class={isHidden ? 'hidden' : 'flex  mb-4 w-6/12 ml-2'}>
                            <div class="w-full max-w-xl bg-white rounded-lg px-4 pt-2 ">
                                <div class="flex flex-wrap -mx-3 mb-6">
                                    <div class="w-full md:w-full px-3 mb-2 ">
                                        <textarea class="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white" name="body" placeholder='Nhập...' required onChange={(e) => setValue(e.target.value)}></textarea>
                                    </div>
                                    <div class="w-full md:w-full flex items-start md:w-full px-3">
                                        <div class="flex items-start w-1/2 text-gray-700 px-2 mr-auto">
                                            <svg fill="none" class="w-5 h-5 text-gray-600 mr-1" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <p class="text-xs md:text-sm pt-px">Bình luận ---</p>
                                        </div>
                                        <div class="-mr-1 btn-sm">
                                            <button onClick={HandleClickSubmitBtn} type='submit' class="bg-blue-600 text-white border-solid border-2 font-medium py-1 px-4 border border-blue-950 rounded-lg tracking-wide mr-1 hover:bg-gray-100">Đăng</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="comment_log ml-10 mb-20" >
                            {
                                listComment.map((a, index) => {
                                    return (
                                        <Comment infor={a} key={index}></Comment>
                                    )
                                })
                            }
                        </div>
                    </div>

                </div>
            </div>

        </Layout>
    )
}
export default Details;