import styles from "./productSummary.module.scss";

function TagList({ tags }: { tags?: string[] }) {
    if (!tags?.length) return null;
    return (
        <div className={styles["product-summary__tags"]}>
        {tags.map((tag, index) => (
          <span key={index} className={styles["product-summary__tag"]}>
            {tag}
          </span>
        ))}
      </div>
    )
}
export default TagList;