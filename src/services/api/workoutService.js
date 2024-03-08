import { collection, getDocs, doc, getDoc, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useWorkoutContext } from "../../context/workouts/WorkoutContext";


export const getWorkouts = async (userId) => {
    try {
        const userDocRef = doc(db, "users", userId);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
            const workoutsCollectionRef = collection(db, "users", userId, "workouts");
            const querySnapshot = await getDocs(workoutsCollectionRef);

            const workoutsData = [];
            querySnapshot.forEach((doc) => {
                workoutsData.push({ id: doc.id, ...doc.data() });
            });

            return workoutsData;
        } else {
            console.log("Benutzerdokument nicht gefunden oder workouts-Subsammlung existiert nicht.");
            return [];
        }
    } catch (error) {
        console.error("Fehler beim Abrufen der Workouts: ", error);
        return [];
    }
};

export const getWorkoutsThisMonth = (workouts) => {
    const filteredWorkouts = workouts.filter((workout) => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        const workoutDate = new Date(workout.date);
        return (
          workoutDate.getMonth() === currentMonth &&
          workoutDate.getFullYear() === currentYear
        );
      });
}

