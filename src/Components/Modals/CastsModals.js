import React, { useEffect, useState } from 'react'
import MainModals from './MainModals'
import { Input } from '../compodashboard/UsedInputs'
import Uploder from '../compodashboard/Uploder'
import axios from 'axios';
function CastsModal({ modalOpen, setModalOpen, character, film_id }) {
    const [name, setName] = useState()
    const [file, setFile] = useState()
    const [image, setImage] = useState()

    const HandleClickSubmit = async () => {
        if (character) {
            let imgName = ""
            if (file) {
                let img = file.get('file').path
                let arr = img.split('.')
                for (let i = 0; i < arr.length - 1; i++) imgName += arr[i] + '.'
                imgName = imgName + "jpg"
            }
            let data = await axios.put(`http://localhost:1001/films/character/${character.id}`,
                {
                    name: name ? name : character.name,
                    image: file ? "http://localhost:1001/serverImages/" + imgName : character.image,
                })
            if (data.data?.errCode == 1) {
               
                await axios.post('http://localhost:1001/uploadImages', file)
            }
            setName(null)
            setImage(null)
            setFile(null)
            setModalOpen(false)
        }
        else {
            let imgName = ""
            if (file) {
                let img = file.get('file').path
                let arr = img.split('.')
                for (let i = 0; i < arr.length - 1; i++) imgName += arr[i] + '.'
                imgName = imgName + "jpg"
            }
            let data = await axios.post(`http://localhost:1001/films/${film_id}/character`,
                {
                    name: name,
                    image: file ? "http://localhost:1001/serverImages/" + imgName : image,
                })
            if (data.data?.errCode == 1) {
                await axios.post('http://localhost:1001/uploadImages', file)
            }
            setName(null)
            setImage(null)
            setFile(null)
            setModalOpen(false)

        }

    }
    return (
        <MainModals modalOpen={modalOpen} setModalOpen={setModalOpen} setFile={setFile} setImage={setImage}>
            <div className='inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main text-white rounded-2xl'>
                <h2 className='text-3xl font-bold'>{character ? "Update Cast" : "Create Cast"}</h2>

                <div className='flex flex-col gap-6 text-left mt-6'>
                    <Input
                        label="Nhân vật"
                        placeholder={character ? character.name : "Nhập tên nhân vật ..."}
                        type="text"
                        bg={false}
                        setValue={setName}

                    />

                    <div className='flex flex-col gap-2'>
                        <p className='text-border font-semibold text-sm'>
                            Ảnh nhân vật
                        </p>
                        <Uploder setFile={setFile} setImage={setImage} />
                        <div className='w-32 h-32 p-2 bg-main border border-border rounded'>
                            <img src={image?image:character?character.image:"/images/user.png"} className='w-full h-full object-cover rounded' />
                        </div>

                    </div>
                    <button
                        onClick={HandleClickSubmit}
                        className='w-full flex-rows gap-4 py-3 text-lg  transitions hover:bg-dry border-2 border-subMain rounded bg-subMain text-white'>
                        {character ? "Update" : "Add"}
                    </button>

                </div>


            </div>
        </MainModals>
    )
}

export default CastsModal