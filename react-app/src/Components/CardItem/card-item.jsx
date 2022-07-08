import "./card-item.css";

const CardItem = ({ cards }) => {
  return (
    <div className="card__wrapper">
      {cards.map((card) => (
        <div className="card__container">
          <div className="card__title">{card.name}</div>
        </div>
      ))}
    </div>
  );
};

export default CardItem;
