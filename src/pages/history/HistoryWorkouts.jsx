// HistoryWorkouts.js

import React, { useContext, useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { AuthContext } from '../../context/AuthContext';
import { getWorkouts } from '../../services/api/workoutService';
const HistoryWorkouts = () => {
    const { currentUser } = useContext(AuthContext);
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        const fetchWorkouts = async () => {
            const workoutsData = await getWorkouts(currentUser.uid);
            setWorkouts(workoutsData);
        };

        fetchWorkouts();
    }, [currentUser.uid]);

    return (
        <div style={{ marginLeft: '3%' }}>
            <Typography variant="h4">
                <b>History of your Workouts</b>
            </Typography>
            <ul>
                {workouts.map((workout) => (
                    <li key={workout.id}>
                        {workout.title} - {workout.date} - {workout.start} to {workout.end}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HistoryWorkouts;
