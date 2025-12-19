import { useContext, useState, useRef, lazy } from 'react';
import { Field, FieldArray, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { VehicleContext } from '../../../context/VehicleContext';
import { useRouter } from 'next/router';
import ValidationError from '../../Errors/ValidationError';
import Image from 'next/image';
import { getImages } from '../const';

const ReCAPTCHA = lazy(() => import('react-google-recaptcha'));

const validationSchemaStep1 = Yup.object({
    full_name: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
});

const validationSchemaStep2 = Yup.object({
    mileage: Yup.string().required('Mileage is required'),
    photo: Yup.string(),
    comments: Yup.string(),
});

const GetQuoteModal = ({ close, selectedValue }) => {
    const { submitContactForm, uploadDocument } = useContext(VehicleContext);
    const recaptchaRef = useRef();
    const router = useRouter();
    const formikRef = useRef(null);

    const [step, setStep] = useState(1);
    const initialValues = {
        full_name: '',
        email: '',
        phone: '',
        mileage: '',
        comments: '',
        photos: []
    };

    const handleNext = async (validateForm, setTouched) => {
        const errors = await validateForm();
        if (Object.keys(errors).length === 0) {
            setStep(step + 1);
        } else {
            setTouched({
                full_name: true,
                email: true,
                phone: true,
            });
        }
    };

    const [selectedImages, setSelectedImages] = useState([]);
    
    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        const newImages = files.map(file => URL.createObjectURL(file));
        setSelectedImages(prevImages => [...prevImages, ...newImages]);
        uploadFiles(event.target.files);
    };
    
    const handleDrop = (event) => {
        event.preventDefault();
        const files = Array.from(event.dataTransfer.files);
        const newImages = files.map(file => URL.createObjectURL(file));
        setSelectedImages(prevImages => [...prevImages, ...newImages]);
        uploadFiles(event.dataTransfer.files);
    };

    const uploadFiles = (files) => {
        Array.from(files).map((v, i) => {
            uploadFile(v);
        });
    }

    const uploadFile = (file) => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('folder', 'userappraisals/');
            formData.append('fileName', file.name);

            const upload = uploadDocument(formData);
            upload.then((data) => {
                if (data.url && data.data && data.data.key) {
                    formikRef.current.setFieldValue("photos", [...formikRef.current.values.photos, data.url]);
                } else if (data.error) alert(data.error);
            });
        }
    }

    const closeHandler = () => {
        close();
        setStep(1);
    }

    return (
        <>
            <div className="modal-content !mt-[10vh]">
                <div className="modal-header">
                    <h1 className="modal-title filter-modal-title">
                        GET YOUR QUOTE TODAY
                    </h1>
                    <button className="sm-box-close" type="button" onClick={closeHandler}>
                        <Image src={getImages('white-close.svg')} alt="close" width={24} height={24} />
                    </button>
                </div>
                <div className="modal-body px-5 py-5">
                    <div className="sm-title text-center text-white mb-2">On Your</div>
                    <div className="md-title text-center mb-4">{selectedValue}</div>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={step === 1 ? validationSchemaStep1 : validationSchemaStep2}
                        innerRef={formikRef}
                        onSubmit={async (values, { resetForm }) => {
                            const token = await recaptchaRef.current.executeAsync();
                            recaptchaRef.current.reset();
                            values.token = token || '';
                            values = { ...values, vehicle: selectedValue };
                            
                            const data = await submitContactForm(values);
                            if (data.success) {
                                resetForm();
                                setSelectedImages("");
                                setStep(1);
                                router.push("/thank-you");
                                close();
                            } else {
                                alert("There was a problem with your submission");
                            }
                        }}
                    >
                        {({ values, validateForm, setTouched, setFieldValue }) => (
                            <Form className="custom-form custom-style2 get-quote-form" autoComplete="off">
                                <ReCAPTCHA
                                    ref={recaptchaRef}
                                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"}
                                    size="invisible"
                                />
                                <FieldArray type="hidden" name="photos" value={values.photos} />
                                {step === 1 && (
                                    <div className="getquotesetp1">
                                        <div className="form-group">
                                            <div className="cs-label mb-2">Full Name <span className="text-danger font-15">*</span></div>
                                            <Field name="full_name" className="form-control" />
                                            <ValidationError name="full_name" />
                                        </div>
                                        <div className="form-group">
                                            <div className="cs-label mb-2">Email <span className="text-danger font-15">*</span></div>
                                            <Field name="email" className="form-control" />
                                            <ValidationError name="email" />
                                        </div>
                                        <div className="form-group">
                                            <div className="cs-label mb-2">Phone Number <span className="text-danger font-15">*</span></div>
                                            <Field name="phone" className="form-control" />
                                            <ValidationError name="phone" />
                                        </div>
                                        <button
                                            type="button"
                                            className="white-btn text-uppercase py-3 w-100 mt-3"
                                            onClick={() => handleNext(validateForm, setTouched)}
                                        >
                                            Continue
                                        </button>
                                    </div>
                                )}

                                {step === 2 && (
                                    <div className="getquotesetp2">
                                        <div className="form-group">
                                            <div className="cs-label mb-2">Mileage <span className="text-danger font-15">*</span></div>
                                            <Field name="mileage" className="form-control" />
                                            <ValidationError name="mileage" />
                                        </div>
                                        <div className="form-group">
                                            <div className="cs-label mb-2">General Condition & Comments</div>
                                            <Field as="textarea" name="comments" className="form-control" />
                                        </div>
                                        <div className="form-group"
                                            onDragOver={(e) => e.preventDefault()}
                                            onDrop={handleDrop}
                                        >
                                            <div className="d-flex align-items-center justify-content-between mb-2">
                                                {selectedImages.length > 0 ?
                                                    <div className="cs-label text-uppercase">You Have uploaded <span className="text-danger">{selectedImages.length}</span> photos</div> :
                                                    <div className="cs-label text-uppercase">Upload a photo of your vehicle</div>
                                                }
                                                <div className="cs-label opacity-50">(Optional)</div>
                                            </div>
                                            <input
                                                id="fileUpload"
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                hidden
                                                onChange={handleImageChange}
                                            />
                                            <label htmlFor="fileUpload" className="custom-file-upload">
                                                <span className="camera-icon"></span> Choose File
                                            </label>
                                        </div>
                                        <button type="submit" className="white-btn text-uppercase py-3 w-100 mt-3">
                                            Submit
                                        </button>
                                    </div>
                                )}
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    )
}

export default GetQuoteModal;
