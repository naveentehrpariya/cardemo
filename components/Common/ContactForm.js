import { useContext, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import dynamic from 'next/dynamic';
const ReCAPTCHA = dynamic(() => import('react-google-recaptcha'), { ssr: false });
import { VehicleContext } from '../../context/VehicleContext';
import ValidationError from '../Errors/ValidationError';
import { useRouter } from 'next/router';

export default function ContactForm() {
    const router = useRouter();
    const { submitContactForm } = useContext(VehicleContext);
    const captchaRef = useRef(null);

    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            phone: '',
            email: '',
            comments: '',
            g_recaptcha_response: '',
            subject: 'Contact Us Form Submission'
        },
        validationSchema: Yup.object({
            first_name: Yup.string().required('First name is required'),
            last_name: Yup.string().required('Last name is required'),
            phone: Yup.string().required('Phone is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            comments: Yup.string().required('Message is required'),
            g_recaptcha_response: Yup.string().required('Please complete the reCAPTCHA')
        }),
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                await submitContactForm(values);
                resetForm();
                if (captchaRef.current) {
                    captchaRef.current.reset();
                }
                router.push('/thank-you');
            } catch (error) {
                console.error('Form submission error:', error);
                alert('An error occurred. Please try again.');
            } finally {
                setSubmitting(false);
            }
        },
    });

    const handleCaptchaChange = (value) => {
        formik.setFieldValue('g_recaptcha_response', value);
    };

    return (
        <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <input
                        type="text"
                        name="first_name"
                        placeholder="First Name*"
                        className="w-full px-4 py-3 bg-white border border-gray-300 focus:border-primary focus:outline-none"
                        {...formik.getFieldProps('first_name')}
                    />
                    <ValidationError name="first_name" formik={formik} />
                </div>
                <div>
                    <input
                        type="text"
                        name="last_name"
                        placeholder="Last Name*"
                        className="w-full px-4 py-3 bg-white border border-gray-300 focus:border-primary focus:outline-none"
                        {...formik.getFieldProps('last_name')}
                    />
                    <ValidationError name="last_name" formik={formik} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number*"
                        className="w-full px-4 py-3 bg-white border border-gray-300 focus:border-primary focus:outline-none"
                        {...formik.getFieldProps('phone')}
                    />
                    <ValidationError name="phone" formik={formik} />
                </div>
                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address*"
                        className="w-full px-4 py-3 bg-white border border-gray-300 focus:border-primary focus:outline-none"
                        {...formik.getFieldProps('email')}
                    />
                    <ValidationError name="email" formik={formik} />
                </div>
            </div>

            <div>
                <textarea
                    name="comments"
                    placeholder="Your Message*"
                    rows={5}
                    className="w-full px-4 py-3 bg-white border border-gray-300 focus:border-primary focus:outline-none resize-none"
                    {...formik.getFieldProps('comments')}
                />
                <ValidationError name="comments" formik={formik} />
            </div>

            <div>
                <ReCAPTCHA
                    ref={captchaRef}
                    sitekey="6LfCa-srAAAAADUg9n4Myr1K_n2iOzduQAO6ZffA"
                    onChange={handleCaptchaChange}
                />
                <ValidationError name="g_recaptcha_response" formik={formik} />
            </div>

            <button
                type="submit"
                disabled={formik.isSubmitting}
                className="black-btn w-full md:w-auto"
            >
                {formik.isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
        </form>
    );
}
