import React from 'react';
import PropTypes from 'prop-types';
import { messages } from '../../messages';
import useSelector from '../../../store/use-selector';
import "./style.css"

function LocalizedText({ id,children,className, ...restProps }) {
    const locale = useSelector(state => state.language.locale);
    return (
        <span className={`LocalizedText ${className}`} {...restProps}>
            {messages[locale][id]}{children}
        </span>
    );
}

LocalizedText.propTypes = {
    id: PropTypes.string,
    children:PropTypes.string,
    className:PropTypes.string,
};

export default LocalizedText;