import React from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from 'axios';
const Head = "text-xs text-left text-main font-semibold px-6 py-2 uppercase";
const Text = "text-sm text-left leading-6 whitespace-nowrap px-5 py-3"


//rows
const Rows = (data, i, users, OnEditFunction,onDeleteFunction) => {
  return (

    // {user}
    <tr key={i}>
      {
        users ? (
          <>
           <td className={`${Text}`}>{i+1}</td>
            <td className={`${Text}`}>
              <div className='w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden'>

                <img
                  className='h-full w-full  object-cover'
                  src={data.image}
                  
                />
              </div>
            </td>
          
            <td className={`${Text}`}>{data.name}</td>
            <td className={`${Text}`}>{data.phonenumber}</td>
            <td className={`${Text} float-right flex-rows gap-2`}>

              <button className='bg-subMain text-white rounded flex-colo w-6 h-6 mt-3' onClick={()=>onDeleteFunction(data)} >
                <MdDelete />
              </button>
            </td>
          </>


        )
          :
          (
            <>
              <td className={`${Text} font-bold`}>{i+1}</td>
              <td className={`${Text}`}>{data.name}</td>
              <td className={`${Text} float-right flex-rows gap-2`}>
                <button onClick={() => OnEditFunction(data)} className='border border-border bg-dry flex-rows gap-2 text-border rounded py-1 px-2'>
                  Edit <FaEdit className='text-green-500' />
                </button>
                <button className='bg-subMain text-white rounded flex-colo w-6 h-6' onClick={()=>onDeleteFunction(data)}>
                  <MdDelete />
                </button>
              </td>
            </>

          )
      }
    </tr>
  )
}

// table

function Tablecom2({ data, users, OnEditFunction,onDeleteFunction }) {


  return (
    <div className='overflow-x-scroll overflow-hidden relative w-full'>
      <table className='w-full table-auto border border-border divide-y divide-border'>
        <thead>
          <tr className='bg-dryGray'>

            {
              users ? (
                <>
                  <th scope='col' className={`${Head}`}>Stt</th>
                  <th scope='col' className={`${Head}`}>Image</th>
                 
                  <th scope='col' className={`${Head}`}>Full name</th>
                  <th scope='col' className={`${Head}`}>Phone Number</th>
                </>
              )
                :
                (
                  <>
                    <th scope='col' className={`${Head}`}>Stt</th>
                   
                    <th scope='col' className={`${Head}`}>Title</th>
                  </>
                )
            }

            <th scope='col' className={`${Head} text-end`}>Actions</th>

          </tr>

        </thead>

        <tbody className='bg-main divide-y divide-gray-800'>
          {data.map((data, i) => Rows(data, i, users, OnEditFunction,onDeleteFunction))}
        </tbody>

      </table>
    </div>
  )
}

export default Tablecom2
