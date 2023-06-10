import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import Tablecom from '../compodashboard/BXHNewFilm'
import Layout from '../Layout/Layout';
let url = 'http://localhost:1001/films'
const BXHPhim = () => {
    const [data, setData] = useState([])
    const [url_set, setUrl] = useState(url)
    const [isAnime, setIsAnime] = useState(false);
    useEffect(() => {

        async function getData() {
            let result = await axios(url_set)
            setData(result.data)
        }
        getData()
    }, [data,url_set])
    return (
        <Layout >
            <div
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="10"
                data-aos-offset="200"
                className='col-span-6 rounded bg-dry  border-gray-800 p-6 '>
                <button className='btn_film_anime ' onClick={() => {
                    setIsAnime(false)
                    setUrl('http://localhost:1001/films/')
                }} >PHIM</button>
                <button className='btn_film_anime' onClick={() => {
                    setIsAnime(true)
                    setUrl('http://localhost:1001/animes/')
                }}>ANIME</button>
                <Tablecom data={data.slice(data.length - 5, data.length)}/>
            </div>

        </Layout>

    )
}

export default BXHPhim