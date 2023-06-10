import React, { useEffect, useState } from 'react'
import SideBarHome from './SideBarHome'
import { Input } from '../compodashboard/UsedInputs'
import axios from 'axios';
import authorization from '../../authorization';
import { useNavigate} from 'react-router-dom';
function Password() {
    const [pass, setPass] = useState()
    const [Newpass, setNewPass] = useState()
    const navigate = useNavigate()
    const [NewpassAgain, setNewPassAgain] = useState()
    const [userID, setUserID] = useState()
    const [value, setValue] = useState()
    const [style, setStyle] = useState('hidden')
    useEffect(() => {

        async function AuthorToken() {
            let data = await authorization()
            if(data===undefined) navigate('/404-notfound')
            setUserID(data.id)

        }

        AuthorToken()
    }, [])
    async function ChangePass() {
        if (Newpass === NewpassAgain) {
            let data = await axios.put(`http://localhost:1001/accounts/changepass/${userID}`, {
                password: pass,
                Newpass: Newpass
            })
            if (data.data.errCode == 1) {
                
                setValue('Đổi mật khẩu thành công')
                setStyle('message_pass_change')
            }
            else {
                setValue('Mật khẩu không chính xác')
                setStyle('message_pass_change')
            }
        }
        else
        {
            setValue('Mật khẩu không khớp')
            setStyle('message_pass_change')
        } 

    }
    return (
        <SideBarHome>
            <div className='flex flex-col gap-6'>
                <h2 className='text-xl font-bold'> Thay đổi mật khẩu</h2>
                <lable className={style}>{value}</lable>

                <Input
                    label="Mật khẩu cũ"
                    placeholder="********"
                    type="password"
                    bg={true}
                    setValue={setPass}
                    
                />
                <Input
                    label="Mật khẩu mới"
                    placeholder="********"
                    type="password"
                    bg={true}
                    setValue={setNewPass}
                    
                />
                <Input
                    label="Nhập lại mật khẩu"
                    placeholder="********"
                    type="password"
                    bg={true}
                    setValue={setNewPassAgain}
                    
                />

                <div className='flex justify-end items-center my-4'>

                    <button onClick={ChangePass} className='bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto'>
                        Thay đổi mật khẩu
                    </button>
                </div>
            </div>
        </SideBarHome>
    )
}

export default Password
