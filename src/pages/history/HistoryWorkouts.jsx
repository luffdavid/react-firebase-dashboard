import React, { useContext, useEffect } from 'react';
import { Typography } from '@mui/material';
import { getWorkouts } from '../../services/api/workoutService';
import { AuthContext } from '../../context/AuthContext';
import { useWorkoutContext } from '../../context/workouts/WorkoutContext';

const HistoryWorkouts = () => {
    const { currentUser } = useContext(AuthContext);
    const { workouts, setWorkouts } = useWorkoutContext();

    useEffect(() => {
        const fetchWorkouts = async () => {
            const workoutsData = await getWorkouts(currentUser.uid);
            setWorkouts(workoutsData);
        };

        if (workouts.length === 0) { // Nur abrufen, wenn die Workouts noch nicht vorhanden sind
            fetchWorkouts();
        }
    }, [currentUser.uid, workouts.length, setWorkouts]);

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
