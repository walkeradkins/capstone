import { ListName } from "../../Components";
import "./list-item.css";
import { useDispatch, useSelector } from "react-redux";
import { CardHeader, AddCardInput } from "../../Components";
import { getAllCards } from "../../store/cards";
import { getAllLists } from "../../store/lists";
import { useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";

const ListItem = ({ props }) => {
  const { list, setItem } = props;
  const cards = useSelector((state) => state.cards);
  const cardsArray = list.cards.map((id) => cards[id]);
  const [editItem, setEditItem] = useState("");
  const [add, setAdd] = useState(false);

  // useEffect(() => {
  //   dispatch(getAllCards(currentWorkspace));
  //   dispatch(getAllLists(currentWorkspace));
  // }, [item]);

  const InnerList = ({ snapshot }) => {
    return cardsArray.map((card, index) => (
      <CardHeader
        props={{ card, setItem, index, setEditItem, snapshot }}
        key={index}
      />
    ));
  };

  return (
    <div className="list__wrapper">
      <div className="list__content">
        <div className="list__header">
          <ListName list={list} />
        </div>
        <Droppable droppableId={`${list.id}`}>
          {(provided, snapshot) => (
            <div
              className={
                list.cards[0] ? "card__wrapper" : "card__wrapper-no-cards"
              }
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {list.cards[0] && <InnerList cardsArray={cardsArray} snapshot={snapshot}/>}
              {provided.placeholder}
              {add && <AddCardInput props={{ list, setItem, add, setAdd }} />}
            </div>
          )}
        </Droppable>
        {!add && <AddCardInput props={{ list, setItem, add, setAdd }} />}
      </div>
    </div>
  );
};

export default ListItem;
