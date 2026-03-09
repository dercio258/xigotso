import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useAnalytics = () => {
    const location = useLocation();

    useEffect(() => {
        const trackHit = async () => {
            try {
                await fetch('http://localhost:3000/analytics/track-view', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ page: location.pathname }),
                });
            } catch (error) {
                console.error('Failed to track analytics hit:', error);
            }
        };

        trackHit();
    }, [location]);
};

export default useAnalytics;
