import "./Card.css";

/* Set separate props and initialize the type interface */
interface CardProps {
  title: React.ReactNode;
  subTitle?: string;
  icon?: React.ReactNode;
}

const Card = ({ title, subTitle, icon = "ICON" }: CardProps) => {
  return (
    <div className="card">
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        {subTitle && <p className="card-subtitle">{subTitle}</p>}
      </div>
      <div className="card-icon">{icon}</div>
    </div>
  );
};

export default Card;
