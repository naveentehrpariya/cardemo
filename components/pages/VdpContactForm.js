import React from 'react';
import { Field, Form, Formik } from 'formik';
import Image from 'next/image';
import { useRouter } from 'next/router';
import ValidationError from '../Errors/ValidationError';
import { getImages } from '../Common/const';

const VdpContactForm = ({ vehicleData, submitContactForm }) => {
    const router = useRouter();

    return (
        <Formik
            // validationSchema={validationSchema}
            initialValues={{
                full_name: '',
                email: '',
                phone: '',
                comment: '',
                vin: vehicleData.stockno,
                year: vehicleData.year,
                make: vehicleData.make,
                model: vehicleData.model,
                trim: vehicleData.trim,
                mileage: vehicleData.mileage,
                exterior: vehicleData.exterior_color,
                location: vehicleData?.location || 'Boerne, TX'
            }}
            onSubmit={async (values, { resetForm }) => {
                const data = await submitContactForm(values);
                if (data.success) {
                    resetForm();
                    router.push("/thank-you");
                } else
                    alert("There was a problem with your submission");
            }}
        >
            {({ values }) => (
                <Form className="custom-form got-question-form" autoComplete="off" name="contact-form">
                    <Field type="hidden" name="vin" value={values.vin} />
                    <Field type="hidden" name="year" value={values.year} />
                    <Field type="hidden" name="make" value={values.make} />
                    <Field type="hidden" name="model" value={values.model} />
                    <Field type="hidden" name="trim" value={values.trim} />
                    <Field type="hidden" name="mileage" value={values.mileage} />
                    <Field type="hidden" name="exterior" value={values.exterior_color} />
                    <Field type="hidden" name="location" value={values.location} />
                    <div className='row'>
                        <div className='col-md-6 wow fadeInUp' data-wow-delay="0.2s">
                            <div className='form-group'>
                                <div className='d-flex align-items-center justify-content-between'>
                                    <div className='cs-label'>Full Name</div>
                                    <div className='cs-require'>* Required</div>
                                </div>
                                <Field
                                    type="text"
                                    name="full_name"
                                    className="form-control"
                                    required />
                                <ValidationError name="full_name" />
                            </div>
                            <div className='form-group'>
                                <div className='d-flex align-items-center justify-content-between'>
                                    <div className='cs-label'>Email</div>
                                    <div className='cs-require'>* Required</div>
                                </div>
                                <Field
                                    type="text"
                                    name="email"
                                    className="form-control"
                                    required />
                                <ValidationError name="email" />
                            </div>
                            <div className='form-group'>
                                <div className='cs-label'>Phone Number</div>
                                <Field
                                    type="text"
                                    name="phone"
                                    className="form-control"
                                    required />
                                <ValidationError name="phone" />
                            </div>
                        </div>
                        <div className='col-md-6 wow fadeInUp' data-wow-delay="0.4s">
                            <div className='form-group'>
                                <div className='cs-label'>Comments</div>
                                <Field
                                    type="text"
                                    name="comment"
                                    className="form-control h-218"
                                    component="textarea" />
                                <ValidationError name="comment" />
                            </div>
                        </div>
                    </div>
                    <div className='row mt-3 align-items-center about-action-flex wow fadeInUp' data-wow-delay="0.6s">
                        <div className='col-md-6 fb-contact-info'>
                            <a href='tel:5127771240' className='d-inline-flex align-items-center phone-no-text'>
                                <span className='call-icon me-3'><Image src={getImages('local-phone-material.png')} alt='call' width={24} height={24} /></span>
                                <span>(512) 777-1240</span>
                            </a>
                        </div>
                        <div className='col-md-6 text-md-end text-center'>
                            <button className='black-btn fw-700 text-uppercase d-inline-block lg-btn'>Send</button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default VdpContactForm;
