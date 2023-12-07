import React from 'react';
import PropTypes from 'prop-types';
import { messages } from '../../i18n/messages';
import useSelector from '../../store/use-selector';
import "./style.css"

function LocalizedText({ id,children,className, ...restProps }) {
    const locale = useSelector(state => state.language.locale);
    return (
        <div className={`LocalizedText ${className}`} {...restProps}>
            {messages[locale][id]}{children}
        </div>
    );
}

LocalizedText.propTypes = {
    id: PropTypes.string,
    children:PropTypes.string,
    className:PropTypes.string,
};

export default LocalizedText;