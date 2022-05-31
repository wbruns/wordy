import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { DELETE_USER, DELETE_STATS, DELETE_GAME } from '../utils/mutations';
import Auth from '../utils/auth';
import Stats from '../components/Stats';

const Profile = () => {
    const [deleteUser] = useMutation(DELETE_USER);
    const [deleteStats] = useMutation(DELETE_STATS);
    const [deleteGame] = useMutation(DELETE_GAME);
    const { loading, data } = useQuery(QUERY_ME);

    const username = data?.me.username;

    const handleDelete = async (event) => {
        event.preventDefault();

        // delete stats and game
        deleteStats({
            variables: { stats_username: username }
        });

        deleteGame({
            variables: { game_username: username }
        });

        const { data: deletedUser } = await deleteUser({
            variables: { username }
        });

        console.log("deletedUser", deletedUser);

        Auth.logout();
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <main>
            <h2>
                {username}'s Profile
            </h2>
            <div>
                <Stats username={username} />
            </div>
            <div>
                <button type='delete' onClick={handleDelete} >Delete User Profile</button>
            </div>
        </main>
    );
};

export default Profile;