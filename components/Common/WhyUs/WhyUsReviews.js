import React from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { getImages } from '@/components/Common/const';

const Slider = dynamic(() => import('react-slick'), { ssr: false });

const reviewsList = [
    {
        name: "Eric Bramlett",
        date: "January 31, 2024",
        bgColor: "#512DA8",
        content: "When we started looking for a Landcruiser, I knew it wasn't going to be just another car purchase. A Landcruiser is a big deal, and I wanted to make sure we found one that was in great shape and from someone we could actually trust. That's what led us back to Alpha One. We've worked with them before—both buying and selling—and every single time they've been nothing but professional, straightforward, and easy to deal with. This time was no different.",
    },
    {
        name: "Alex Quintanar",
        date: "January 31, 2024",
        bgColor: "#E91E63",
        content: "I've grabbed a few exotic cars from Alpha One Motors over time, and every single visit has been awesome! Their team is super friendly and spot-on with customer service—they always nail exactly what I'm after without any hassle. Totally recommend them if you're hunting for some premium rides!",
    },
    {
        name: "Ali Bramlett",
        date: "January 31, 2024",
        bgColor: "#FF9800",
        content: "When we decided to buy our Landcruiser, we knew it was going to be a big purchase for us, so finding the right dealership was really important. From the very beginning, our experience with Alpha One felt different from other places we've dealt with in the past.",
    },
    {
        name: "Cade Satterfield",
        date: "January 31, 2024",
        bgColor: "#009688",
        content: "After doing some research I decided to use Alpha One to do a full PPF wrap on my new Grenadier. The end result was incredible and the service throughout was top notch. Highly recommend reaching out to these guys for your next project!",
    },
    {
        name: "Rathan Reddy",
        date: "January 31, 2024",
        bgColor: "#3F51B5",
        content: "Fantastic experience working with the whole crew at Alpha One Motors, particularly Wes Tindel! Entire process was painless. Detailed and thorough representation of the car. Shop inventory is seriously impressive. Can't speak more highly about these guys.",
    },
    {
        name: "James Hensley",
        date: "January 31, 2024",
        bgColor: "#4CAF50",
        content: "Had a great buying experience at Alpha One Motors. Got my dream car I had always wanted. Got a great deal on my trade and value price on this beautiful SL63 AMG. Thanks to Tim and Dave for all their help. If you are looking for a luxury or top end car these guys are you place to buy. Thanks again Tim. We appreciate your help in acquiring this dream.",
    },
    {
        name: "Derek Guilbeau",
        date: "January 31, 2024",
        bgColor: "#2196F3",
        content: "Timothy Ewald & Shealea with Alpha One Motors made it easy to work with them when buying my Lamborghini unseen. I was an out of state buyer. They sent me videos and even FaceTime me to see the vehicle. Thanks for great customer service and shipping my vehicle to me.",
    },
    {
        name: "Robert Grimm",
        date: "January 31, 2024",
        bgColor: "#9C27B0",
        content: "I can't say enough about the staff here making it a great place to find your next super or luxury car. I didn't feel pressured to buy. Tim seemed just as excited to show me all their toys as I was to see them. He is just a great guy. Alpha One's prices are absolutely fair. Their prices are normally listed as fair to excellent on Car Gurus. So, you know you're not over spending.",
    },
];

const WhyUsReviews = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        autoplay: false,
        adaptiveHeight: true,
        mobileFirst: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: false,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false,
                },
            },
        ],
    };

    return (
        <section className="customer-served-wrap cv-auto">
            <div className="container">
                <div className="fading xl-title text-uppercase mb-2">
                    Don&apos;t Take our Word for it!
                </div>
                <div className="fading lg-title fw-normal text-center font-40 mb-5 text-uppercase">
                    See what our Customers Have to Say!
                </div>
                <div className="mt-70 fading">
                    <Slider {...settings} className="wbecs-slider">
                        {reviewsList.map((review, index) => (
                            <div key={index}>
                                <div className="wbe-cs-box">
                                    <div className="flex items-center justify-content-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className="fading wbe-cs-circle" style={{ backgroundColor: review.bgColor }}>
                                                {review.name?.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="fading pl-3">
                                                <div className="xs-title font-bold text-black helveticaneue">{review.name}</div>
                                            </div>
                                        </div>
                                        <div className="fading g-icon">
                                            <Image src={getImages('icon.svg')} alt="Google" width={48} height={48} />
                                        </div>
                                    </div>
                                    <div className="flex gap-1 wbe-cs-rating mb-2">
                                        <Image className="fading inline-block star-icon" src={getImages('star.svg')} alt="star" width={24} height={22} />
                                        <Image className="fading inline-block star-icon" src={getImages('star.svg')} alt="star" width={24} height={22} />
                                        <Image className="fading inline-block star-icon" src={getImages('star.svg')} alt="star" width={24} height={22} />
                                        <Image className="fading inline-block star-icon" src={getImages('star.svg')} alt="star" width={24} height={22} />
                                        <Image className="fading inline-block star-icon" src={getImages('star.svg')} alt="star" width={24} height={22} />
                                        <Image className="fading inline-block verify-icon ml-2" src={getImages('ti-verified.svg')} alt="verified" width={16} height={16} />
                                    </div>
                                    <div className="mb-1 wbe-cs-content">
                                        <p>{review.content}</p>
                                    </div>
                                    <div>
                                        <a href="https://share.google/erYHCMlUwduOzew3b" target="_blank" rel="noopener noreferrer" className="wbe-read-more">
                                            Read more
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
                <div className="fading text-center mt-75">
                    <a href="https://share.google/erYHCMlUwduOzew3b" target="_blank" rel="noopener noreferrer" className="black-btn get-started-btn font-bold uppercase w-330 inline-block lg-btn">
                        Read Reviews
                    </a>
                </div>
            </div>
        </section>
    );
};

export default WhyUsReviews;
