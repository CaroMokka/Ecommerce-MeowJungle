import "./banners.css"

type BannerProps = {
  title?: string;
  subtitle?: string;
  description?: string;
};
function Banner({ title, subtitle, description }: BannerProps) {
  return (
    <div className="banner-about">
      <div className="banner-about__content">
        { title && <h1 className="banner-about__title">{title}</h1> }
        { subtitle && <h3 className="banner-about__subtitle">{subtitle}</h3> }
        { description && <p className="banner-about__description">{description}</p> }
      </div>
    </div>
  );
}

export default Banner;
