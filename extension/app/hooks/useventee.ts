import { useState, useEffect } from 'react';
import { FormType, FormDefinition } from 'gotta-go-form';
import ConfettiGenerator from 'confetti-js';

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
                    title: 'yell into the box:',
                    accessor: 'complaints',
                    type: FormType.TextArea,
                    mandatoryMessage: 'c\'mon why\'d you open this if you\'re not angry?',
                    properties: { inputProps: { style: { height: '60px' } } }
                }
            ]
        }
        ]
    };

    let footeractions = [
        {
            text: 'Submit',
            type: 'Primary',
            validate: true,
            onClick: () => setVented(true)
        }
    ];


    return {
        definition,
        footeractions,
        vented
    };
};