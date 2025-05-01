import "./cardInfo.css";
type CardInfoProps = {
  title?: string;
  description?: string;
  image?: string;
  alt?: string;
};
function CardInfo({ title, description, image, alt }: CardInfoProps) {
  return (
    <div className="card-info">
      <div className="card-info__container">
        <div className="card-info__content">
          {image && <img src={image} alt={alt} className="card-info__image" />}
          {title && <h3 className="card-info__title">{title}</h3>}
          {description && (
            <p className="card-info__description">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CardInfo;
