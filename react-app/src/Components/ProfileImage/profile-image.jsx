import "./profile-image.css";

const ProfileImage = ({ user, size, circle }) => {
  const { profileImage, firstName, lastName } = user;
  const initials = `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`;
  const radius = circle ? '50%' : '.15em';

  if (profileImage) {
    return (
      <figure
        className="profile__img"
        style={{
          backgroundImage: `url(${profileImage})`,
          width: size,
          height: size,
          borderRadius: radius
        }}
      />
    );
  }
  return (
    <div
      className="profile_img-container"
      style={{ width: size, height: size }}
    >
      <p>{initials}</p>
    </div>
  );
};

export default ProfileImage;
