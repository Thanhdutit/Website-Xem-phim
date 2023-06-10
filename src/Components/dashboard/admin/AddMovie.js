import React from 'react'
import SideBarHome from '../SideBarHome'
import { Input, Message, Select } from '../../compodashboard/UsedInputs'
import Uploder from '../../compodashboard/Uploder'
import UploderVideo from '../../compodashboard/UploderVideo'
import { UsersData } from '../../../Data/MovieData'
import { MdDelete } from "react-icons/md"
import { FaEdit } from 'react-icons/fa'
import { ImUpload } from 'react-icons/im'
import CastsModal from '../../Modals/CastsModals'
import { useState, useEffect } from 'react'
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import authorization from '../../../authorization';
import FilmHome from '../../anime/animeHome'
import '../style.css'
function AddMovie() {
    const [listCategories, setListCategories] = useState([])
    const [listAuthor, setListAuthor] = useState([])
    const navigate = useNavigate()
    
    const [modalOpen, setModalOpen] = useState(false);
    const [cast, setCast] = useState(null);

    const [image, setImage] = useState()
    const [fileImage, setFile] = useState()

    const [video, setVideo] = useState()
    const [fileVideo, setFileVideo] = useState()
    const [name, setName] = useState("")
    const [author, setAuthor] = useState("")
    const [hot, setHot] = useState(0)
    const [category, setCategory] = useState("")
    const [episodeSum, setEpisodeSum] = useState("")
    const [status, setStatus] = useState("")
    const [description, setDescription] = useState("")
    const [evaluate, setEvaluate] = useState("")
    let dtSelect = [
        {
            id:0,
            name:"Không"
        },
        {
            id:1,
            name:'Có'
        }

        
    ]
    useEffect(() => {
        if (modalOpen === false) {
            setCast();
        }
        async function AuthorToken() {
            let data = await authorization()
            let isAdmin = false
            data?.role == 1 ? isAdmin=true : isAdmin=false
            if(data===undefined||isAdmin===false) navigate('/404-notfound')
        }
        const getCategories = async () => {
            let categories = await axios.get('http://localhost:1001/categoryFilms')
            setListCategories(categories.data.data)
            setCategory(categories.data.data[0].id)
        }
        const getAuthor = async () => {
            let author = await axios.get('http://localhost:1001/authors/films')
            setListAuthor(author.data)
            setAuthor(author.data[0].id)
        }
        getAuthor()
        getCategories()
        AuthorToken()
    }, [modalOpen]);
    const HandleClickSubmit = async () => {
        let isSuccess = window.confirm('BẠN CÓ CHẮC CHẮN MUỐN THÊM PHIM')
        if (isSuccess) {
            let data = await HandleAPIUpdate()
            if (data?.errCode == 1)
            {
                await axios.post('http://localhost:1001/uploadImages', fileImage)
                await axios.post('http://localhost:1001/uploadVideos', fileVideo)
            }
            window.alert(data.message)
            navigate('/movieslist')
        }
    }
    
    async function HandleAPIUpdate() {
        let img = fileImage.get('file').path
        let arr = img.split('.')
        let imgName = ""
        for(let i=0; i<arr.length-1;i++) imgName+=arr[i]+'.'
        imgName = imgName + "jpg"
        let data = await axios.post(`http://localhost:1001/films`,
            {
                name: name,
                author_id: author,
                categories_id: category,
                episode_sum: episodeSum,
                status: status,
                description :description,
                evaluate:evaluate,
                trailer:fileVideo?"http://localhost:1001/serverVideos/"+ fileVideo.get('video').path:video,
                image:fileImage?"http://localhost:1001/serverImages/"+ imgName:image,
                hot:hot
            })
        return data.data
    }
    return (
            <SideBarHome>
                <CastsModal modalOpen={modalOpen} setModalOpen={setModalOpen} cast={cast} />
                <div className='flex flex-col gap-6 add-film-home' >
                    <h2 className='text-xl font-bold'>Thêm phim</h2>
                    <div className='w-full grid md:grid-cols-2 gap-6'>

                        <Input
                            label="Tên phim"
                            setValue={setName}
                            type="text"
                            bg={true}
                        />
                        <div className='text-sm w-full'>
                            <Select label="Thể loại" options={listCategories} setValue={setCategory} />
                        </div>
                    </div>

                    <div className='w-full grid md:grid-cols-2 gap-6'>

                        <Input
                            label="Số tập"
                            setValue={setEpisodeSum}
                            type="text"
                            bg={true}
                        />
                        <Input
                            label="Trạng thái"
                            setValue={setStatus}
                            type="text"
                            bg={true}
                        />


                    </div>
                    <div className='w-full grid md:grid-cols-2 gap-6'>

                    <div className='text-sm w-full'>
                            <Select label="Tác giả" options={listAuthor} setValue={setAuthor} />
                        </div>
                        <Input
                            label="Đánh giá trên BXH"
                            setValue={setEvaluate}
                            type="text"
                            bg={true}
                        />


                    </div>
                    {/* //imasge */}
                    <div className='w-full grid md:grid-cols-2 gap-6'>
                        <div className='flex flex-col gap-2'>
                            <p className='text-border font-semibold text-sm'>
                                Ảnh tiêu đề
                            </p>
                            <Uploder setImage={setImage} setFile={setFile} />
                            <div className='w-32 h-32 p-2 bg-main border border-border rounded'>
                                <img src={image ? image : "images/movies/1.jpg"} alt='' className='w-full h-full object-cover rounded' />
                            </div>
                        </div>

                    </div>

                    {/* Description */}
                    <Message
                        label="Mô tả bộ phim"
                        setDescription={setDescription}
                    />
                    <div className='text-sm w-full'>
                            <Select label="HOT" options={dtSelect} setValue={setHot} />
                        </div>
                    {/* category */}


                    {/* movie */}
                    <div className='w-full grid md:grid-cols-2 gap-6'>
                        <div className='flex flex-col gap-2'>
                            <p className='text-border font-semibold text-sm'>
                                Trailer
                            </p>
                            <UploderVideo setVideo={setVideo} setFile={setFileVideo} />

                        </div>
                        <div className='flex flex-col justify-end gap-2'>
                            <iframe className='py-2 px-2 border-2 border-border border-solid bg-main rounded-md cursor-point ' width="95%" height="85%" src={video ? video : ''} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

                        </div>
                    </div>


                    {/* cast */}

                    

                    {/* Submit */}
                    <button onClick={HandleClickSubmit} className='bg-subMain w-full flex-rows gap-6 font-medium  text-white py-4 rounded mt-10'>
                        <ImUpload /> Thêm
                    </button>


                </div>
            </SideBarHome>
    )
}

export default AddMovie
