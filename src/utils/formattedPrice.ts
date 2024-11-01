export const formattedPrice = (price: string) => {
  if (!price) {
    return;
  }

  const formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  return `${formattedPrice} ₸`;
}