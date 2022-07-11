import "./list-delete.css";
import { useDispatch } from "react-redux";
import { deleteList } from "../../store/lists";

const ListDelete = ({ list }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    let deletedList;
    try {
      deletedList = await dispatch(deleteList(list.id))
      // if (deletedList.id === +list.id) {
      // }
    } catch(error) {
      alert(error)
    }
  }

  return (
    <div className="list__delete-container" onClick={handleDelete}>
      <span className="material-symbols-outlined">delete</span>
    </div>
  );
};

export default ListDelete;
