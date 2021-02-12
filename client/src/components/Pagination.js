import React from 'react';

function Pagination({ peoplePerPage, totalPeople, paginate }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPeople / peoplePerPage); i++) {
        pageNumbers.push(i);
    };

    return (
        <div className="pagination">
            <ul className="pagination__container">
                {pageNumbers.map(number => (
                    <li key={number} className="pagination__item">
                        <a onClick={() => paginate(number)} href="!#" className="pagination__link">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Pagination;