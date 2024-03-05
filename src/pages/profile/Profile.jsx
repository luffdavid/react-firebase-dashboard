import PageHeaderMain from "../../components/general/heading/PageHeaderMain";
import ProfileList from "../../components/profile/ProfileList";

const Profile = ({ profileData }) => {
    return (
        <div className="page">
            <PageHeaderMain pageName={"Profile and Settings"} />
            <ProfileList profileData={profileData} />
        </div>
    );
};

export default Profile;
