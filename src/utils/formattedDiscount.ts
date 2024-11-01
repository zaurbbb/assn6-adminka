export const formattedDiscount = (discountPercent) => {
  if (!discountPercent) {
    return;
  }

  return `${discountPercent}%`
}