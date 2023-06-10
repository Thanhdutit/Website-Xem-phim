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
import axios from 'axios';
import authorization from '../../../authorization';

import { useParams, useNavigate } from 'react-router-dom'
import Pagination from '../../Pagination';
import './style.css'
function AddMovie() {
    let { id } = useParams()
    const navigate = useNavigate()
    const [listCategories, setListCategories] = useState([])
    const [listCharacter, setListCharacter] = useState([])
    const [listAuthor, setListAuthor] = useState([])
    const [modalOpen, setModalOpen] = useState(false);
    const [character, setCharacter] = useState(null);
    const [admin, setAdmin] = useState(false)
    const [isDeleteSuccess, setIsDeleteSucess] = useState(false);
    const [image, setImage] = useState()
    const [fileImage, setFile] = useState()
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(4);
    const [video, setVideo] = useState()
    const [fileVideo, setFileVideo] = useState()
    const [name, setName] = useState("")
    const [author, setAuthor] = useState("")
    const [category, setCategory] = useState("")
    const [episodeSum, setEpisodeSum] = useState("")
    const [status, setStatus] = useState("")
    const [description, setDescription] = useState("")
    const [evaluate, setEvaluate] = useState("")
    const [filmID, setFilmID] = useState()
    const [hot, setHot] = useState(0)
    useEffect(() => {
        if (modalOpen === false) {
            setCharacter();
        }
        async function AuthorToken() {
            let data = await authorization()
            let isAdmin = false
            data?.role == 1 ? isAdmin = true : isAdmin = false
            if (data === undefined || isAdmin === false) navigate('/404-notfound')
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
        const getFilmByID = async () => {
            let result = await axios.get(`http://localhost:1001/films/${id}`)
            let film = result.data
            setImage(film.image)
            setVideo(film.trailer)
            setEpisodeSum(film.episode_sum)
            setDescription(film.description)
            setStatus(film.status)
            setEvaluate(film.evaluate)
            setName(film.name)
            setCategory(film.categories_id)
            setFilmID(film.id)
            setAuthor(film.author_id)
        }
        const getCharacter = async () => {
            let characters = await axios.get(`http://localhost:1001/films/${id}/character`)
            setListCharacter(characters.data)
        }
        getFilmByID()
        getAuthor()
        getCategories()
        AuthorToken()
        getCharacter()
    }, [modalOpen, isDeleteSuccess]);
    let characterSlice = []
    if (listCharacter.length >= 1) {
        const lastPostIndex = currentPage * postsPerPage;
        const firstPostIndex = lastPostIndex - postsPerPage;
        characterSlice = listCharacter.slice(firstPostIndex, lastPostIndex);
    }
    const HandleClickSubmit = async () => {
        let isSuccess = window.confirm('BẠN CÓ CHẮC CHẮN MUỐN SỬA PHIM')
        if (isSuccess) {
            let data = await HandleAPIUpdate()
            if (data?.errCode == 1) {
                await axios.post('http://localhost:1001/uploadImages', fileImage)
                await axios.post('http://localhost:1001/uploadVideos', fileVideo)
            }
            window.alert(data.message)
            navigate('/movieslist')
        }
    }
    let dtSelect = [
        {
            id: 0,
            name: "Không"
        },
        {
            id: 1,
            name: 'Có'
        }


    ]
    async function HandleAPIUpdate() {
        let imgName = ""
        if (fileImage) {
            let img = fileImage.get('file').path
            let arr = img.split('.')
            for (let i = 0; i < arr.length - 1; i++) imgName += arr[i] + '.'
            imgName = imgName + "jpg"
        }
        let data = await axios.put(`http://localhost:1001/films/${filmID}`,
            {
                name: name,
                author_id: author,
                categories_id: category,
                episode_sum: episodeSum,
                status: status,
                description: description,
                evaluate: evaluate,
                trailer: fileVideo ? "http://localhost:1001/serverVideos/" + fileVideo.get('video').path : video,
                image: fileImage ? "http://localhost:1001/serverImages/" + imgName : image,
                hot:hot
            })
        return data.data
    }
    const HandleDeteleCharacterBtn = async (data) => {
        let isDelete = window.confirm("Bạn chắc muốn xóa nhân vật này chứ")
        if (isDelete) {
            let data1 = await axios.delete(`http://localhost:1001/films/character/${data.id}`)
            if (data1.data.errCode) {
                alert(`Xóa nhân vật ${data.name} thành công`)
                setIsDeleteSucess(!isDeleteSuccess)
            }
        }
    }
    return (
        <SideBarHome>
            <CastsModal modalOpen={modalOpen} setModalOpen={setModalOpen} character={character} film_id={id} />
            <div className='flex flex-col gap-6 add-film-home' >
                <h2 className='text-xl font-bold'>Sửa phim</h2>
                <div className='w-full grid md:grid-cols-2 gap-6'>

                    <Input
                        label="Tên phim"
                        setValue={setName}
                        type="text"
                        bg={true}
                        value={name}
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
                        value={episodeSum}
                    />
                    <Input
                        label="Trạng thái"
                        setValue={setStatus}
                        type="text"
                        bg={true}
                        value={status}
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
                        value={evaluate}
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
                    setValue={description}
                />
                <div className='text-sm w-full'>
                    <Select label="Thể loại" options={dtSelect} setValue={setHot} />
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

                <div className='w-full grid lg:grid-cols-2 gap-6 items-start'>
                    <button onClick={() => setModalOpen(true)}
                        className='w-full py-4 bg-main border border-subMain border-dashed text-white rounded'>
                        Thêm nhân vật
                    </button>
                    <div>
                        <div className='grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-4 grid-cols-2 gap-4'>
                            {listCharacter.length >= 1 ? characterSlice.map((user, i) =>
                            (
                                <div key={i} className='p-2 italic text-xs text-text rounded flex-colo bg-main border border-border'>
                                    <img
                                        src={`${user.image ? user.image : "user.png"}`}

                                        className='img-character w-full object-cover rounded mb-4'
                                    />
                                    <p className='p-overflow-character' >{user.name}</p>
                                    <div className='flex-rows mt-2 w-full gap-2'>
                                        <button onClick={() => HandleDeteleCharacterBtn(user)} className='w-6 h-6 flex-colo bg-dry border border-border text-subMain rounded '>
                                            <MdDelete />
                                        </button>
                                        <button
                                            onClick={() => {
                                                setCharacter(user);
                                                setModalOpen(true);
                                            }}
                                            className='w-6 h-6 flex-colo bg-dry border border-border text-green-600 rounded '>
                                            <FaEdit />
                                        </button>
                                    </div>

                                </div>
                            )) : 'Nhân vật'}

                        </div>
                        {listCharacter.length >= 1 ? <Pagination
                            totalPosts={listCharacter.length}
                            postsPerPage={postsPerPage}
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage} /> : ''}

                    </div>

                </div>

                {/* Submit */}
                <button onClick={HandleClickSubmit} className='bg-subMain w-full flex-rows gap-6 font-medium  text-white py-4 rounded'>
                    <ImUpload /> Sửa
                </button>


            </div>
        </SideBarHome>
    )
}

export default AddMovie
