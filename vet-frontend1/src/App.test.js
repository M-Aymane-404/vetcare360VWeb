import { render, screen } from '@testing-library/react';
import App from './App';

test('renders VetCare 360 heading', () => {
  render(<App />);
  const brandElement = screen.getByText(/VetCare 360/i);
  expect(brandElement).toBeInTheDocument();
});


