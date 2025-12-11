import Link from 'next/link';
import Header from '../components/Common/Header';
import Footer from '../components/Common/Footer';
import SeoMeta from '../components/Common/SeoMeta';

export default function ThankYou() {
    return (
        <>
            <SeoMeta title="Thank You | Alpha One Motors" />
            <Header />
            
            <div className="min-h-[60vh] flex items-center justify-center bg-white py-20">
                <div className="text-center px-4 max-w-2xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6">Thank You!</h1>
                    <p className="text-xl text-gray-700 mb-4">
                        Your message has been successfully sent.
                    </p>
                    <p className="text-lg text-gray-600 mb-8">
                        We appreciate you contacting us. One of our team members will get back to you shortly.
                    </p>
                    <Link href="/" prefetch={false} className="black-btn inline-block">
                        Return to Home
                    </Link>
                </div>
            </div>

            <Footer />
        </>
    );
}
