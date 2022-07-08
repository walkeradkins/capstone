import { ListName } from "../../Components";
import "./list-item.css";
import { useDispatch, useSelector } from "react-redux";
import { CardItem, AddCardInput } from "../../Components";
import { getAllCards } from "../../store/cards";
import { getAllLists } from "../../store/lists";
import { useEffect } from "react";
import { useWorkspace } from "../../context/workspace-context";
import { useState } from "react";

const ListItem = ({ list }) => {
  const dispatch = useDispatch();
  const { currentWorkspace } = useWorkspace();
  const cards = useSelector((state) => state.cards);
  const [item, setItem] = useState("");

  console.log("list:: ", list.cards);

  useEffect(() => {
    dispatch(getAllCards(currentWorkspace));
    dispatch(getAllLists(currentWorkspace));
  }, [item]);

  return (
    <div className="list__wrapper">
      <div className="list__content">
        <div className="list__header">
          <ListName list={list} />
        </div>
        {list.cards[0] && (
          <div className="pl">
            <CardItem cards={list.cards.map((id) => cards[id])} />
          </div>
        )}
        <AddCardInput list={list} setItem={setItem} />
      </div>
    </div>
  );
};

export default ListItem;
