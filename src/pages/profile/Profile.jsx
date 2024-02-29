import PageHeaderMain from "../../components/general/heading/PageHeaderMain";

const Profile = ({ profileData }) => {
    return (
        <div className="page">
            <PageHeaderMain pageName={"Profile"} />
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
    );
};

export default Profile;
