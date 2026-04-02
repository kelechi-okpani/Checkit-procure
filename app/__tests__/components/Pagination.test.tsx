// @ts-expect-error -
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Pagination from '@/components/organisms/Pagination';


vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
  useSearchParams: () => new URLSearchParams('page=1'),
}));

describe('Pagination Component', () => {
  it('does not render if total pages is 1', () => {
    const { container } = render(<Pagination totalCount={10} pageSize={20} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders page numbers correctly', () => {
    render(<Pagination totalCount={100} pageSize={10} />);
    // Should show page 1, 2, 3... 10
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });
});