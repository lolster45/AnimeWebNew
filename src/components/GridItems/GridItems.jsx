//React...
import React from 'react';

//components... 
import CardTemplate from '../cardTemplate';
import LoadingFB from '../loading-shean/loadingFB';

//Styles...
import "../GridItems/gridItems.scss"

const GridItems = ({data, layout, loading}) => {
    return (
        <div className={`items-grid ${layout ? "active" : ""}`}>
            {loading && 
                <LoadingFB/>
            }
            {!loading &&
                data?.map((item, i) => (
                    <CardTemplate
                        key={i}
                        customClass="card"
                        id={item.mal_id}
                        type={"anime"}
                        title={item.title_english}
                        backUpTitle={item.title}
                        image={item.images.jpg.image_url}
                        layout={layout}
                        score={item.score}
                        synopsis={item.synopsis}
                    />
                  
                ))
            }
        </div>
    );
};

export default GridItems;