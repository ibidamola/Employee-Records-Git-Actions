import { render, screen } from '@testing-library/react';
import App from './App';
import HomePage from './components/HomePage';


test('Welcome to our Employee Record Keeping website', () => {
  render(<HomePage />);
  const linkElement = screen.getByText(/Record/i);
  expect(linkElement).toBeInTheDocument();
});