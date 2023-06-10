import React from "react";
import './details.css';
const Episode = (props)=>
{
    let href = "/anime/details/" +props.number.id+ props.number.episode
    return (
        <>
            <a href={href} className="episode">{props.number.episode}</a>
        </>
    )
}
export default Episode