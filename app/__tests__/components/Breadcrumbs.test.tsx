// @ts-expect-error -
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import Breadcrumbs from '@/components/organisms/Breadcrumbs';

describe('Breadcrumbs Component', () => {
  it('renders the Home link and additional items correctly', () => {
    const items = [{ label: 'Explorer', href: '/' }, { label: 'Pikachu' }];
    render(<Breadcrumbs items={items} />);
    
    const homeLink = screen.getByRole('link', { name: '' }); 
    expect(homeLink).toHaveAttribute('href', '/');
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  });

  it('renders the last item as a non-clickable bold span', () => {
    const items = [{ label: 'Charizard' }];
    render(<Breadcrumbs items={items} />);
    const activeItem = screen.getByText(/charizard/i);
    expect(activeItem.tagName).toBe('SPAN');
    expect(activeItem).toHaveClass('font-semibold');
  });
});