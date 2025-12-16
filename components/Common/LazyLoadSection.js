import { useState, useEffect, useRef } from 'react';

const LazyLoadSection = ({ children, rootMargin = '100px', height = 'auto' }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }
        }, { rootMargin });

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (observer) observer.disconnect();
        };
    }, [rootMargin]);

    return (
        <div ref={ref} style={{ minHeight: height }}>
            {isVisible ? children : null}
        </div>
    );
};

export default LazyLoadSection;
