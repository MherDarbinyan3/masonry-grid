import React, {Suspense} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Loading from "../components/shared/Loading/Loading.tsx";

const Images = React.lazy(() => import('../components/pages/Images/Images'));
const ImageDetails = React.lazy(() => import('../components/pages/ImageDetails/ImageDetails'));

const AppRoutes: React.FC = () => (
    <Router>
        <Routes>
            <Route path="/" element={
                <Suspense fallback={<Loading />}>
                    <Images />
                </Suspense>
            } />
            <Route path="/images/:id" element={
                <Suspense fallback={<Loading />}>
                    <ImageDetails />
                </Suspense>
            } />
        </Routes>
    </Router>
);

export default AppRoutes;