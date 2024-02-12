import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { doc, getDoc } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react"; // useState hinzugefügt
import { db } from "../../firebase";

const Profile = () => {
    const { currentUser } = useContext(AuthContext);
    const [profileData, setProfileData] = useState(null); // Zustand hinzugefügt

    useEffect(() => {
        const getProfileDetails = async () => {
            const docRef = doc(db, "users", currentUser.uid);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                setProfileData(docSnap.data()); // Setzen Sie den Zustand auf die Profildaten
            } else {
                console.log("No such document!");
            }
        };

        if (currentUser) {
            getProfileDetails();
        }

        return () => {
            // Cleanup
        };
    }, [currentUser]);

    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div>
                    {profileData ? (
                        <div>
                            <p>Name: {profileData.displayName}</p>
                            <p>Email: {profileData.email}</p>
                            <p>Username:{profileData.username}</p>
                            <p>Phone number: {profileData.phone}</p>
                            <p>Adresse: {profileData.country} <br />
                            {profileData.address}
                            password: *********
                            </p>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
