import { getCookie, setCookie, removeCookies } from "@/utils/cookies";
import { useState, useEffect } from "react";

interface Beverage {
    menu: string;
    img: any;
    value: number;
    quantities: string | null;
    sweetLevel: string | null;
}

export const useManageCookies = () => {
    const [sugarValue, setSugarValue] = useState<number>(() => {
        const storeValue = getCookie('sugarValue');
        return storeValue ? parseFloat(storeValue) : 0
    });

    const [beverageHistory, setBeverageHistory] = useState<Beverage[]>(() => {
        const storeValue = getCookie('beverage');
        console.log('Stored Cookie Value:', storeValue);
        if (storeValue === undefined || storeValue === null || storeValue === '') {
            return []; 
        }

        try {
            return JSON.parse(storeValue); 
        } catch (error) {
            console.error('Error parsing JSON:', error);
            return []; 
        }
    });

    const updateSugarValue = (valueToAdd: number) => {
        const currentSugarValue = sugarValue; 
        const newSugarValue = currentSugarValue + valueToAdd;
        setSugarValue(newSugarValue);
        setCookie('sugarValue', newSugarValue.toString()); 
    };

    const updateBeverageHistory = (newBeverage: Beverage) => {
        let updateHistory = [newBeverage, ...beverageHistory];
        if (updateHistory.length > 4) {
            updateHistory.pop();
            updateHistory.unshift();
        }

        setBeverageHistory(updateHistory)
        setCookie('beverage', JSON.stringify(updateHistory))
    }

    useEffect(() => {
        const storeSugarValue = getCookie('sugarValue')
        if (storeSugarValue) {
            setSugarValue(parseFloat(storeSugarValue));
        }

        const storeBeverageHistory = getCookie('beverage');
        if (storeBeverageHistory) {
            try {
                setBeverageHistory(JSON.parse(storeBeverageHistory)); // Parse and set history safely
            } catch (error) {
                console.error('Error parsing JSON in effect:', error); // Log any parsing errors
            }
        }
    }, [])

    return {
        sugarValue,
        updateSugarValue,
        beverageHistory,
        updateBeverageHistory
    }
}