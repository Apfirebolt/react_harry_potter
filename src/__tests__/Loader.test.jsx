import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LoaderComponent from '../components/Loader';

describe('LoaderComponent', () => {
    it('should render the loader component', () => {
        render(<LoaderComponent />);
        const loaderDiv = screen.getByRole('generic');
        expect(loaderDiv).toBeInTheDocument();
    });

    it('should have the correct container classes', () => {
        const { container } = render(<LoaderComponent />);
        const loaderContainer = container.querySelector('.flex.justify-center.items-center.h-screen');
        expect(loaderContainer).toBeInTheDocument();
    });

    it('should render the spinning animation element', () => {
        const { container } = render(<LoaderComponent />);
        const spinner = container.querySelector('.animate-spin.rounded-full');
        expect(spinner).toBeInTheDocument();
    });

    it('should have correct spinner styling classes', () => {
        const { container } = render(<LoaderComponent />);
        const spinner = container.querySelector('.h-32.w-32.border-t-4.border-primary-200');
        expect(spinner).toBeInTheDocument();
    });

    it('should render without crashing', () => {
        const { container } = render(<LoaderComponent />);
        expect(container.firstChild).toBeTruthy();
    });
});
