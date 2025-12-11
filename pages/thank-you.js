import Link from 'next/link';
import Header from '../components/Common/Header';
import Footer from '../components/Common/Footer';
import SeoMeta from '../components/Common/SeoMeta';

export default function ThankYou() {
  return (
    <>
      <SeoMeta title="Thank You | Alpha One Motors" />
      <Header />
      <section className='thank-you-wrap'>
        <div className='container container-lg'>
          <div className='thank-you-block text-center'>
            <h1 className='lg-title text-center mb-4'>
              Thank you for your interest in Alpha One Motors <br/>
              Our representative will be in contact with you shortly.
            </h1>
            <div className='mt-5 text-center'>
              <Link href="/" prefetch={false} className='black-btn get-started-btn w-240 text-uppercase d-inline-block'>
                Go Back
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
