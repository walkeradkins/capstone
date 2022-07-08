import { ListName } from "../../Components";
import "./list-item.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CardItem, AddCardInput } from "../../Components";
import { useEffect } from "react";

const ListItem = ({ list, cards }) => {
  const [add, setAdd] = useState(false)

  const showInput = () => {
    if (add) return;
    setAdd(true);
  }

  useEffect(() => {
    if (!add) return

    const hideInput = () => {
      setAdd(false)
    }
    document.addEventListener("click", hideInput);
    return () => document.removeEventListener("click", hideInput);

  }, [add])

  return (
    <div className="list__wrapper">
      <div className="list__content">
        <div className="list__header">
          <ListName list={list} />
        </div>
        <div className="pl">
          <CardItem cards={cards} />
        </div>
        {add && <AddCardInput props={{add, setAdd, list}} />}
        {!add &&
        <div className="list__add-card-container" onClick={showInput}>
          <span className="material-symbols-outlined">add</span>
          <div className="list__new-card">
            Add a card
          </div>
        </div>}
      </div>
    </div>
  );
};

export default ListItem;
