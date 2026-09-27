export function formatPrice(amount: number): string {
  const grouped = Math.trunc(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `$${grouped}`;
}