import * as React from 'react';
import { useState, useEffect } from 'react';
import { get, post } from '../services/api';
import { mdiTagPlus } from '@mdi/js';
import {FormDefinition, FormType} from 'gotta-go-form';
import CreatableSelect from 'react-select/creatable';

export const useView = () => {

    let [vents, setVents] = useState(null);
    let [tags, setTags] = useState(null);
    const [taggingVent, setTaggingVent] = useState(null);
    const [showTagFilter, setShowTagFilter] = useState(false);

    useEffect(() => {
        get('vent').then(result => setVents(result));
        get('tag').then(result => setTags(result));
    }, []);

    const onTagClick = (ventId: String) => () => {
        console.log(`tagging: ${ventId}`);
        setTaggingVent(ventId);
    };

    const onDialogClose = () => {
        setTaggingVent(null);
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

    const onSaveTags = (def) => {
        post('tag', def.tagNames.map(tag => ({tagName: tag.value}))).then(onDialogClose);
    };

    const definition: FormDefinition = {
        sections: [
            {
                fields: [
                    {
                        title: 'Enter Tag Names',
                        accessor: 'tagNames',
                        type: FormType.Custom,
                        customComponent: (field) => (
                            <CreatableSelect
                                isMulti
                                onChange={(val) => {console.log(val); field.callback(val);} }
                            />
                        )
                    }
                ]
            }
        ]
    };

    const footerActions = [
        {
            text: 'Save',
            type: 'Primary',
            validate: true,
            onClick: onSaveTags
        }
    ];

    const onFavourite = () => {
        console.log('filter favourites');
    };

    const onTagFilter = () => {
        setShowTagFilter(true);
    };

    return { 
        vents,
        showTagDialog: taggingVent,
        onDialogClose, 
        definition, 
        footerActions, 
        tags, 
        onFavourite,
        onTagFilter,
        showTagFilter
     };
};