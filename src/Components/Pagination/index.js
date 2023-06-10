import React from "react";

import "./Pagination.css";

const Pagination = ({
    totalPosts,
    postsPerPage,
    setCurrentPage,
    currentPage,
}) => {
    let pages = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pages.push(i);
    }

    return (
        <div className='pagination'>
            <button
                disabled={currentPage<=1}
                onClick={() => setCurrentPage(currentPage - 1)}>Prev
            </button>
            {pages.map((page, index) => {
                return (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(page)}
                        className={page == currentPage ? "active" : ""}>
                        {page}
                    </button>
                )
            })}
            <button
                disabled={currentPage>=pages.length}
                onClick={() => setCurrentPage(currentPage + 1)}>Next

            </button>
        </div>
    );
};

export default Pagination;