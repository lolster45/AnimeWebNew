import React from 'react';

//Styles...
import "./spinnerPage.scss"

const SpinnerPage = () => {
    return (
        <div className='spinner-wrap-page'>
            <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default SpinnerPage;