import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-black">
      <div className="container-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-12 md:py-14 border-b-0">
          <div className="w-full md:w-auto mb-8 md:mb-0">
            <div className="mb-4 text-center md:text-left">
              <Link href="/">
                <Image
                  src="/images/alpha-one-logo.webp"
                  alt="Alpha One Motors"
                  width={220}
                  height={40}
                  className="inline-block w-56 md:w-[220px] h-auto"
                />
              </Link>
            </div>
            <div className="sm-title font-18 mb-3 text-center md:text-left">
              2301 Double Creek Dr. Suite 270, Round Rock, Texas 78664
            </div>
            <div className="sm-title font-16 mb-3">
              <Link href="tel:5127771240">
                <span className="text-gray">Sales:</span> (512) 777-1240
              </Link>
            </div>
            <div className="sm-title font-16 mb-3">
              <Link href="tel:5127771240">
                <span className="text-gray">Service:</span> (512) 777-1240
              </Link>
            </div>
          </div>
          <div className="w-full md:w-auto">
            <div className="sm-title font-16 mb-4 uppercase fw-500 text-center md:text-left">
              Store Hours
            </div>
            <div className="flex items-center justify-between mb-3 max-w-xs mx-auto md:mx-0">
              <div className="sm-title font-16 fw-500 text-gray">
                Monday - Friday
              </div>
              <div className="sm-title font-16 w-80px fw-500 text-gray text-right">
                9am - 6pm
              </div>
            </div>
            <div className="flex items-center justify-between mb-3 max-w-xs mx-auto md:mx-0">
              <div className="sm-title font-16 fw-500 text-gray">Saturday</div>
              <div className="sm-title font-16 w-80px fw-500 text-gray text-right">
                9am - 5pm
              </div>
            </div>
            <div className="flex items-center justify-between mb-3 max-w-xs mx-auto md:mx-0">
              <div className="sm-title font-16 fw-500 text-gray">Sunday</div>
              <div className="sm-title font-16 w-80px fw-500 text-gray text-right">
                Closed
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between py-5 md:py-6">
          <div className="flex items-center gap-4 mb-6 md:mb-0 order-2 md:order-1">
            <a
              href="https://www.facebook.com/alphaonemotors/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <Image
                src="/images/fbf-icon.png"
                alt="Facebook"
                width={32}
                height={32}
              />
            </a>
            <a
              href="https://www.instagram.com/alpha_one_motors/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <Image
                src="/images/insta-icon.png"
                alt="Instagram"
                width={32}
                height={32}
              />
            </a>
            <a
              href="#"
              className="hover:opacity-80 transition-opacity"
            >
              <Image
                src="/images/yt-icon.png"
                alt="YouTube"
                width={32}
                height={32}
              />
            </a>
            <a
              href="#"
              className="hover:opacity-80 transition-opacity"
            >
              <Image
                src="/images/tw-icon.png"
                alt="Twitter"
                width={32}
                height={32}
              />
            </a>
            <a
              href="#"
              className="hover:opacity-80 transition-opacity"
            >
              <Image
                src="/images/pin-icon.png"
                alt="Pinterest"
                width={32}
                height={32}
              />
            </a>
          </div>
          <div className="font-helvetica text-base font-light tracking-tight text-white order-1 md:order-2">
            &copy; 2025 Alpha One Motors. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
