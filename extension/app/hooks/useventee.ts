import { useState, useEffect } from 'react';
import { FormType, FormDefinition } from 'gotta-go-form';
import ConfettiGenerator from 'confetti-js';

import API from '../services/api';

export const useVentee = () => {

    const [vented, setVented] = useState(false);

    useEffect(() => {
        const confettiSettings = { target: 'congratz' };
        const confetti = new ConfettiGenerator(confettiSettings);
        if (!vented) {
            confetti.clear();
            return;
        }

        confetti.render();
    }, [vented]);


    let definition: FormDefinition = {
        sections: [{
            fields: [
                {
                    title: 'yell into the void:',
                    accessor: 'vent',
                    type: FormType.TextArea,
                    mandatoryMessage: 'c\'mon why\'d you open this if you\'re not angry?',
                    properties: { inputProps: { style: { height: '60px' } } }
                }
            ]
        }
        ]
    };

    let onVented = async (vent) => {
        await API.post('vent', vent);
        setVented(true);
    };

    let footeractions = [
        {
            text: 'Submit',
            type: 'Primary',
            validate: true,
            onClick: onVented
        }
    ];


    return {
        definition,
        footeractions,
        vented
    };
};