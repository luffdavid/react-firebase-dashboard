import React, { useContext, useEffect } from 'react';
import { getWorkouts } from '../../services/api/workoutService';

import { useWorkoutContext } from '../../context/workouts/WorkoutContext';
import WorkoutList from '../../components/progress/WorkoutList';
import PageHeaderMain from "../../components/general/heading/PageHeaderMain"
import { AuthContext } from '../../context/AuthContext';

const WorkoutLog = () => {
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
        <div className="page">
            <PageHeaderMain pageName={"Your Progress"} />
            <div style={{marginTop:'30px'}}>
                <WorkoutList workouts= {workouts} />
            </div>
        </div>
    );
};

export default WorkoutLog;
