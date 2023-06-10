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
import FilmHeader from "./animeHeader";
import Layout from "../Layout/Layout";
let url = 'http://localhost:1001/animes'
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

    // const getData = (movieType) => {
    //     if (movieType == "Phổ biến") {
    //         url = base_url + "/discover/movie?sort_by=popularity.desc" + API_key;
    //     }
    //     if (movieType == "Sân khấu") {
    //         url = base_url + "/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22" + API_key;
    //     }
    //     if (movieType == "Trẻ em") {
    //         url = base_url + "/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc" + API_key;
    //     }
    //     if (movieType == "Chính kịch") {
    //         url = base_url + "/discover/movie?with_genres=18&primary_release_year=2014" + API_key;
    //     }
    //     if (movieType == "Hài kịch") {
    //         url = base_url + "/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc" + API_key;
    //     }
    //     setUrl(url);

    // }
    // const searchMovie = (evt) => {
    //     if (evt.key == "Enter") {
    //         url = base_url + "/search/movie?api_key=db95773a7fb212ba790d71f6adac0e7e&query=" + search;
    //         setUrl(url);
    //         setSearch(" ");
    //     }
    // }

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