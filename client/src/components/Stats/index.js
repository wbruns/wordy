import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_STATS } from '../../utils/queries';
import { UPDATE_STATS } from '../../utils/mutations';

const Stats = (username) => {
    const [updateStats] = useMutation(UPDATE_STATS, { variables: { stats_username: username.username } });
    const { loading, data } = useQuery(QUERY_STATS, { variables: { stats_username: username.username } });
    

    const [stats, setStats] = useState({});

    useEffect(() => {

        if (data) {setStats(data.stats)

        console.log(data.stats);}
    }, [data]);



    const handleDelete = async (event) => {

        const { data: deletedStats } = await updateStats({
            variables: {
                stats_username: username.username,
                games_played: 0,
                games_won: 0,
                current_streak: 0
            }
        });

        console.log("deleted Stats", deletedStats);

        setStats(deletedStats.updateStats);

    }

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h3>Your Stats</h3>
            {stats ? (
                <div>
                    <div>
                        <p>Current streak: {stats.current_streak}</p>
                        <p>Total games played: {stats.games_played}</p>
                        <p>Number of games won: {stats.games_won}</p>
                    </div>
                    <div>
                        <button type='delete' onClick={handleDelete} >Reset Stats</button>
                    </div>
                </div>
            ) : (
                <div>No Stats!</div>
            )}
        </div>
    );
};

export default Stats;