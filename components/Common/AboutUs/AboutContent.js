import React from 'react';
import Image from 'next/image';
import { getImages } from '../const';
import WowElement from '../WowElement';

const AboutContent = () => {
    return (
        <section className="about-content-wrap cv-auto">
            <div className="container mxw-1100    "  >
                <div className="about-team-block">
                    <Image 
                        src={getImages('about-team.webp')} 
                        alt="Alpha One Motors Team" 
                        width={1200} className=' '
                        height={600} 
                        sizes="(max-width: 768px) 100vw, 1100px"
                        style={{ width: '100%', height: 'auto' }}
                        priority
                    />
                    <div className="d-flex align-items-center justify-content-between atb-flex">
                        <div className="fading md-title font-1-4em text-uppercase pe-3">Jeff Ahlfors</div>
                        <div className="fading md-title font-1-4em text-uppercase text-end">Michael Handwerger</div>
                    </div>
                </div>
                <div className="fading lg-title text-uppercase mb-lg-4 mb-3">
                    Meet Our Team
                </div>
                <div className="common-text">
                    <p className='fading'>Alpha One Motors is led by Jeff Ahlfors and Michael Handwerger, longtime friends and seasoned automotive professionals with a shared passion for high-performance vehicles and top-tier customer service. The two first met in 2013 while working for a major public automotive retailer, where they quickly developed a strong professional rapport and mutual respect. They stayed in touch over the years, with Jeff playing an integral role behind the scenes as a trusted advisor and supporter when Michael founded Alpha One Motors in Austin in 2019. His guidance helped shape the foundation and vision of the dealership long before officially joining the team.</p>

                    <p className='fading'>In 2025, Jeff came on board full-time after building a successful exotic dealership with over $1 billion in sales, earning a reputation as one of the premier luxury automotive dealers in the country. His career has been defined by a deep understanding of the high-end automotive market, a keen eye for sourcing rare and desirable vehicles, and a relentless commitment to client satisfaction. Jeff's ability to cultivate long-term relationships with discerning buyers helped position his previous venture as a benchmark for excellence in the industry. Bringing that same passion and expertise to Alpha One Motors, he now plays a key role in shaping the company's continued growth and expansion — including the launch of its San Antonio location.</p>

                    <p className='fading'>Together, Jeff and Michael are committed to delivering more than just world-class vehicles — they're building lasting relationships through transparency, expertise, and a deep appreciation for automotive excellence.</p>
                </div>
            </div>
        </section>
    );
};

export default AboutContent;
