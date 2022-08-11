import React from 'react';
import { motion } from "framer-motion";
import { Outlet, useLocation } from 'react-router-dom';

const AnimatedRoute = () => {
    
    const PageLayout = ({ children }) => children;

    const pageVariants = {
        initial: {
            opacity: 0
        },
        in: {
            opacity: 1
        },
        out: {
            opacity: 0
        }
    };

    const pageTransition = {
        type: "tween",
        ease: "linear",
        duration: 0.5
    };

    const { pathname } = useLocation();

    return (
        <PageLayout>
            <motion.div
                key={pathname}
                initial="initial"
                animate="in"
                variants={pageVariants}
                transition={pageTransition}
            >
                <Outlet />
            </motion.div>
        </PageLayout>
    );
};

export default AnimatedRoute;