import Link from 'next/link';
import Image from 'next/image';
import { getImages } from './const';

const Footer = () => {
  return (
    <footer className="bg-black">
      <div className="container">
        <div className="md:flex items-start md:items-center justify-between pb-6 md:!pb-12 !py-12 border-b-0">
          <div className="w-full md:w-auto mb-8 md:mb-0">
                <Link className='flex md:flex justify-center lg:justify-start ' href="/" prefetch={false}>
                    <Image src={getImages("alpha-one-logo.webp")}
                    alt="Alpha One Motors" width={220} height={40}
                    className="inline-block w-56 md:w-[220px] h-auto" />
                </Link>
            <div className="!pb-4 !pt-4 flex md:flex justify-start md:justify-start sm-title font-16  !mb-4 md:!mb-0 !mt-4 md:!mb-4 ">
                <Link href="tel:5127771240">
                  <span className="text-gray">Sales:</span> (512) 777-1240
                </Link>
            </div>
          </div>

          <div className="  w-full  md:max-w-[300px]">
            <div className="sm-title font-16 mb-4 uppercase fw-500 text-start md:text-start">
              Store Hours
            </div>
            <div className="flex items-center justify-between mb-3 w-full  mx-auto md:mx-0">
              <div className="sm-title font-16 fw-500 text-gray">
                Monday - Friday
              </div>
              <div className="sm-title font-16 w-80px fw-500 text-gray text-right">
                10am - 5pm
              </div>
            </div>
            <div className="flex items-center justify-between mb-3 w-full  mx-auto md:mx-0">
              <div className="sm-title font-16 fw-500 text-gray">Saturday</div>
              <div className="sm-title font-16 w-80px fw-500 text-gray text-right">
                Appointment Only
              </div>
            </div>
            <div className="flex items-center justify-between mb-3 w-full   mx-auto md:mx-0">
              <div className="sm-title font-16 fw-500 text-gray">Sunday</div>
              <div className="sm-title font-16 w-80px fw-500 text-gray text-right">
                Closed
              </div>
            </div>
          </div>
        </div>

        
        <div className="lg:!flex  items-center !justify-between lg:!justify-between pt-0 pb-5 md:pb-6 md:pt-6">
          <div className="flex !mb-6 lg:!mb-0 !justify-center lg:!justify-start items-center gap-4 !m-auto lg:!m-0  ">
            <a
              href="https://www.facebook.com/alphaonemotors/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <Image
                src="/images/fbf-icon.webp"
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
                src="/images/insta-icon.webp"
                alt="Instagram"
                width={32}
                height={32}
              />
            </a>
          </div>
          <div className="font-helvetica text-base font-light tracking-tight text-white    text-center ">
            &copy; 2025 Alpha One Motors. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
