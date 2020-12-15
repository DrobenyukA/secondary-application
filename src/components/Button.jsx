import React from 'react';

const Button = ({ color, children, ...props }) => {
    return <button {...props} className={`btn btn-${color}`}>{ children }</button>
};

export default Button;
