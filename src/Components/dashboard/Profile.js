import React, { useState, useEffect } from 'react'
import SideBarHome from './SideBarHome'
import Uploder from '../compodashboard/Uploder'
import { Input } from '../compodashboard/UsedInputs'
import authorization from '../../authorization';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Profile() {

    const [file, setFile] = useState()
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [phongNumber, setPhoneNumber] = useState("")
    const [address, setAddress] = useState("")
    const [age, setAge] = useState("")
    const [userID, setUserID] = useState()
    const [image, setImage] = useState()
    useEffect(() => {

        async function AuthorToken() {
            let data = await authorization()
            if (data === undefined) navigate('/404-notfound')
            setName(data?.name ? data.name : "")
            setPhoneNumber(data?.phonenumber ? data.phonenumber : "")
            setAddress(data?.address ? data.address : "")
            setAge(data?.age ? data.age : "")
            setUserID(data.id)
            setImage(data?.image)
            setFile(null)
        }
        AuthorToken()
    }, [])
    async function HandleClickSubmit() {
        let isSuccess = window.confirm('BẠN CÓ CHẮC CHẮN MUỐN UPDATE')
        if (isSuccess) {

            let data = await HandleAPIUpdate()
            if (data?.errCode == 1) {
                await axios.post('http://localhost:1001/uploadImages', file)
                let accessToken = data.accessToken
                localStorage.removeItem('token')
                localStorage.setItem('token', accessToken)
            }
            window.alert(data.message)

        }

    }
    async function HandleAPIUpdate() {
        let imgName = ""
        if (file) {
            let img = file.get('file').path
            let arr = img.split('.')
            for (let i = 0; i < arr.length - 1; i++) imgName += arr[i] + '.'
            imgName = imgName + "jpg"
        }

        let data = await axios.put(`http://localhost:1001/accounts/${userID}`,
            {
                name: name,
                phonenumber: phongNumber,
                age: age,
                image: file ? "http://localhost:1001/serverImages/" + imgName : image,
                address: address
            })
        return data.data
    }
    return (
        <SideBarHome>
            <div className='flex flex-col gap-6'>
                <h2 className='text-xl font-bold'> Profile</h2>
                <Input
                    label="Full Name"
                    type="text"
                    bg={true}
                    setValue={setName}
                    value={name}
                />
                <div className='w-full grid md:grid-cols-2 gap-6'>
                    <div className='flex flex-col gap-2 w-full '>
                        <p className='text-border font-semibold text-sm'>
                            Image
                        </p>
                        <Uploder setFile={setFile}
                            setImage={setImage}
                        />
                        <div className='w-32 h-32 p-2 bg-main border border-border rounded'>
                            <img src={image} alt='' className='w-full h-full object-cover rounded' />
                        </div>
                    </div>
                </div>


                <Input
                    label="Address"

                    type="email"
                    setValue={setAddress}
                    bg={true}
                    value={address}
                />
                <Input
                    label="Phone Number"

                    type="text"
                    bg={true}
                    setValue={setPhoneNumber}
                    value={phongNumber}
                />
                <Input
                    label="Age"
                    value={age}
                    type="email"
                    setValue={setAge}
                    bg={true}
                />

                <div className='flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center my-4'>
                    <button className='bg-subMain font-medium transitions hover:bg-main border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto'

                    >
                        Delete Account
                    </button>
                    <button onClick={HandleClickSubmit} className='bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto'>
                        Update Profile
                    </button>
                </div>
            </div>
        </SideBarHome>
    )
}

export default Profile
