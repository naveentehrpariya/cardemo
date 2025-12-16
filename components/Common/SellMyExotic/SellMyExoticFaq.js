import React, { useState } from 'react';
import Link from 'next/link';

const accordionItems = [
    {
        title: "HOW DOES IT WORK?",
        content: (
            <>
                <ul>
                    <li>1. Submit your vehicle — Tell us about your car using the short form above.</li>
                    <li>2. Get your offer — Receive a competitive valuation within hours.</li>
                    <li>3. Schedule pickup & payment — We handle everything from paperwork to transport.</li>
                </ul>
                <p>It’s that easy — a safe, transparent process designed for discerning exotic car owners.</p>
            </>
        ),
    },
    {
        title: "CAN I SELL MY EXOTIC CAR FAST & SECURELY?",
        content: (
            <>
                <p>At Alpha One Motors, we make it simple to <Link href="/" prefetch={false}>sell your exotic car</Link> — fast, fair, and with complete peace of mind.
                    Whether you’re selling a Bentley, Porsche, Ferrari, or another high-end brand, our team of exotic car buyers specializes in discreet, high-value transactions across the U.S.<br />
                    We’re not just another exotic car trader, we’re enthusiasts who understand the true value of your vehicle.
                    That’s why owners choose us when searching for the best place to sell exotic cars or the best way to sell a Porsche online.
                </p>
            </>
        ),
    },
    {
        title: "WHY DO EXOTIC CAR OWNERS CHOOSE ALPHA ONE MOTORS?",
        content: (
            <>
                <ul>
                    <li>We buy exotic cars directly — no consignment delays, no auction fees.</li>
                    <li>Instant valuations and same-day offers for qualified vehicles.</li>
                    <li>Nationwide pickup with secure enclosed transport.</li>
                    <li>Fast payment via verified bank transfer or cashier’s check.</li>
                    <li>Confidential process trusted by collectors and dealers alike.</li>
                </ul>
                <p>You can learn more about our roots and our passion for <Link href="/about-us" prefetch={false}>exotic car trading</Link>.  If you’ve ever thought, “I want to sell my Bentley” or “Where can I sell my exotic car online?” you’re in the right place. We make it effortless to sell your exotic car from the comfort of your home.</p>
            </>
        ),
    },
    {
        title: "WHAT EXOTIC & LUXURY CARS  DO WE BUY?",
        content: (
            <>
                <p>We specialize in buying and selling exotic cars, including:</p>
                <ul>
                    <li>Porsche 911, Taycan, Panamera, and Cayenne </li>
                    <li>Bentley Continental, Flying Spur, and Bentayga</li>
                    <li>Ferrari, Lamborghini, McLaren, Aston Martin, and Maserati</li>
                    <li>High-performance Mercedes-AMG, BMW M, and Audi RS vehicles</li>
                </ul>
                <p>Whether your car is nearly new or part of a private collection, we’re the trusted exotic car buyer ready to make an offer.</p>
            </>
        ),
    },
    {
        title: "READY TO GET STARTED?",
        content: (
            <>
                <p>Join hundreds of satisfied clients who chose Alpha One Motors as their preferred exotic car buyer.
Complete the quick form above and discover why we’re the best place to sell exotic cars online. Enter your vehicle above or <Link href="/contact-us" prefetch={false}> contact our exotic car buying team</Link> today.</p>
            </>
        ),
    },
];

const SellMyExoticFaq = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <section className='faqs-wrap'>
            <div className='container'>
                <div className='lg-title font-40 mb-md-5 mb-3 text-center text-uppercase'>FREQUENTLY ASKED QUESTIONS</div>
                <div className="accordion custom-accordion" id="accordionExample">
                    {accordionItems.map((item, index) => {
                        const collapseId = `collapse${index}`;
                        const headingId = `heading${index}`;
                        const isOpen = activeIndex === index;

                        return (
                            <div className="accordion-item fading" key={index}>
                                <h2 className="accordion-header   " id={headingId}>
                                    <button
                                        className={` accordion-button${isOpen ? '' : ' collapsed'} !p-3 md:!p-3 lg:!p-5 font-euro`}
                                        type="button"
                                        aria-expanded={isOpen ? 'true' : 'false'}
                                        aria-controls={collapseId}
                                        onClick={() => setActiveIndex(isOpen ? null : index)}
                                    >
                                        {item.title}
                                    </button>
                                </h2>
                                {isOpen ? (
                                    <div className="accordion-body !p-3 md:!p-3 lg:!p-5 font-euro" style={{ color: '#e1e1e1' }}>{item.content}</div>
                                ) : null}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default SellMyExoticFaq;
