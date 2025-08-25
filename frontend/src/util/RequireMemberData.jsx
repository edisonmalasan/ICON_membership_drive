import { useEffect, useState, useRef } from 'react';
import { Navigate } from 'react-router-dom';

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
        return <div>Loading...</div>;
    }

    // Check if memberData exists and has required properties
    if (!memberData || !memberData.id) {
        console.log("No valid member data, redirecting to signup");
        return <Navigate to="/signup" replace />;
    }

    console.log("Member data valid, rendering children");
    return children;
};

export default RequireMemberData;