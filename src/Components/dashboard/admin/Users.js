import React from 'react'
import SideBarHome from '../SideBarHome'
import Tablecom2 from '../../compodashboard/Tablecom2'
import { UsersData } from '../../../Data/MovieData'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import authorization from '../../../authorization';
import axios from 'axios';
function Users() {
  const [admin, setAdmin] = useState(true)
  const [listUser, setListUser] = useState([])
  const navigate = useNavigate()
  const [isDeleteSuccess, setIsDeleteSucess] = useState(false);
  useEffect(() => {

    async function AuthorToken() {
      let data = await authorization()
      let isAdmin = false
      data?.role == 1 ? isAdmin = true : isAdmin = false
      if (data === undefined || isAdmin === false) navigate('/404-notfound')
    }
    const getCategories = async () => {
      let userList = await axios.get('http://localhost:1001/accounts/user')
      setListUser(userList.data)
    }
    getCategories()
    AuthorToken()
  }, [admin,isDeleteSuccess]);
  const OnDeletedFunction = async (data) => {
    let isDelete = window.confirm("Bạn chắc muốn xóa chứ")
    if (isDelete) {
      let data1 = await axios.delete(`http://localhost:1001/accounts/${data.id}`)

      if (data1.data.errCode) {
        alert(`Xóa user ${data.name} thành công`)
        setIsDeleteSucess(true)
      }

    }
  }
  return (
    <SideBarHome>
      <div className='flex flex-col gap-6'>
        <h2 className='text-xl font-bold'>The loai</h2>


        <Tablecom2 data={listUser} users={true} onDeleteFunction={OnDeletedFunction} />

      </div>
    </SideBarHome>
  )
}

export default Users
