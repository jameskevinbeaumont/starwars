import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
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
        <div>
            {' '}
            {currentPeople.map((person => {
                return <h3 key={person.name}> {person.name} </h3>
            }))}
            <Pagination
                peoplePerPage={peoplePerPage}
                totalPeople={people.length}
                paginate={paginate}
            />
        </div>
    );
};

export default GetPeople;