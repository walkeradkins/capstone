import './user-icon.css'

const UserIcon = ({name, width, height, fontSize}) => {

  const styles = {
    width: width,
    height: height,
    fontSize: fontSize,
  }

  return (
    <div
    className='user-icon'
    style={styles}
    >{name[0]}</div>
   );
}

export default UserIcon;