import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Ventee from './container/ventee';

import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { poolData } from './types/constants';

console.log(process.env.NODE_ENV);
var userPool = new CognitoUserPool(poolData);

ReactDOM.render(
    <Ventee userPool={userPool} />,
    document.getElementById('app')
);