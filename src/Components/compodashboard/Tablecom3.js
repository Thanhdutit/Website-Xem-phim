import React from 'react'
import { FaCloudDownloadAlt, FaEdit } from "react-icons/fa";
import { FcList } from "react-icons/fc";
import { MdDelete } from "react-icons/md";
import { GoEye } from "react-icons/go";
import { Link } from 'react-router-dom';
const Head = "text-xs text-left text-main font-semibold px-6 py-2 uppercase";
const Text = "text-sm text-left leading-6 whitespace-nowrap px-5 py-3"
const Rows = (movie, i, admin, OnEditFunction,OnDeletedFunction) => {
  return (
    <tr key={i}>
      
      <td className={`${Text} truncate `}><h5 className='ml-6'>{movie.episode}</h5></td>
      <td className={`${Text} `}>{movie.episode_description}</td>
      <td className={`${Text} float-right flex-rows gap-2`}>

        {
          admin ? (
            <>
              <button onClick={()=>OnEditFunction(movie)} className='border border-border bg-dry flex-rows gap-2 text-border rounded py-1 px-2'>
                Edit <FaEdit className='text-green-500' />
              </button>
              <button onClick={() => OnDeletedFunction(movie)} className='bg-subMain text-white rounded flex-colo w-6 h-6'>
                <MdDelete />
              </button>
            </>
          )
            :
            (
              <>
                <Link to={`http://localhost:3000/film/${movie.id}`} className='border border-border bg-dry flex-rows gap-2 text-border rounded py-1 px-2 mt-2 text-white'>
                  Xem<GoEye className='text-green-500' />
                </Link>

              </>
            )
        }

      </td>
    </tr>
  )
}



function Tablecom({ data, admin, OnEditFunction,OnDeletedFunction }) {
  return (
    <div className='overflow-x-scroll overflow-hidden relative w-full'>
      <table className='w-full table-auto border border-border divide-y divide-border'>
        <thead>
          <tr className='bg-dryGray'>
            <th scope='col' className={`${Head}`}>Episode</th>
            <th scope='col' className={`${Head}`}>Title</th>
            <th scope='col' className={`${Head} text-end`}>Actions</th>


          </tr>

        </thead>

        <tbody className='bg-main divide-y divide-gray-800'>
          {data.map((movie, i) => Rows(movie, i, admin, OnEditFunction,OnDeletedFunction))}
        </tbody>

      </table>
    </div>
  )
}

export default Tablecom
