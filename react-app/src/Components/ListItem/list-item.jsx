import { ListName } from "../../Components";
import "./list-item.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CardItem } from "../../Components";

const ListItem = ({ list, cards }) => {

  return (
    <div className="list__wrapper">
      <div className="list__content">
        <div className="list__header">
          <ListName list={list} />
        </div>
        <div className='pl'>
          <CardItem cards={cards}/>
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
