import { getImages } from '@/components/Common/const';
import Header from '../components/Common/Header';
import Footer from '../components/Common/Footer';
import SeoMeta from '../components/Common/SeoMeta';

export default function AboutUs() {
    return (
        <>
            <SeoMeta 
                title="About Us | Alpha One Motors" 
                description="Alpha One Motors - We Know Luxury Automotive. Leading Texas exotic car dealership with over 25 years of experience."
            />
            <Header />

            <section 
                className="common-banner-wrap d-flex align-items-center"
                style={{
                    backgroundImage: `url(${getImages('new-about-hero.webp')})`
                }}
            >
                <div className="w-100">
                    <div className="xl-title text-uppercase text-center font-80 letter-spacing-3 wow reveal fadeInUp">
                        About Us
                    </div>
                    <div className="lg-title font-40 text-uppercase text-center fw-300 mt-3 wow reveal fadeInUp">
                        We Know Luxury Automotive
                    </div>
                </div>
            </section>

            <section className="about-content-wrap">
                <div className="container mxw-1100">
                    <div className="about-team-block">
                        <img src={getImages('about-team.webp')} alt="team" />
                        <div className="d-flex align-items-center justify-content-between atb-flex">
                            <div className="md-title font-1-4em text-uppercase pe-3">Jeff Ahlfors</div>
                            <div className="md-title font-1-4em text-uppercase text-end">Michael Handwerger</div>
                        </div>
                    </div>
                    <div className="lg-title text-uppercase mb-lg-4 mb-3 wow reveal fadeInUp">
                        The Team
                    </div>
                    <div className="common-text wow reveal fadeInUp">
                        <p>Alpha One Motors is led by Jeff Ahlfors and Michael Handwerger, longtime friends and seasoned automotive professionals with a shared passion for high-performance vehicles and top-tier customer service. The two first met in 2013 while working for a major public automotive retailer, where they quickly developed a strong professional rapport and mutual respect. They stayed in touch over the years, with Jeff playing an integral role behind the scenes as a trusted advisor and supporter when Michael founded Alpha One Motors in Austin in 2019. His guidance helped shape the foundation and vision of the dealership long before officially joining the team.</p>

                        <p>In 2025, Jeff came on board full-time after building a successful exotic dealership with over $1 billion in sales, earning a reputation as one of the premier luxury automotive dealers in the country. His career has been defined by a deep understanding of the high-end automotive market, a keen eye for sourcing rare and desirable vehicles, and a relentless commitment to client satisfaction. Jeff's ability to cultivate long-term relationships with discerning buyers helped position his previous venture as a benchmark for excellence in the industry. Bringing that same passion and expertise to Alpha One Motors, he now plays a key role in shaping the company's continued growth and expansion — including the launch of its San Antonio location.</p>

                        <p>Together, Jeff and Michael are committed to delivering more than just world-class vehicles — they're building lasting relationships through transparency, expertise, and a deep appreciation for automotive excellence.</p>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
