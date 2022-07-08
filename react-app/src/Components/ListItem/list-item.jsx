import { ListName } from "../../Components";
import "./list-item.css";

const ListItem = ({ list }) => {
  return (
    <div className="list__wrapper">
      <div className="list__content">
        <div className="list__header">
          <ListName list={list} />
        </div>
        <div className="list__add-card-container">
          <span className="material-symbols-outlined">add</span>
          <div className="list__new-card">Add a card</div>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
