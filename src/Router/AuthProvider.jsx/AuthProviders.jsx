
import { useLocation } from 'react-router';
import useAuth from '../../hooks/useAuth';

const AuthProviders = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    if (loading) {
        return <span className="loading loading-bars loading-lg"></span>

    }
    if (user) {
        return children;
    }
    return <Navigate to="/signIn" state={{ from: location }} replace></Navigate>
};

export default AuthProviders;