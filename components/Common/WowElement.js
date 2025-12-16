import { useState, useEffect, useRef } from 'react';

const WowElement = ({ children, className = '', delay, duration, ...props }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }
        }, { threshold: 0.1 });

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (observer) observer.disconnect();
        };
    }, []);

    // Extract animation name from className (assuming it contains something like fadeInUp)
    // Actually, animate.css classes usually work by adding 'animated' and the animation name.
    // The 'wow' class usually sets visibility to hidden.
    // We will manually control visibility.

    const combinedClassName = `${className} ${isVisible ? 'animated' : ''}`;
    
    const style = {
        ...props.style,
        visibility: isVisible ? 'visible' : 'hidden',
        animationDelay: delay,
        animationDuration: duration,
        animationName: isVisible ? undefined : 'none' // Prevent animation before visible
    };

    return (
        <div ref={ref} className={combinedClassName} style={style} {...props}>
            {children}
        </div>
    );
};

export default WowElement;
