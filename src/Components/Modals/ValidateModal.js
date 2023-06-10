import React from 'react'
import MainModals from './MainModals'
import { Input } from '../compodashboard/UsedInputs'
import axios from 'axios';
import { useState } from 'react'
function ValidateModal({ modalOpen, setModalOpen,title,isOK }) {
  const HandleYESClick = () =>
  { 
    setModalOpen(false)

  }
  const HandleNOClick = () =>
  {
    setModalOpen(false)

  }
  return (
    <MainModals modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className='inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main text-white rounded-2xl'>
        <h2 className='text-3xl font-bold'>THÔNG BÁO</h2>
        <h2 className='text-sm'>{title}</h2>
        <div className='flex flex-rows gap-6 text-left mt-6'>
        <button
        onClick={HandleNOClick}
            className='w-full flex-rows gap-4 py-3 text-lg  transitions hover:bg-dry border-2 border-subMain rounded bg-subMain text-white'>
            NO
          </button>

          <button
          onClick={HandleYESClick}
            className='w-full flex-rows gap-4 py-3 text-lg  transitions hover:bg-dry border-2 border-green-500 rounded bg-green-500 text-white'>
            YES
          </button>

        </div>


      </div>
    </MainModals>
  )
}

export default ValidateModal