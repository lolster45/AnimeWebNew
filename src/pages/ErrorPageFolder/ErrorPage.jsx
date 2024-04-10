//React...
import React from 'react';

//Styles...
import "./errorPage.scss"

const ErrorPage = () => {
    return (
        <div className='error-page'>
            <div className='centered-item-message'>
                <h1>ERROR...</h1>
                <span>Oopps! Looks like something went wrong on our end...</span>
            </div>
        </div>
    );
};

export default ErrorPage;