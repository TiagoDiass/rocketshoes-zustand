/**
 * Formats a number to BRL
 */
const { format: formatNumberToCurrency } = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
});

export { formatNumberToCurrency };
