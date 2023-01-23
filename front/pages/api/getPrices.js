import { useSelector } from "react-redux";

export default  function getPrices() {
  const optionPrices = useSelector(state => state.apartPrice.prices);
  const individualPrices = useSelector(state => state.apartPrice.individual);

  const OptionsPrice = Object.values(optionPrices).reduce((oldPrice, newPrice) => oldPrice + newPrice, 0); 
  const IndividualPrice = Object.values(individualPrices).reduce((oldPrice, newPrice) => oldPrice + newPrice, 0);

  return {
    OptionsPrice,
    IndividualPrice
  }
}
