import React from 'react';
import Routes from "./routes/Routes.tsx";
import ErrorBoundary from "./components/shared/ErrorBoundary/ErrorBoundary.tsx";

const App:React.FC = () => {
    return (
        <ErrorBoundary>
            <Routes/>
        </ErrorBoundary>
    )
}

export default App;
