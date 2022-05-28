import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME, QUERY_STATS } from '../utils/queries';
import { DELETE_USER, DELETE_STATS } from '../utils/mutations';
import Auth from '../utils/auth';
import Stats from '../components/Stats';

const Profile = () => {
    const [deleteUser] = useMutation(DELETE_USER);
    const [deleteStats] = useMutation(DELETE_STATS);

    const { data: userData } = useQuery(QUERY_ME);

    console.log(userData);

    return (
        <div>
            Profile
        </div>
    );
};

export default Profile;