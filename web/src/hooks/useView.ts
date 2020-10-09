import { useState, useEffect } from 'react';
import { get } from '../services/api';
import { mdiTagPlus } from '@mdi/js';

export const useView = () => {

    let [vents, setVents] = useState(null);
    const [taggingVent, setTaggingVent] = useState(null);

    useEffect(() => {
        get('vent').then(result => setVents(result));
    }, []);

    const onTagClick = (ventId: String) => () => {
        console.log('tagging');
        setTaggingVent(ventId);
    };

    vents = vents && vents.map(vent => ({
        ...vent,
        ventActions: [
            {
                title: 'Tag',
                icon: mdiTagPlus,
                onClick: onTagClick(vent.ventId)
            }
        ]
    }));

    return { vents, showTagDialog: taggingVent };
};