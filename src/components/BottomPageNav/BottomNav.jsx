import React from 'react';

const BottomNav = ({styles, handleMore, handleLess, page, setPage}) => {
    return (
        <div className={styles}>
            {page > 1 && 
            <button onClick={(e) => handleLess(e, setPage)}>Go Back</button>
            }
            <button onClick={(e) => handleMore(e, setPage)}>Next Page</button>
        </div> 
    );
};

export default BottomNav;