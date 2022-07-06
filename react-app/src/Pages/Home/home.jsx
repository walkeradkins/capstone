import './home.css'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllWorkspaces } from '../../store/workspaces'

const Home = () => {
  const dispatch = useDispatch()
  const workspaces = useSelector(state => state.workspaces)

  useEffect(() => {
    dispatch(getAllWorkspaces(1))
  }, [dispatch])

  console.log(workspaces)
  return (
    <h2>Home View</h2>
   );
}

export default Home;