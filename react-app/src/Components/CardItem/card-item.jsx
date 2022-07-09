import "./card-item.css";
import CardHeader from "../CardHeader/card-header";

const CardItem = ({ cards }) => {
  if (cards[0] === undefined) return null;
  return (
    <div className="card__wrapper">
      {cards.map((card) => (
        <CardHeader card={card}/>
      ))}
    </div>
  );
};

export default CardItem;
