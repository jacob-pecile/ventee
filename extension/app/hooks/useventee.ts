import { useState, useEffect } from 'react';
import { FormType, FormDefinition } from 'gotta-go-form';
import ConfettiGenerator from 'confetti-js';

import API from '../services/api';
import { useAuthentication } from './useAuthentication';

export const useVentee = () => {

    const [vented, setVented] = useState(false);

    let { isAuthenticated, userName } = useAuthentication();
    console.log('userName is :' + userName);

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
                    title: 'Copy the comment that made you mad here:',
                    accessor: 'comment',
                    type: FormType.TextArea,
                    mandatoryMessage: 'why\'d you open this if you had nothing to be mad at?',
                    properties: { inputProps: { style: { height: '60px' } } }
                },
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

    let onVented = (vent) => {
        chrome.tabs.query({ active: true }, async (tabs) => {
            console.log(tabs);
            vent = {
                ...vent,
                url: tabs.length ? tabs[0].url : null,
                userName: userName
            };
            await API.post('vent', vent);
            setVented(true);
        });
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
        vented,
        isAuthenticated
    };
};