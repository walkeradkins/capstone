import "./list-item.css";

const ListItem = ({ list }) => {
  return (
    <div className="list__wrapper">
      <div className="list__content">
        <h3 className="list__header">{list.title}</h3>
        <div className='list__new-card'>
          Add a card
        </div>
      </div>
    </div>
  );
};

export default ListItem;
