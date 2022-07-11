import { ListName } from "../../Components";
import "./list-item.css";
import { useDispatch, useSelector } from "react-redux";
import { CardHeader, AddCardInput } from "../../Components";
import { getAllCards } from "../../store/cards";
import { getAllLists } from "../../store/lists";
import { useEffect, useState } from "react";
import { useWorkspace } from "../../context/workspace-context";
import { Droppable } from "react-beautiful-dnd";
import { useCardState } from "../../context/card-state-context";

const ListItem = ({ list }) => {
  const dispatch = useDispatch();
  const { currentWorkspace } = useWorkspace();
  const cards = useSelector((state) => state.cards);
  const cardsArray = list.cards.map((id) => cards[id]);
  const [item, setItem] = useState("");
  const [editItem, setEditItem] = useState("");

  useEffect(() => {
    dispatch(getAllCards(currentWorkspace));
    dispatch(getAllLists(currentWorkspace));
  }, [item]);

  // useEffect(() => {
  //   // setCardState()
  // }, [editItem])

  return (
    <div className="list__wrapper">
      <div className="list__content">
        <div className="list__header">
          <ListName list={list} />
        </div>
        <Droppable droppableId={`${list.id}`}>
          {(provided) => (
            <div
              className="card__wrapper"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {list.cards[0] &&
                cardsArray.map((card, index) => (
                  <CardHeader
                    props={{ card, setItem, index, setEditItem }}
                    key={index}
                  />
                ))}
            </div>
          )}
        </Droppable>
        <AddCardInput props={{ list, setItem }} />
      </div>
    </div>
  );
};

export default ListItem;
