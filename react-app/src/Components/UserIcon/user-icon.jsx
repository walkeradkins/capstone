import './user-icon.css'

const UserIcon = ({name, size}) => {

  const styles = {
    width: size,
    height: size,
    fontSize: size,
  }

  return (
    <div
    className='user-icon'
    style={styles}
    >{name[0]}</div>
   );
}

export default UserIcon;