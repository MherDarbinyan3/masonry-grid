import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AppRoutes from './Routes.tsx';
import { MemoryRouter, BrowserRouterProps } from 'react-router-dom';

jest.mock('../components/pages/Images/Images', () => () => <div>Images Component</div>);
jest.mock('../components/pages/ImageDetails/ImageDetails', () => () => <div>Image Details Component</div>);
jest.mock('../components/shared/Loading/Loading', () => () => <div>Loading...</div>);
jest.mock('../components/shared/NotFound/NotFound', () => () => <div>Not Found</div>);

describe('AppRoutes', () => {
    it('renders Images component for root path', async () => {
        render(<AppRoutes Router={MemoryRouter} />);

        expect(screen.getByText('Loading...')).toBeInTheDocument();

        const imagesElement = await screen.findByText('Images Component');
        expect(imagesElement).toBeInTheDocument();
    });

    it('renders ImageDetails component for /images/:id path', async () => {
        const CustomRouter: React.FC<BrowserRouterProps> = ({ children }) => (
            <MemoryRouter initialEntries={['/images/1']}>{children}</MemoryRouter>
        );

        render(<AppRoutes Router={CustomRouter} />);

        expect(screen.getByText('Loading...')).toBeInTheDocument();

        const imageDetailsElement = await screen.findByText('Image Details Component');
        expect(imageDetailsElement).toBeInTheDocument();
    });

    it('renders NotFound component for unknown path', () => {
        const CustomRouter: React.FC<BrowserRouterProps> = ({ children }) => (
            <MemoryRouter initialEntries={['/unknown']}>{children}</MemoryRouter>
        );

        render(<AppRoutes Router={CustomRouter} />);

        expect(screen.getByText('Not Found')).toBeInTheDocument();
    });
});