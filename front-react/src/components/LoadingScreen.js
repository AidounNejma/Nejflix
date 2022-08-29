import React from 'react';

const LoadingScreen = () => {
    return (
        <div className='loadingScreen'>
            <section class="center-content">
                <div class="loading"></div>
                <section class="mask"></section>
                <section class="bg-lp"></section>
            </section>
        </div>
    );
};

export default LoadingScreen;