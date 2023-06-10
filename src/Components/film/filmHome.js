import { getDefaultNormalizer } from "@testing-library/dom";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Card from "./Card";
import Pagination from "../Pagination";
import { fromAnalog } from "johnny-five/lib/board.pins";
import './style.css';
import authorization from "../../authorization";
import { Link, useParams } from "react-router-dom";
import FilmHeader from "./filmHeader";
import Layout from "../Layout/Layout";
let url = 'http://localhost:1001/films'
const FilmHome = () => {
    const [movieData, setData] = useState([]);
    const [url_set, setUrl] = useState(url);
    const [search, setSearch] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);
    const [vip,setVip] = useState(false)
    useEffect(() => {
        
        async function AuthorToken() {
            let data = await authorization()
            if (data != undefined) {
                data.VIP ==1 ?setVip(true):setVip(false)
            }
        }
        AuthorToken()
        fetch(url_set).then(res => res.json()).then(data => {
            setData(data);
        });
    }, [url_set])
    let movieSlice = []
    if (movieData.length>=1) {
        const lastPostIndex = currentPage * postsPerPage;
        const firstPostIndex = lastPostIndex - postsPerPage;
        if(vip==false)
        {
            let movieData1 = []
            movieData.map(data=>
                {
                    console.log(data);
                    if(data.hot==0)
                    {
                        movieData1.push(data)
                    }
                })
            movieSlice = movieData1.slice(firstPostIndex, lastPostIndex)
        }
        else movieSlice = movieData.slice(firstPostIndex, lastPostIndex)
        
    }
    return (
        <Layout>
        <FilmHeader setUrl={setUrl} setCurrentPage={setCurrentPage} />
        <div className="container">
            <div className="container-film-main">
                <div className="container-film">
                    {
                        (movieData.length == 0) ? <p className="notfound">Không tìm thấy</p> : movieSlice.map((res, pos) => {

                            return (
                                <Card info={res} key={pos} />
                            )
                            
                        })
                    }
                </div>
                <Pagination
                    totalPosts={movieData.length}
                    postsPerPage={postsPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />

            </div>
        </div>
        </Layout>
    )
}

export default FilmHome;