import { useEffect, useState, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import Loading from '@/components/pages/Loading';

export const RequireMemberData = ({ children }) => {
    const [memberData, setMemberData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const hasChecked = useRef(false);

    useEffect(() => {
        if (hasChecked.current) return; // Prevent duplicate execution
        
        console.log("Checking membership data...");
        hasChecked.current = true;
        
        try {
            const data = localStorage.getItem('memberData');
            if (data) {
                const parsedData = JSON.parse(data);
                setMemberData(parsedData);
                console.log("Member data found:", parsedData);
            } else {
                console.log("No member data found");
                setMemberData(null);
            }
        } catch (error) {
            console.error("Error parsing member data:", error);
            setMemberData(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    if (isLoading) {
        return <Loading message="Checking membership data..." />;
    }

    // Check if memberData exists and has required properties
    if (!memberData || !memberData.id) {
        console.log("No valid member data, redirecting to signup");
        return <Navigate to="/signup" replace />;
    }

    console.log("Member data valid, rendering children");
    return children;
};

export const RedirectMemberFilled = ({children}) => {
    const [memberData, setMemberData] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Add loading state

    useEffect(() => {
        console.log("RedirectMemberFilled: Checking for existing member data...");
        try {
            const data = localStorage.getItem('memberData');
            if (data) {
                const parsedData = JSON.parse(data);
                setMemberData(parsedData);
                console.log("RedirectMemberFilled: Member data found:", parsedData);
            } else {
                console.log("RedirectMemberFilled: No member data found");
                setMemberData(null);
            }
        } catch (error) {
            console.error("RedirectMemberFilled: Error parsing member data:", error);
            setMemberData(null);
        } finally {
            setIsLoading(false); // Always set loading to false
        }
    }, []);

    // Show loading while checking
    if (isLoading) {
        return <Loading message="Checking membership data..." />;
    }

    // If member data exists, redirect to payment
    if (memberData && memberData.id) {
        console.log("RedirectMemberFilled: Member data exists, redirecting to payment");
        return <Navigate to="/payment-option" replace />;
    }

    // No member data, show children (signup form)
    console.log("RedirectMemberFilled: No member data, showing signup form");
    return children;
};

export default RequireMemberData;