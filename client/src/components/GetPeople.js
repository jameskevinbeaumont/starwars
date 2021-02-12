import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { LOAD_PEOPLE } from '../graphql/Queries';
import Pagination from './Pagination';

function GetPeople() {
    const { error, loading, data } = useQuery(LOAD_PEOPLE);
    const [people, setPeople] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [peoplePerPage] = useState(3);

    useEffect(() => {
        if (data) {
            setPeople(data.people)
        }
    }, [data]);

    // Get current people
    const indexOfLastPerson = currentPage * peoplePerPage;
    const indexOfFirstPerson = indexOfLastPerson - peoplePerPage;
    const currentPeople = people.slice(indexOfFirstPerson, indexOfLastPerson);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="main">
            <div className="card-container">
                {currentPeople.map((person => {
                    return <div className="card-container__card" key={person.name}>
                        <div className="card-container__card-name">{person.name}</div>
                        <div className="card-container__card-details">Home Planet: {person.origin.name}</div>
                        <div className="card-container__card-details">Height: {person.height}</div>
                        <div className="card-container__card-details">Mass: {person.mass}</div>
                        <div className="card-container__card-details">Birthdate: {person.birthdate}</div>
                    </div>
                }))}
            </div>
            <Pagination
                peoplePerPage={peoplePerPage}
                totalPeople={people.length}
                paginate={paginate}
            />
        </div>
    );
};

export default GetPeople;