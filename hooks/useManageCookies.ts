import { getCookie, setCookie } from 'cookies-next';
import { useState, useEffect } from 'react';

interface Beverage {
    menu: string;
    img: any;
    value: number;
    quantities: string | null;
    sweetLevel: string | null;
}

export const useManageCookies = () => {
    const [beverageHistory, setBeverageHistory] = useState<Beverage[]>([]); // Initialize as empty array

    // Update beverage history
    const updateBeverageHistory = (newBeverage: Beverage) => {
        const updateHistory = [newBeverage, ...beverageHistory].slice(0, 4);
        setBeverageHistory(updateHistory);
        setCookie('beverage', JSON.stringify(updateHistory), { path: '/' });
    };

    // Fetch cookie on client-side after component mounts
    useEffect(() => {
        const storeBeverageHistory = getCookie('beverage'); // Get cookie on client-side
        console.log('Stored Cookie Value:', storeBeverageHistory);
        if (storeBeverageHistory) {
            try {
                setBeverageHistory(JSON.parse(storeBeverageHistory as string)); // Parse if cookie exists
            } catch (error) {
                console.error('Error parsing JSON in effect:', error);
            }
        }
    }, []); // Empty dependency array to run only once on mount

    return {
        beverageHistory,
        updateBeverageHistory,
    };
};
