import React from 'react';

const BottomNav = ({styles, handleMore, handleLess, page, setPage}) => {


    const scrollToTop = () => {
        const container = document.querySelector('.discovery-page'); // Replace with the correct selector
        if(container) {
            container.scrollTo({
              top: 0,
              behavior: 'smooth' // Smooth scrolling
            });

        }
    }

    return (
        <div className={styles}>
            {page > 1 && 
            <button 
                onClick={(e) => {
                    handleLess(e, setPage)
                    scrollToTop()
                }}
            >
                Go Back
            </button>
            }
            <button 
                onClick={(e) => {
                    handleMore(e, setPage)
                    scrollToTop()
                }}
            >
                Next Page
            </button>
        </div> 
    );
};

export default BottomNav;