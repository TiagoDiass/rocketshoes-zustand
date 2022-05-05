import { formatNumberToCurrency } from './formatNumberToCurrency';

describe('Util: formatNumberToCurrency', () => {
  it('should format correctly', () => {
    expect(formatNumberToCurrency(249.9)).toBe('R$ 249,90');
  });
});
