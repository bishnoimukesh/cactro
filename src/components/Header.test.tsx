import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';

test('renders Header component', () => {
    const { getByText } = render(<Header />);
    expect(getByText(/Instagram/i)).toBeInTheDocument();
});