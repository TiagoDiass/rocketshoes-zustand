const { format } = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
});

/**
 * Formats a number to BRL
 */
const formatNumberToCurrency = (value: number) => {
  const formatted = format(value);

  return `R$ ${formatted.substring(3)}`;
};

export { formatNumberToCurrency };
