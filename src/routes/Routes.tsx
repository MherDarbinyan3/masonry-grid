import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const Images = React.lazy(() => import('../components/pages/Images/Images'));
const ImageDetails = React.lazy(() => import('../components/pages/ImageDetails/ImageDetails'));

const AppRoutes: React.FC = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Images />} />
            <Route path="/images/:id" element={<ImageDetails />} />
        </Routes>
    </Router>
);

export default AppRoutes;