import { Navigate, useLocation } from 'react-router';
import useAuth from '../../hooks/useAuth';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    if (loading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    if (user) {
        return children;
    }
    return <Navigate to="/signUp" state={{ from: location }} replace></Navigate>
};

export default PrivateRoutes;