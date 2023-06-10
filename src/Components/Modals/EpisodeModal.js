import React, { useEffect, useState } from 'react'
import MainModals from './MainModals'
import { Input } from '../compodashboard/UsedInputs'
import UploderVideo from '../compodashboard/UploderVideo'
import axios from 'axios';
import { useParams } from 'react-router-dom';
let url = 'http://localhost:1001/filmitems/'
function EpisodeModal({ modalOpen, setModalOpen, data,anime}) {
    let {id} = useParams()
    const [episode, setEpisode] = useState()
    const [fileVideo, setFileVideo] = useState()
    const [video, setVideo] = useState()
    const [title, setTitle] = useState()
    const HandleClickSubmit = async () => {
        if (data) {
            let url_dt = 'http://localhost:1001/filmitems/'
            if(anime) url_dt = 'http://localhost:1001/animeitems/'
            let dt = await axios.put(url_dt +data.id,
                {
                    episode:episode?episode:data.episode,
                    episode_description: title?title:data.episode_description,
                    video: video ? "http://localhost:1001/serverVideos/" + fileVideo.get('video').path : data.video,
                })
            if (dt.data?.errCode == 1) {

                await axios.post('http://localhost:1001/uploadVideos', fileVideo)
            }
            setTitle()
            setVideo()
            setFileVideo()
            setEpisode()
            setModalOpen(false)
        }
        else {
            let data_req =  {
                film_id:id,
                episode:episode?episode:0,
                episode_description: title?title:"Không có dữ liệu",
                video: video ? "http://localhost:1001/serverVideos/" + fileVideo.get('video').path : '',
            }
            let url_dt = 'http://localhost:1001/filmitems/'
            if(anime) 
            {
                url_dt = 'http://localhost:1001/animeitems/'
                data_req = {
                anime_id:id,
                episode:episode?episode:0,
                episode_description: title?title:"Không có dữ liệu",
                video: video ? "http://localhost:1001/serverVideos/" + fileVideo.get('video').path : '',
                }
            }
            let dt = await axios.post(url_dt,data_req)
            if (dt.data?.errCode == 1) {

                await axios.post('http://localhost:1001/uploadVideos', fileVideo)
            }
            setTitle()
            setVideo()
            setFileVideo()
            setEpisode()
            setModalOpen(false)

        }

    }
    return (
        <MainModals modalOpen={modalOpen} setModalOpen={setModalOpen} setFile={setFileVideo} setImage={setVideo} setEpisode={setEpisode}  >
            <div className='inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main text-white rounded-2xl'>
                <h2 className='text-3xl font-bold'>{data ? "Update Episode" : "Create Episode"}</h2>

                <div className='flex flex-col gap-6 text-left mt-6'>
                    <Input
                        label="Tập"
                        placeholder={data ? data.episode : "Tập ..."}
                        type="text"
                        bg={false}
                        setValue={setEpisode}

                    />
                    <Input
                        label="Tiêu đề"
                        placeholder={data ? data.episode_description : "Mô tả tập phim ..."}
                        type="text"
                        bg={false}
                        setValue={setTitle}

                    />

                    <div className='w-full grid md:grid-cols-2 gap-6'>
                        <div className='flex flex-col gap-2'>
                            <p className='text-border font-semibold text-sm'>
                                Video
                            </p>
                            <UploderVideo setVideo={setVideo} setFile={setFileVideo} />

                        </div>
                        <div className='flex flex-col justify-end gap-2'>
                            <iframe className='py-2 px-2 border-2 border-border border-solid bg-main rounded-md cursor-point ' width="95%" height="85%" src={video ? video : data?data.video:''} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

                        </div>
                    </div>
                    <button
                        onClick={HandleClickSubmit}
                        className='w-full flex-rows gap-4 py-3 text-lg  transitions hover:bg-dry border-2 border-subMain rounded bg-subMain text-white'>
                        {data ? "Update" : "Add"}
                    </button>

                </div>


            </div>
        </MainModals>
    )
}

export default EpisodeModal