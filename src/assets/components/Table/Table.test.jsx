import { render, screen, fireEvent } from '@testing-library/react';
import CountriesList from './Table';

const mockCountries = [
  {
    cca3: 'USA',
    name: { common: 'United States' },
    capital: ['Washington'],
    region: 'Americas',
    subregion: 'Northern America',
    languages: { eng: 'English' },
    currencies: { USD: { name: 'US Dollar', symbol: '$' } },
    independent: true,
    area: 9833520,
    flags: { svg: 'usa-flag.svg' },
  }
];

test('renders country rows', () => {
  render(<CountriesList countries={mockCountries} />);
  expect(screen.getByText(/United States/i)).toBeInTheDocument();
  expect(screen.getByText(/Washington/i)).toBeInTheDocument();
  expect(screen.getByText(/US Dollar/i)).toBeInTheDocument();
});

test('opens modal when clicking on a row', () => {
  render(<CountriesList countries={mockCountries} />);
  fireEvent.click(screen.getByText(/United States/i));
  expect(screen.getByText(/capital name:/i)).toBeInTheDocument();
});