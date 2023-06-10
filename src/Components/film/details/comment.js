import React from "react";
import './comment.css';
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const Comment = (props) => {
    const [user,setUser] = useState()
    useEffect(()=>
    {
        async function getUser()
        {
            let data = await axios.get('http://localhost:1001/accounts/'+props.infor.account_id)
            setUser(data.data)
        }
        getUser()
    },[user])
    return (
        <>
            <div class="antialiased max-w-screen-sm w-5/12  mt-3">
                <div class="space-y-4">

                    <div class="flex">
                        <div class="flex-shrink-0 mr-3">
                            <img class="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10" src={user?user.image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDZ3sl-uWEz_3FQhY92IoGCiRwUjDe73vUEg&usqp=CAU"} alt=""/>
                        </div>
                        <div class="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed border-4">
                            <strong>{user?user.name:'Người dùng'}</strong> <span class="text-xs text-gray-400">3:34 PM</span>
                            <p class="text-sm">
                               {props.infor.content}
                            </p>
                            </div>
                        </div>
                    </div>
                </div>
                </>
        )
}
export default Comment