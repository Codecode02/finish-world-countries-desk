import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';

describe('Header component', () => {
  const mockProps = {
    search: '',
    onSearchChange: jest.fn(),
    region: '',
    onRegionChange: jest.fn(),
    subregion: '',
    onSubregionChange: jest.fn(),
    subregions: ['Eastern Europe', 'Western Europe'],
    isIndependent: false,
    onIndependentToggle: jest.fn(),
    onClearFilters: jest.fn()
  };

  test('renders search input and region selector', () => {
    render(<Header {...mockProps} />);

    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
    expect(screen.getByText(/All regions/i)).toBeInTheDocument();
    expect(screen.getByText(/Independent/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Clear Filter/i })).toBeInTheDocument();
  });

  test('calls onSearchChange when typing in search input', () => {
    render(<Header {...mockProps} />);
    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.change(input, { target: { value: 'test' } });

    expect(mockProps.onSearchChange).toHaveBeenCalledWith('test');
  });

  test('calls onRegionChange when selecting a region', () => {
    render(<Header {...mockProps} />);
    const regionSelect = screen.getByDisplayValue(/All regions/i);
    fireEvent.change(regionSelect, { target: { value: 'Europe' } });

    expect(mockProps.onRegionChange).toHaveBeenCalledWith('Europe');
  });
});