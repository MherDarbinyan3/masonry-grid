import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

jest.mock('./routes/Routes', () => {
    return function DummyRoutes() {
        return <div data-testid="mock-routes">Mocked Routes</div>;
    };
});

jest.mock('./components/shared/ErrorBoundary/ErrorBoundary', () => {
    return function DummyErrorBoundary({ children }: { children: React.ReactNode }) {
        return <div data-testid="mock-error-boundary">{children}</div>;
    };
});

describe('App Component', () => {
    it('renders without crashing', () => {
        render(<App />);
        expect(screen.getByTestId('mock-error-boundary')).toBeInTheDocument();
    });

    it('renders ErrorBoundary', () => {
        render(<App />);
        const errorBoundary = screen.getByTestId('mock-error-boundary');
        expect(errorBoundary).toBeInTheDocument();
    });

    it('renders Routes within ErrorBoundary', () => {
        render(<App />);
        const routes = screen.getByTestId('mock-routes');
        expect(routes).toBeInTheDocument();
        expect(screen.getByTestId('mock-error-boundary')).toContainElement(routes);
    });
});