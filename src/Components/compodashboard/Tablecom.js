import React from 'react'
import { FaCloudDownloadAlt, FaEdit } from "react-icons/fa";
import { FcList } from "react-icons/fc";
import { MdDelete } from "react-icons/md";
import { GoEye } from "react-icons/go";
import { Link } from 'react-router-dom';
const Head = "text-xs text-left text-main font-semibold px-6 py-2 uppercase";
const Text = "text-sm text-left leading-6 whitespace-nowrap px-5 py-3"



const Rows = (movie, i, admin, OnDeletedFunction,anime) => {
  return (
    <tr key={i}>
      <td className={`${Text}`}>
        <div className='w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden'>

          <img
            className='h-full w-full  object-cover'
            src={`${movie.image}`}
            alt={"movie?.name"}
          />
        </div>
      </td>
      <td className={`${Text} truncate`}>{movie.name}</td>
      <td className={`${Text}`}>{movie.status}</td>
      <td className={`${Text} float-right flex-rows gap-2`}>

        {
          admin ? (
            <>
             <Link to={anime?`/listepisodeanime/${movie.id}`:`/listepisodemovie/${movie.id}`} className='border border-border bg-dry flex-rows gap-2 text-border rounded py-1 px-2 text-white'>
                  Episode <FcList />
                </Link> 
              <Link to={anime?`/updateanime/${movie.id}`:`/updatemovie/${movie.id}`} className='border border-border bg-dry flex-rows gap-2 text-border rounded py-1 px-2'>
                Edit <FaEdit className='text-green-500' />
              </Link>
              <button onClick={() => OnDeletedFunction(movie)} className='bg-subMain text-white rounded flex-colo w-6 h-6'>
                <MdDelete />
              </button>
            </>
          )
            :
            (
              <>
                <Link to={anime?`http://localhost:3000/anime/${movie.id}`:`http://localhost:3000/film/${movie.id}`} className='border border-border bg-dry flex-rows gap-2 text-border rounded py-1 px-2 mt-2 text-white'>
                  Xem<GoEye className='text-green-500' />
                </Link>
                <button onClick={() => OnDeletedFunction(movie)} className='bg-subMain text-white rounded flex-colo w-6 h-6 mt-2'>
                <MdDelete />
              </button>
              </>
            )
        }

      </td>
    </tr>
  )
}



function Tablecom({ data, admin, OnDeletedFunction,anime }) {


  return (
    <div className='overflow-x-scroll overflow-hidden relative w-full'>
      <table className='w-full table-auto border border-border divide-y divide-border'>
        <thead>
          <tr className='bg-dryGray'>
            <th scope='col' className={`${Head}`}>Image</th>


            <th scope='col' className={`${Head}`}>Name</th>


            <th scope='col' className={`${Head}`}>Status</th>

            <th scope='col' className={`${Head} text-end`}>Actions</th>


          </tr>

        </thead>

        <tbody className='bg-main divide-y divide-gray-800'>
          {data.map((movie, i) => Rows(movie, i, admin, OnDeletedFunction,anime))}
        </tbody>

      </table>
    </div>
  )
}

export default Tablecom
