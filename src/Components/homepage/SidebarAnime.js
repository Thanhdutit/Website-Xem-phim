import React from 'react'
import { Link } from 'react-router-dom';
import Card from './Card'
import { useState } from "react";
import { useEffect } from "react";
import { BiCaretLeft, BiCaretRight } from "react-icons/bi";
import authorization from '../../authorization';
let url = 'http://localhost:1001/animes'

function SidebarAnime() {
    const [data, setData] = useState([]);
    const [dataSlice, setDataSlice] = useState([]);
    const [url_set, setUrl] = useState(url);
    const [currentPage, setCurrentPage] = useState(1);
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
            
            const lastPostIndex = 5;
            if (data.length>=1) {
                if(vip==false)
                {
                    let movieData1 = []
                    data.map(data=>
                        {
                     
                            if(data.hot==0)
                            {
                                movieData1.push(data)
                            }
                        })
                        if(currentPage<1||currentPage>movieData1.length) setCurrentPage(1)
                        setDataSlice(movieData1.slice(currentPage-1,lastPostIndex+currentPage-1))
                }
                else 
                {
                    if(currentPage<1||currentPage>data.length) {setCurrentPage(1)}
                    setDataSlice(data.slice(currentPage-1,lastPostIndex+currentPage-1))
                }
                
            }        
            
        });
    }, [currentPage,data])
   
    return (
        <div className='hot-film'>
            <div className='title-hot-film-home'>
                <h1>Anime nổi bật</h1>
                <div className='title-hot-film-home-icon'><BiCaretLeft fontSize="40px" color='black'  onClick={()=> setCurrentPage(currentPage-1)} />
                    <BiCaretRight fontSize="40px" color='black' onClick={()=> setCurrentPage(currentPage+1) }/></div>
            </div>
            <div className='hot-film-main'>
                {
                    dataSlice.map((film, index) => {
                        return (
                            <Card info={film} key={index} anime={true}/>
                        )
                    })
                }
            </div>
        </div>
    )
}



export default SidebarAnime