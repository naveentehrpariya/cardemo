import { useContext, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import dynamic from 'next/dynamic';
const ReCAPTCHA = dynamic(() => import('react-google-recaptcha'), { ssr: false });
import { VehicleContext } from '../../context/VehicleContext';
import { useRouter } from 'next/router';
import { getImages } from '../Common/const';

const makes = [
  { name: 'Toyota', models: ['Corolla', 'Camry', 'RAV4'] },
  { name: 'Honda', models: ['Civic', 'Accord', 'CR-V'] },
  { name: 'Ford', models: ['F-150', 'Mustang', 'Escape'] }
];

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone is required'),
  year: Yup.string().required('Year is required'),
  make: Yup.string().required('Make is required'),
  model: Yup.string().required('Model is required'),
  comments: Yup.string(),
  g_recaptcha_response: Yup.string().required('Please complete reCAPTCHA')
});

const VehicleConsignmentInquiry = ({ close }) => {
  const router = useRouter();
  const { submitContactForm } = useContext(VehicleContext);
  const recaptchaRef = useRef(null);
  return (
    <div className="!mt-[10vh] max-w-[1000px] !rounded-2xl modal-content max-h-[80vh] overflow-auto m-auto">
      <div className="modal-header">
        <h1 className="modal-title filter-modal-title">Vehicle Consignment Inquiry</h1>
        <button className="sm-box-close" type="button" onClick={close}>
          <img src={getImages('white-close.svg')} alt="Close" />
        </button>
      </div>
      <div className="modal-body !p-6">
        <div className="lg-title text-center text-black fw-400 pt-3 pb-4">Vehicle Consignment Inquiry</div>
        <div className="vci-box custom-form">
          <Formik
            initialValues={{ fullName: '', email: '', phone: '', year: '', make: '', model: '', comments: '', g_recaptcha_response: '' }}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm }) => {
              try {
                const [first_name, ...rest] = (values.fullName || '').trim().split(' ');
                const last_name = rest.join(' ');
                const payload = {
                  first_name: first_name || '',
                  last_name: last_name || '',
                  phone: values.phone,
                  email: values.email,
                  comments: values.comments,
                  g_recaptcha_response: values.g_recaptcha_response,
                  vehicle: [values.year, values.make, values.model].filter(Boolean).join(' '),
                  subject: 'Vehicle Consignment Inquiry'
                };

                const data = await submitContactForm(payload);
                console.log('VCI payload', payload);
                console.log('VCI response', data);
                if (data && data.success) {
                  resetForm();
                  if (recaptchaRef.current && typeof recaptchaRef.current.reset === 'function') {
                    recaptchaRef.current.reset();
                  }
                  close();
                  router.push('/thank-you');
                } else {
                  const msg = (data && (data.error || data.message)) ? (data.error || data.message) : 'There was a problem with your submission';
                  alert(msg);
                }
              } catch (err) {
                console.error('VCI submit error', err);
                alert('There was a problem with your submission');
              }
            }}
          >
            {({ values, setFieldValue }) => (
              <Form className="row">
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label>Full Name<span className="text-danger">*</span></label>
                    <Field type="text" name="fullName" className="form-control" />
                    <ErrorMessage name="fullName" component="div" className="text-error text-danger" />
                  </div>
                  <div className="form-group mb-3">
                    <label>Email<span className="text-danger">*</span></label>
                    <Field type="text" name="email" className="form-control" />
                    <ErrorMessage name="email" component="div" className="text-error text-danger" />
                  </div>
                  <div className="form-group mb-3">
                    <label>Phone<span className="text-danger">*</span></label>
                    <Field type="text" name="phone" className="form-control" />
                    <ErrorMessage name="phone" component="div" className="text-error text-danger" />
                  </div>
                  <div className="form-group mb-3">
                    <label>Year<span className="text-danger">*</span></label>
                    <Field as="select" name="year" className="form-control">
                      <option value="">Select Year</option>
                      {[2022, 2023, 2024, 2025].map((year) => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="year" component="div" className="text-error text-danger" />
                  </div>
                  <div className="form-group mb-3">
                    <label>Make<span className="text-danger">*</span></label>
                    <Field
                      as="select"
                      name="make"
                      className="form-control"
                      onChange={(e) => {
                        setFieldValue('make', e.target.value);
                        setFieldValue('model', '');
                      }}
                    >
                      <option value="">Select Make</option>
                      {makes.map((make, index) => (
                        <option key={index} value={make.name}>{make.name}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="make" component="div" className="text-error text-danger" />
                  </div>
                  <div className="form-group mb-3">
                    <label>Model<span className="text-danger">*</span></label>
                    <Field as="select" name="model" className="form-control">
                      <option value="">Select Model</option>
                      {makes.find((m) => m.name === values.make)?.models.map((model, index) => (
                        <option key={index} value={model}>{model}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="model" component="div" className="text-error text-danger" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group h-100 mb-3">
                    <label>Comments</label>
                    <Field as="textarea" name="comments" className="form-control" />
                  </div>
                </div>
                <div className="col-12 text-center mb-3">
                  <ReCAPTCHA 
                    ref={recaptchaRef} 
                    sitekey="6LfCa-srAAAAADUg9n4Myr1K_n2iOzduQAO6ZffA" 
                    onChange={(val) => setFieldValue('g_recaptcha_response', val || '')}
                  />
                  <ErrorMessage name="g_recaptcha_response" component="div" className="text-error text-danger mt-2" />
                </div>
                <div className="col-12 text-center mt-3">
                  <button type="submit" className="black-btn w-240" disabled={!values.g_recaptcha_response}>SEND</button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default VehicleConsignmentInquiry;
