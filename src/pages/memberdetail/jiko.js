
import React from 'react';
import './style.css';

const VideoComponent = ({ videoUrl, autoplay }) => {
    return (
        <div className="video-container">
            <video controls autoplay={autoplay}>
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}

export default VideoComponent;
