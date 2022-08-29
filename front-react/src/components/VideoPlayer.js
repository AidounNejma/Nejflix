import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({video, showVideo, setShowVideo}) => {
    return (

        <div className={`containerPlayerVideo ${showVideo ? '' : 'closedVideo'}`}>
            <div className={`player-wrapper `}>
                <ReactPlayer
                    className='react-player'
                    url={video}
                    width='-webkit-fill-available%'
                    height='-webkit-fill-available%'
                    controls= {true}
                />
                <button type="button" className="closeVideoPlayer" onClick={() => setShowVideo(false)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="button" aria-label="close" tabIndex="0">
                        <path fillRule="evenodd" clipRule="evenodd" d="M2.29297 3.70706L10.5859 12L2.29297 20.2928L3.70718 21.7071L12.0001 13.4142L20.293 21.7071L21.7072 20.2928L13.4143 12L21.7072 3.70706L20.293 2.29285L12.0001 10.5857L3.70718 2.29285L2.29297 3.70706Z" fill="currentColor"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default VideoPlayer;