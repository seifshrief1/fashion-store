// src/utils/formatCurrency.js

const FormatCurrency = (amount) => {
  return new Intl.NumberFormat("EG", {
    style: "currency",
    currency: "EGP",
    minimumFractionDigits: 0,
  }).format(amount);
};

export default FormatCurrency;
