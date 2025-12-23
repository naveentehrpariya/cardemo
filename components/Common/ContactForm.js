import { useContext, useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import dynamic from 'next/dynamic';
import { VehicleContext } from '../../context/VehicleContext';
import { useRouter } from 'next/router';

const ReCAPTCHA = dynamic(() => import('react-google-recaptcha'), { ssr: false });

export default function ContactForm() {
    const router = useRouter();
    const { submitContactForm } = useContext(VehicleContext);
    const recaptchaRef = useRef(null);
    const [loadCaptcha, setLoadCaptcha] = useState(false);

    const handleFocus = () => {
        if (!loadCaptcha) {
            setLoadCaptcha(true);
        }
    };

    const validationSchema = Yup.object().shape({
        full_name: Yup.string().required('Full Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        phone: Yup.string().required('Phone number is required'),
        comment: Yup.string().max(500, 'Comments cannot exceed 500 characters'),
        subject: Yup.string()
    });

    return (
        <Formik
            initialValues={{ full_name: '', email: '', phone: '', comment: '', g_recaptcha_response: '', subject: 'Contact Us Form Submission' }}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm, setSubmitting, setStatus }) => {
                try {
                    setStatus(null);
                    if (!loadCaptcha) {
                        setLoadCaptcha(true);
                        // Wait for captcha to load
                        await new Promise(resolve => setTimeout(resolve, 1000));
                    }
                    
                    const token = recaptchaRef.current && typeof recaptchaRef.current.executeAsync === 'function'
                        ? await recaptchaRef.current.executeAsync()
                        : (values.g_recaptcha_response || '');
                    if (!token) {
                        setStatus({ error: 'Please verify reCAPTCHA' });
                        return;
                    }
                    if (recaptchaRef.current && typeof recaptchaRef.current.reset === 'function') {
                        recaptchaRef.current.reset();
                    }
                    const payload = {
                        ...values,
                        token: token || '',
                        g_recaptcha_response: token || ''
                    };
                    const data = await submitContactForm(payload);
                    if (data && data.success) {
                        resetForm();
                        router.push('/thank-you');
                    } else {
                        const msg = (data && (data.error || data.message)) ? (data.error || data.message) : 'There was a problem with your submission';
                        setStatus({ error: msg });
                    }
                } catch (error) {
                    setStatus({ error: 'An error occurred. Please try again.' });
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            {({ handleSubmit, isSubmitting, status }) => (
                <Form className="custom-form contact-form" autoComplete="off" name="contact-form" onSubmit={handleSubmit}>
                    <div className='form-group' onFocus={handleFocus}>
                        <label htmlFor='full_name' className='cs-label'>Full Name <span className='text-danger font-15'>*</span></label>
                        <Field  id='full_name' type='text' name='full_name' className='form-control' />
                        <ErrorMessage name='full_name' component='div' className='text-error text-danger' />
                    </div>
                    <div className='form-group' onFocus={handleFocus}>
                        <label htmlFor='email' className='cs-label'>Email <span className='text-danger font-15'>*</span></label>
                        <Field  id='email' type='email' name='email' className='form-control' />
                        <ErrorMessage name='email' component='div' className='text-error text-danger' />
                    </div>
                    <div className='form-group' onFocus={handleFocus}>
                        <label htmlFor='phone' className='cs-label'>Phone <span className='text-danger font-15'>*</span></label>
                        <Field  id='phone' type='tel' name='phone' className='form-control' />
                        <ErrorMessage name='phone' component='div' className='text-error text-danger' />
                    </div>
                    <div className='form-group' onFocus={handleFocus}>
                        <label htmlFor='comment' className='cs-label'>Message</label>
                        <Field  id='comment' as='textarea' name='comment' rows='5' className='form-control' />
                        <ErrorMessage name='comment' component='div' className='text-error text-danger' />
                    </div>

                    {loadCaptcha && (
                        <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"}
                            size="invisible"
                        />
                    )}

                    {status && status.error && (
                        <div className='text-error text-danger mt-2' role='alert'>{status.error}</div>
                    )}

                    <button
                        type='submit'
                        className='black-btn get-started-btn border border-white p-3 w-100 text-uppercase d-inline-block'
                        disabled={isSubmitting}
                        aria-busy={isSubmitting ? 'true' : 'false'}
                        onFocus={handleFocus}
                        onMouseEnter={handleFocus}
                    >
                        {isSubmitting ? 'Submitting...' : 'SUBMIT'}
                    </button>
                </Form>
            )}
        </Formik>
    );
}
