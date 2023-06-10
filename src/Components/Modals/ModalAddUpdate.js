import React from 'react'
import MainModals from './MainModals'
import { Input } from '../compodashboard/UsedInputs'
import ValidateModal from './ValidateModal'
import axios from 'axios';
import { useState } from 'react'
function CategoryModal({ modalOpen, setModalOpen, category, categoriesID, isUpdate,anime }) {
  const [value, setValue] = useState("")
  const HandleClickAddBtn = async () => {
    if (isUpdate) {
      if (value.trim() != "") {
        let url = 'http://localhost:1001/categoryFilms/'
        if(anime) url = 'http://localhost:1001/categoryAnimes/'
        let data = await axios.put(url +categoriesID, {
          name: value
        })
        setModalOpen(false)
      }
    }
    else {
      if (value.trim() != "") {
        let url = 'http://localhost:1001/categoryFilms/'
        if(anime) url = 'http://localhost:1001/categoryAnimes/'
        let data = await axios.post(url, {
          name: value
        })
        setModalOpen(false)
      }
    }

  }
  return (
    <MainModals modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className='inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main text-white rounded-2xl'>
        <h2 className='text-3xl font-bold'>{category ? "Update" : "Create"}</h2>
        <div className='flex flex-col gap-6 text-left mt-6'>
          <Input
            label="Thể loại"
            placeholder={category ? category : "action"}
            type="text"
            bg={false}
            setValue={setValue}
          />
          <button
            onClick={HandleClickAddBtn}
            className='w-full flex-rows gap-4 py-3 text-lg  transitions hover:bg-dry border-2 border-subMain rounded bg-subMain text-white'>
            {category ? "Update" : "Add"}
          </button>

        </div>


      </div>
    </MainModals>
  )
}

export default CategoryModal