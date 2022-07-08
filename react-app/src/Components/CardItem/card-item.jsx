import "./card-item.css";

const CardItem = ({ cards }) => {
  if (cards[0] === undefined) return null;
  return (
    <div className="card__wrapper">
      {cards.map((card) => (
        <div className="card__container" key={card.id}>
          <div className="card__title">{card.name}</div>
        </div>
      ))}
    </div>
  );
};

export default CardItem;
