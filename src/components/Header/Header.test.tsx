import Header from './Header';
import { renderWithTheme } from 'utils/test-utils';

describe('Component: Header', () => {
  it('should render correctly', () => {
    renderWithTheme(<Header />);
  });
});
