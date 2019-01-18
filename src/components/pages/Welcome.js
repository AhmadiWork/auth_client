import React from 'react';
import {FormattedMessage} from 'react-intl';

export default () => {
    return (
        <h3>
            <FormattedMessage
                id='welcome.welcome'
                defaultMessage="Welcome! Sign In or Sing Up"
            />
        </h3>
    )
}