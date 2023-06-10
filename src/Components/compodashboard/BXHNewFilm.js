import React from 'react'
import { FaCloudDownloadAlt, FaEdit } from "react-icons/fa";
import { FcList } from "react-icons/fc";
import { MdDelete } from "react-icons/md";
import { GoEye } from "react-icons/go";
import { Link } from 'react-router-dom';
const Head = "text-xs text-left text-main font-semibold px-6 py-2 uppercase";
const Text = "text-sm text-left leading-6 whitespace-nowrap px-5 py-3"



const Rows = (movie, i, admin, OnDeletedFunction) => {
  return (
    <tr key={i}>
       <td className={`${Text} truncate`}>{i+1}</td>
      <td className={`${Text}`}>
        <div className='w-20 h-20 p-1 bg-dry border border-border h-12 rounded overflow-hidden'>
       
          <img
            className='h-full w-full  object-cover'
            src={`${movie.image}`}
            alt={movie?.name}
          />
        </div>
      </td>
      
      <td className={`${Text} truncate`}>{movie.name}</td>
      <td className={`${Text}`}>{movie.status}</td>
 
    </tr>
  )
}



function Tablecom({ data, admin, OnDeletedFunction }) {


  return (
    <div className='overflow-x-scroll overflow-hidden relative w-9/12 mx-auto mt-2'>
      <table className='w-full table-auto border border-border divide-y divide-border'>
        <thead>
          <tr className='bg-dryGray'>
          <th scope='col' className={`${Head}`}>STT</th>
            <th scope='col' className={`${Head}`}>Image</th>


            <th scope='col' className={`${Head}`}>Name</th>


            <th scope='col' className={`${Head}`}>Status</th>
          </tr>

        </thead>

        <tbody className='bg-main divide-y divide-gray-800'>
          {data.map((movie, i) => Rows(movie, i, admin, OnDeletedFunction))}
        </tbody>

      </table>
    </div>
  )
}

export default Tablecom
