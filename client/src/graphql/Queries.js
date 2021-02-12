import { gql } from '@apollo/client';

export const LOAD_PEOPLE = gql`
    query {
        people {
            name
            origin {
                name
            }
            height
            mass
            birthdate
        }
    }
`;