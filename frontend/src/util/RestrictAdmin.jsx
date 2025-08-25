import { useEffect, useState, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { authorize } from '@/services/authService';
import Loading from '@/components/pages/Loading';

export const RestrictAdmin = ({ children }) => {
    const hasChecked = useRef(false);
    const [isLoading, setLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        async function checkAuthorization() {
            if (hasChecked.current) return; // Prevent duplicate execution
            hasChecked.current = true;
            
            console.log("Checking auth");
            try {
                const authResult = await authorize();
                setIsAuthorized(authResult);
                console.log("Authorization result:", authResult);
            } catch (error) {
                console.error("Authorization check failed:", error);
                setIsAuthorized(false);
            } finally {
                setLoading(false);
            }
        }

        checkAuthorization();
    }, []);

    if (isLoading) {
        return <Loading message="Checking authorization..." />;
    }

    if (!isAuthorized) {
        console.log("User not authorized, redirecting to home");
        return <Navigate to="/" replace />;
    }

    console.log("User is authorized, rendering children");
    return children;
};

export default RestrictAdmin;