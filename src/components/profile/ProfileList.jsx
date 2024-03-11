import ProfileListSkeleton from "./ProfileListSkeleton";
import ProfileDataList from "./ProfileDataList";

export default function ProfileList({ profileData }) {
  return (
    <div>
      {!profileData ? (
        <div>
          <ProfileListSkeleton />
        </div>
      ) : (
        <div>
          <ProfileDataList profileData={profileData} />
        </div>
      )}
    </div>
  );
}
