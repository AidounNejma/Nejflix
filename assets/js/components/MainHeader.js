import React from 'react';
import '../../css/components/_mainHeader.scss';
import MediaHeader from './MediaHeader';

const MainHeader = ({elements, setElements, openModalHeader, setGetVideo, setShowVideo}) => {
    
    return (
        <div>
            {elements.map(information=> (
            <div className='lolomo is-fullbleed' key={information.id} >
                <MediaHeader element={information} 
                    setElements={setElements} 
                    openModalHeader={openModalHeader} 
                    setGetVideo={setGetVideo} 
                    setShowVideo={setShowVideo}/>
            </div>
            ))};
        </div>
    );
};

export default MainHeader;