import { useState, useEffect } from 'react';
import { get } from '../services/api';

export const useView = () => {

    const [vents, setVents] = useState([]);

    useEffect(() => {
        get('vent').then(result => setVents(result));
    }, []);

    return { vents };
};