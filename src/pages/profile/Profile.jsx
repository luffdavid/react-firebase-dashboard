import PageHeaderMain from "../../components/general/heading/PageHeaderMain";
import ProfileList from "../../components/profile/ProfileList";

const Profile = ({ profileData }) => {
  return (
    <div className="page">
      <PageHeaderMain pageName={"Profile and Settings"} />
      <div>
        <ProfileList profileData={profileData} />
      </div>
    </div>
  );
};

export default Profile;
