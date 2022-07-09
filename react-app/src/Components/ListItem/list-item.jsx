import { ListName } from "../../Components";
import "./list-item.css";
import { useDispatch, useSelector } from "react-redux";
import { CardHeader, AddCardInput } from "../../Components";
import { getAllCards } from "../../store/cards";
import { getAllLists } from "../../store/lists";
import { useEffect, useState } from "react";
import { useWorkspace } from "../../context/workspace-context";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ListItem = ({ list }) => {
  const dispatch = useDispatch();
  const { currentWorkspace } = useWorkspace();
  const cards = useSelector((state) => state.cards);
  const [item, setItem] = useState("");

  const cardsArray = list.cards.map((id) => cards[id]);

  useEffect(() => {
    dispatch(getAllCards(currentWorkspace));
    dispatch(getAllLists(currentWorkspace));
  }, [item]);

  return (
    <div className="list__wrapper">
      <Droppable droppableId="list">
        {(provided) => (
          <div className="list__content">
            <div className="list__header">
              <ListName list={list} />
            </div>
            <div
              className="card__wrapper"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {list.cards[0] &&
                cardsArray.map((card, index) => (
                  <CardHeader props={{ card, setItem, index }} key={index} />
                ))}
              <AddCardInput list={list} setItem={setItem} />
            </div>
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default ListItem;
