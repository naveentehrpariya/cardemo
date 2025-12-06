import { useState, forwardRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getImages } from './const';

const Header = forwardRef(function Header({ secref }, ref) {
    const [isMob, setisMob] = useState(false);
    const router = useRouter();
    
    const onChangeBodyClass = (value) => {
        setisMob(value);
        if (value) {
            document.body.classList.add('overflow-active');
        } else {
            document.body.removeAttribute('class');
        }
    };
    
    const closeMenu = () => {
        setisMob(false);
        document.body.classList.remove('overflow-active');
    };

    return (
        <>
            <header className={`header-wrap ${router.pathname === "/" ? "" : "inner-header-wrap"}`} ref={ref || secref}>
                <div className='container container-lg'>
                    <div className='header-flex d-flex justify-content-between'>
                        <div className='main-logo d-flex align-items-center'>
                            <Link href="/"><img src={getImages('alpha-one-logo.webp')} alt="Alpha One Motors" /></Link>
                        </div>
                        <div className={`main-menu ${isMob ? 'active' : ''}`}>
                            <div className='d-lg-none'>
                                <div className='social-links'>
                                    <Link href="tel:5127771240">
                                        <img src={getImages('black-phone-material.svg')} alt="Phone" />
                                    </Link>
                                    <a href='https://www.facebook.com/alphaonemotors/' target='_blank' rel="noopener noreferrer" className='ms-3'><img src={getImages('fb-icon.svg')} alt="Facebook" /></a>
                                    <a href='https://www.instagram.com/alpha_one_motors/' target='_blank' rel="noopener noreferrer" className='ms-3'><img src={getImages('instagram-font-awesome.svg')} alt="Instagram" /></a>
                                </div>
                            </div>
                            <ul className='d-flex align-items-center'>
                                <li>
                                    <Link href="/" className={router.pathname === "/" ? "active" : ""} onClick={closeMenu}>Home</Link>
                                </li>
                                <li>
                                    <Link href="/why-us" className={router.pathname === "/why-us" ? "active" : ""} onClick={closeMenu}>Why Us</Link>
                                </li>
                                <li>
                                    <Link href="/sell-my-exotic" className={router.pathname === "/sell-my-exotic" ? "active" : ""} onClick={closeMenu}>Sell my Exotic</Link>
                                </li>
                                <li>
                                    <Link href="/about-us" className={router.pathname === "/about-us" ? "active" : ""} onClick={closeMenu}>ABOUT US</Link>
                                </li>
                                <li>
                                    <Link href="/contact-us" className={router.pathname === "/contact-us" ? "active" : ""} onClick={closeMenu}>Contact</Link>
                                </li>
                            </ul>
                        </div>
                        <div className='d-lg-flex align-items-center d-none mb-5'>
                            <div>
                                <Link href="tel:5127771240" className='phone-no'>
                                    <span className='phone-icon'></span> <span className='d-none d-md-inline-block'>(512) 777-1240</span>
                                </Link>
                            </div>
                            <div className='social-links ms-4'>
                                <a href='https://www.facebook.com/alphaonemotors/' target='_blank' rel="noopener noreferrer" className='ms-3'><img src={getImages('fb-icon.svg')} alt="Facebook" /></a>
                                <a href='https://www.instagram.com/alpha_one_motors/' target='_blank' rel="noopener noreferrer" className='ms-3'><img src={getImages('instagram-font-awesome.svg')} alt="Instagram" /></a>
                            </div>
                        </div>
                        <div className={`overflow-bg d-lg-none ${isMob ? 'active' : ''}`} onClick={() => onChangeBodyClass(!isMob)}></div>
                        <div
                            className={`mobile-inner-header d-lg-none ${isMob ? 'active' : ''}`}
                            onClick={() => onChangeBodyClass(!isMob)}
                        >
                            <div
                                className={`mobile-inner-header-icon mobile-inner-header-icon-out ${isMob ? 'active' : ''}`}
                            >
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
});

export default Header;
