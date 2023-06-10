import React from 'react';
import './HomeStyle.css';
const Card = (movie) => {
    return (
            
            <div className="movie">
                <a href={movie.anime?`/anime/${movie.info.id}`:`/film/${movie.info.id}`}>
                    <img src={movie.info.image} className="poster"></img>
                    <div className="movie-details">
                        <div className="box">
                            <h4 className="title">{movie.info.name.toUpperCase()}</h4>
                            <p className="rating">{movie.info.evaluate}</p>
                            <p className={movie.info.hot?"VIP-card nhapnhay":'hidden'}>HOT</p>
                        </div>
                        <div className="overview">
                            <h1>Overview</h1>
                            {movie.info.description}
                        </div>
                    </div>
                </a>
            </div>

    )
}
export default Card;