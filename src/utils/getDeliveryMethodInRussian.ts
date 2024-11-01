export const getDeliveryMethodInRussian = (deliveryMethod) => {
  switch (deliveryMethod) {
    case "courier":
      return "Курьер";
    case "pickup":
      return "Самовывоз";
    case "post":
      return "Почта";
    default:
      return deliveryMethod;
  }
}