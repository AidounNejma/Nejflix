import React from 'react';

const LoadingScreen = () => {
    return (
        <div className='loadingScreen'>
            <section className="center-content">
                <div className="loading"></div>
                <section className="mask"></section>
                <section className="bg-lp"></section>
            </section>
        </div>
    );
};

export default LoadingScreen;