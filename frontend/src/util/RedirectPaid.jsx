import { useEffect, useState, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import Loading from '@/components/pages/Loading';

export const RedirectPaid = ({ children }) => {
    const [isPaid, setIsPaid] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const hasChecked = useRef(false);

    useEffect(() => {
        if (hasChecked.current) return; // Prevent duplicate execution
        
        console.log("RedirectPaid: Checking payment status...");
        hasChecked.current = true;
        
        try {
            const transactionId = localStorage.getItem('transactionId');
            if (transactionId && transactionId.trim() !== '') {
                setIsPaid(true);
                console.log("RedirectPaid: Transaction ID found:", transactionId);
            } else {
                setIsPaid(false);
                console.log("RedirectPaid: No transaction ID found");
            }
        } catch (error) {
            console.error("RedirectPaid: Error checking payment status:", error);
            setIsPaid(false);
        } finally {
            setIsLoading(false);
        }
    }, []);

    if (isLoading) {
        return <Loading message="Checking payment status..." />;
    }

    if (isPaid) {
        console.log("RedirectPaid: User has paid, redirecting to email verification");
        return <Navigate to="/check-your-email" replace />;
    }

    console.log("RedirectPaid: User hasn't paid, showing children");
    return children;
};

export default RedirectPaid;