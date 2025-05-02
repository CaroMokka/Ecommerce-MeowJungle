import styles from "./Banner.module.scss";

type BannerProps = {
  title?: string;
  subtitle?: string;
  description?: string;
  image?: string;
  alt?: string;
  cardFooter?: string;
  cardFooterButton?: string;
  variant?: "default-row" | "default-col" | "centered" | "reverse" | "minimal" | "reverse-col" | "reverse-vibrant";
};
function Banner({
  title,
  subtitle,
  description,
  image,
  alt,
  cardFooter,
  cardFooterButton,
  variant = "default-row",
}: BannerProps) {
  return (
    <div
      className={`${styles["banner-about"]} ${
        styles[`banner-about--${variant}`]
      }`}
    >
      <div className={styles["banner-about__image"]}>
        {image && (
          <img src={image} alt={alt} className={styles["banner-about__img"]} />
        )}
      </div>
      <div className={styles["banner-about__content"]}>
        {title && <h1 className={styles["banner-about__title"]}>{title}</h1>}
        {subtitle && (
          <h3 className={styles["banner-about__subtitle"]}>{subtitle}</h3>
        )}
        {description && (
          <p className={styles["banner-about__description"]}>{description}</p>
        )}
        {cardFooter && (
          <p className={styles["banner-about__card-footer"]}>{cardFooter}</p>
        )}
        {cardFooterButton && (
          <button className={styles["banner-about__btn-action"]}>
            {cardFooterButton}
          </button>
        )}
      </div>
    </div>
  );
}

export default Banner;
