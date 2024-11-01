export const formattedAddress = (
  cityName = "",
  region = "",
  street = "",
  street_num = "",
  apartment = "",
) => {
  // Create an array of all the parameters
  const addressParts = [cityName, region, street, street_num, apartment];

  // Filter out null, undefined, and empty string values
  const filteredParts = addressParts.filter(part => part != null && part !== "");

  // Join the remaining valid parts with a comma and space
  return filteredParts.join(', ');
}
