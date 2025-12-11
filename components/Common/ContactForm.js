import { useContext, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import dynamic from 'next/dynamic';
const ReCAPTCHA = dynamic(() => import('react-google-recaptcha'), { ssr: false });
import { VehicleContext } from '../../context/VehicleContext';
import { useRouter } from 'next/router';

export default function ContactForm() {
    const router = useRouter();
    const { submitContactForm } = useContext(VehicleContext);
    const recaptchaRef = useRef(null);

    const validationSchema = Yup.object().shape({
        full_name: Yup.string().required('Full Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        phone: Yup.string().required('Phone number is required'),
        comment: Yup.string().max(500, 'Comments cannot exceed 500 characters'),
        g_recaptcha_response: Yup.string().required('Please complete reCAPTCHA')
    });

    return (
        <Formik
            initialValues={{ full_name: '', email: '', phone: '', comment: '', g_recaptcha_response: '', subject: 'Contact Us Form Submission' }}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm }) => {
                try {
                    const payload = {
                        ...values,
                        token: values.g_recaptcha_response,
                        g_recaptcha_response: values.g_recaptcha_response
                    };
                    if (recaptchaRef.current && typeof recaptchaRef.current.reset === 'function') {
                        recaptchaRef.current.reset();
                    }
                    const data = await submitContactForm(payload);
                    if (data && data.success) {
                        resetForm();
                        router.push('/thank-you');
                    } else {
                        const msg = (data && (data.error || data.message)) ? (data.error || data.message) : 'There was a problem with your submission';
                        alert(msg);
                    }
                } catch (error) {
                    console.error('Form submission error:', error);
                    alert('An error occurred. Please try again.');
                }
            }}
        >
            {({ handleSubmit, values, setFieldValue }) => (
                <Form className="custom-form contact-form" autoComplete="off" name="contact-form" onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <div className='cs-label'>Full Name <span className='text-danger font-15'>*</span></div>
                        <Field type='text' name='full_name' className='form-control' />
                        <ErrorMessage name='full_name' component='div' className='text-error text-danger' />
                    </div>
                    <div className='form-group'>
                        <div className='cs-label'>Email <span className='text-danger font-15'>*</span></div>
                        <Field type='email' name='email' className='form-control' />
                        <ErrorMessage name='email' component='div' className='text-error text-danger' />
                    </div>
                    <div className='form-group'>
                        <div className='cs-label'>Phone <span className='text-danger font-15'>*</span></div>
                        <Field type='tel' name='phone' className='form-control' />
                        <ErrorMessage name='phone' component='div' className='text-error text-danger' />
                    </div>
                    <div className='form-group'>
                        <div className='cs-label'>Message</div>
                        <Field as='textarea' name='comment' rows='5' className='form-control' />
                        <ErrorMessage name='comment' component='div' className='text-error text-danger' />
                    </div>

                    <div className='mb-3 text-center'>
                        <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                            onChange={(val) => setFieldValue('g_recaptcha_response', val || '')}
                            onExpired={() => setFieldValue('g_recaptcha_response', '')}
                        />
                        <ErrorMessage name="g_recaptcha_response" component="div" className="text-error text-danger mt-2" />
                    </div>

                    <button type='submit' className='black-btn w-240' disabled={!values.g_recaptcha_response}>Send Message</button>
                </Form>
            )}
        </Formik>
    );
}
