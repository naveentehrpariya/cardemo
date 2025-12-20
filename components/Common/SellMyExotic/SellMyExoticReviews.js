import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { getImages } from '../../Common/const';

const Slider = dynamic(() => import('react-slick'), { ssr: false });

const reviewsList = [
    {
        name: "Eric Bramlett",
        date: "January 31, 2024",
        bgColor: "#512DA8",
        content: "When we started looking for a Landcruiser, I knew it wasn’t going to be just another car purchase. A Landcruiser is a big deal, and I wanted to make sure we found one that was in great shape and from someone we could actually trust. That’s what led us back to Alpha One. We’ve worked with them before—both buying and selling—and every single time they’ve been nothing but professional, straightforward, and easy to deal with. This time was no different.",
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
        content: "When we decided to buy our Landcruiser, we knew it was going to be a big purchase for us, so finding the right dealership was really important. From the very beginning, our experience with Alpha One felt different from other places we’ve dealt with in the past.",
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
        content: "Fantastic experience working with the whole crew at Alpha One Motors, particularly Wes Tindel! Entire process was painless. Detailed and thorough representation of the car. Shop inventory is seriously impressive. Can’t speak more highly about these guys.",
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

const SellMyExoticReviews = () => {
    const sliderRef = useRef(null);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        autoplay: false,
        arrows: true,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <section className='reviews-wrap'>
            <div className='container'>
                <div className='fading hpb-xs-title text-uppercase mb-3'>Recent</div>
                <div className='fading lg-title text-center font-40 text-uppercase mb-md-5 mb-4'>Google Reviews</div>
                <div className='fading'>
                    <Slider ref={sliderRef} {...settings} className='review-slider'>
                        {reviewsList.map((review, index) => (
                            <div className="review-item" key={index}>
                                <div className="review-box">
                                    <span className='google-icon'>
                                        <Image src={getImages('google-logo.webp')} alt='google' width={100} height={32} style={{width: 'auto', height: 'auto'}} />
                                    </span>
                                    <div className="review-mnh">
                                        <p className="clamp-4">
                                            {review.content}
                                        </p>
                                    </div>
                                    <div className="d-block align-items-end justify-content-between mt-1">
                                        <div className='cv-auto'>
                                            <div className="mb-md-3 mb-2 d-inline-flex align-items-center">
                                                {[...Array(5)].map((_, i) => (
                                                    <Image key={i} className="me-1" src={getImages("star.svg")} alt="star" width={16} height={16} />
                                                ))}
                                            </div>
                                            <div className="reviewer-name">{review.name}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    );
};

export default SellMyExoticReviews;
