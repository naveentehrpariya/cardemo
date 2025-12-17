import { useState, forwardRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
                    <div className='md:!pb-4 md:!pt-3 header-flex d-flex justify-content-between'>
                        <div className='main-logo flex items-center'>
                            <Link href="/" prefetch={false}>
                                <Image src={getImages('alpha-one-logo.webp')} alt="Alpha One Motors" width={220} height={40} />
                            </Link>
                        </div>
                        
                        <div className={`main-menu ${isMob ? 'active' : ''}`}>
                            <div className='d-lg-none'>
                                <div className='social-links'>
                                    <Link href="tel:5127771240">
                                        <Image src={getImages('black-phone-material.svg')} alt="Phone" width={24} height={24} />
                                    </Link>
                                    <a href='https://www.facebook.com/alphaonemotors/' target='_blank' rel="noopener noreferrer" className='ms-3'><Image src={getImages('fb-icon.svg')} alt="Facebook" width={24} height={24} /></a>
                                    <a href='https://www.instagram.com/alpha_one_motors/' target='_blank' rel="noopener noreferrer" className='ms-3'><Image src={getImages('instagram-font-awesome.svg')} alt="Instagram" width={24} height={24} /></a>
                                </div>
                            </div>
                            <ul className='d-flex align-items-center'>
                                <li>
                                    <Link href="/" prefetch={false} className={router.pathname === "/" ? "active" : ""} onClick={closeMenu}>Home</Link>
                                </li>
                                <li>
                                    <Link href="/why-us" prefetch={false} className={router.pathname === "/why-us" ? "active" : ""} onClick={closeMenu}>Why Us</Link>
                                </li>
                                <li>
                                    <Link href="/sell-my-exotic" prefetch={false} className={router.pathname === "/sell-my-exotic" ? "active" : ""} onClick={closeMenu}>Sell my Exotic</Link>
                                </li>
                                <li>
                                    <Link href="/about-us" prefetch={false} className={router.pathname === "/about-us" ? "active" : ""} onClick={closeMenu}>ABOUT US</Link>
                                </li>
                                <li>
                                    <Link href="/contact-us" prefetch={false} className={router.pathname === "/contact-us" ? "active" : ""} onClick={closeMenu}>Contact</Link>
                                </li>
                            </ul>
                        </div>
                        <div className='d-lg-flex items-center d-none'>
                            <div>
                                <Link href="tel:5127771240" className='phone-no'>
                                    <span className='phone-icon'></span> <span className='d-none d-md-inline-block'>(512) 777-1240</span>
                                </Link>
                            </div>
                            <div className='social-links ms-4 flex items-center'>
                                <a href='https://www.facebook.com/alphaonemotors/' target='_blank' rel="noopener noreferrer" className='ms-3'><Image src={getImages('fb-icon.svg')} alt="Facebook" width={24} height={24} /></a>
                                <a href='https://www.instagram.com/alpha_one_motors/' target='_blank' rel="noopener noreferrer" className='ms-3'><Image src={getImages('instagram-font-awesome.svg')} alt="Instagram" width={24} height={24} /></a>
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
