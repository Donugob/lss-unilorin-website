import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    // Extracts pathname property from useLocation hook
    const { pathname } = useLocation();

    // This useEffect hook will run every time the pathname changes
    useEffect(() => {
        // "document.documentElement.scrollTo" is the magic
        // It scrolls the window to the specified coordinates.
        // In this case, to the top of the page.
        document.documentElement.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth", // Or "auto" for an instant scroll
        });
    }, [pathname]); // The effect dependency is the pathname, so it runs on each route change

    // This component does not render any visible UI
    return null;
};

export default ScrollToTop;