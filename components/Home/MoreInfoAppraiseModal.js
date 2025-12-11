import { useContext, useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import dynamic from 'next/dynamic';
const ReCAPTCHA = dynamic(() => import('react-google-recaptcha'), { ssr: false });
import { VehicleContext } from '../../context/VehicleContext';
import { useRouter } from 'next/router';
import { getImages } from '../Common/const';

const validationSchema = Yup.object().shape({
  condition: Yup.string().required('Condition is required'),
  fullName: Yup.string().required('Full Name is required'),
  phone: Yup.string().required('Phone is required'),
  photos: Yup.mixed().test('fileCount', 'You can upload up to 10 photos', (photos) => !photos || photos.length <= 10)
});

const MoreInfoAppraiseModal = ({ close, appraisalContactInfo, outerFormikRef }) => {
  const router = useRouter();
  const { submitContactForm, uploadDocument } = useContext(VehicleContext);
  const recaptchaRef = useRef(null);
  const formikRef = useRef(null);
  const [uploadError, setUploadError] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);

  const handleFileUpload = (event, setFieldValue, values) => {
    const newFiles = Array.from(event.target.files);
    const existingFiles = values.photos.map(file => file.name);
    const uniqueFiles = newFiles.filter(file => !existingFiles.includes(file.name));
    if (values.photos.length + uniqueFiles.length > 10) {
      setUploadError('You can upload up to 10 photos');
      return;
    }
    setUploadError('');
    setFieldValue('photos', [...values.photos, ...uniqueFiles]);
  };

  const handleImageChange = (event, setFieldValue) => {
    const files = Array.from(event.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setSelectedImages(prev => [...prev, ...newImages]);
    uploadFiles(event.target.files);
  };

  const handleDrop = (event, setFieldValue) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setSelectedImages(prev => [...prev, ...newImages]);
    uploadFiles(event.dataTransfer.files);
  };

  const uploadFiles = (files) => {
    Array.from(files).map((v) => uploadFile(v));
  };

  const uploadFile = (file) => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'userappraisals/');
    formData.append('fileName', file.name);
    const upload = uploadDocument(formData);
    upload.then((data) => {
      if (data.url && data.data && data.data.key) {
        formikRef.current.setFieldValue('photos', [...formikRef.current.values.photos, data.url]);
      } else if (data.error) alert(data.error);
    });
  };

  const handleRemoveImage = (image) => {
    setSelectedImages(prev => prev.filter(img => img !== image));
  };

  return (
    <div className="modal-content border-0">
      <div className="modal-header bg-black">
        <h1 className="modal-title filter-modal-title !text-lg !text-center w-full">Thank You</h1>
        <button className="sm-box-close" type="button" onClick={close}>
          <img src={getImages('white-close.svg')} />
        </button>
      </div>
      <div className="modal-body py-4 px-120">
        <div className="lg-title text-center text-black fw-400 pt-3 pb-4">
          We need a little more info to appraise your vehicle
        </div>
        <div className="vci-box custom-form">
          <Formik
            initialValues={{
              condition: '',
              vin: '',
              fullName: '',
              phone: '',
              comments: '',
              photos: [],
              ...appraisalContactInfo
            }}
            innerRef={formikRef}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm }) => {
              const token = await recaptchaRef.current.executeAsync();
              recaptchaRef.current.reset();
              values.token = token;
              await submitContactForm(values);
              router.push('/thank-you');
              resetForm();
              outerFormikRef?.current?.resetForm();
              close();
            }}
          >
            {({ values, setFieldValue }) => (
              <Form className="row">
                <ReCAPTCHA ref={recaptchaRef} sitekey="6LfCa-srAAAAADUg9n4Myr1K_n2iOzduQAO6ZffA" size="invisible" />
                <FieldArray type="hidden" name="photos" value={values.photos} />
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label>Condition<span className="text-danger">*</span></label>
                    <Field as="select" name="condition" className="form-control">
                      <option value="">Select Condition</option>
                      <option value="Good">Good</option>
                      <option value="Great">Great</option>
                      <option value="Excellent">Excellent</option>
                    </Field>
                    <ErrorMessage name="condition" component="div" className="text-error text-danger" />
                  </div>
                  <div className="form-group mb-3">
                    <div className="d-flex justify-content-between">
                      <label>VIN Number</label>
                      <div className="text-gray font-12 opacity-0-7">Optional</div>
                    </div>
                    <div className="position-relative">
                      <Field type="text" name="vin" className="form-control pe-5" />
                      <span className="check-icon"></span>
                    </div>
                    <ErrorMessage name="vin" component="div" className="text-error text-danger" />
                  </div>
                  <div className="form-group mb-3">
                    <label>Full Name<span className="text-danger">*</span></label>
                    <Field type="text" name="fullName" className="form-control" />
                    <ErrorMessage name="fullName" component="div" className="text-error text-danger" />
                  </div>
                  <div className="form-group mb-3">
                    <label>Phone<span className="text-danger">*</span></label>
                    <Field type="text" name="phone" className="form-control" />
                    <ErrorMessage name="phone" component="div" className="text-error text-danger" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label>&nbsp;</label>
                    <div className="upload-box" onDragOver={(e) => e.preventDefault()} onDrop={(event) => handleDrop(event, setFieldValue)}>
                      <div className="sm-title text-center mb-3 text-black">Upload Vehicle Photos</div>
                      <div className="text-center my-3 flex justify-content-center">
                        <img src={getImages('icon-upload.png')} />
                      </div>
                      <div className="text-gray font-18 text-center">Drag and Drop your files or</div>
                      <div className="black-btn upload-btn d-flex justify-content-center mt-4">
                        <img src={getImages('icon-photo.png')} /> Browse 
                        <input type="file" multiple onChange={(event) => handleImageChange(event, setFieldValue)} />
                      </div>
                      <div className="text-gray font-12 text-center mt-2">You can upload up to 10 photos</div>
                      {selectedImages.length > 0 && (
                        <ul className="d-flex flex-wrap files-list">
                          {selectedImages.map((image, index) => (
                            <li key={index}>
                              <div className="file-image">
                                <img src={image} alt={`preview-${index}`} style={{ cursor: 'pointer' }} />
                                <button className="file-delete-icon" type="button" onClick={() => handleRemoveImage(image)}>x</button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                      {uploadError && <div className="text-error text-danger font-12 text-center mt-2">{uploadError}</div>}
                      <ErrorMessage name="photos" component="div" className="text-error text-danger font-12 text-center mt-2" />
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <label>Comments</label>
                    <Field as="textarea" name="comments" className="form-control h-140" />
                  </div>
                </div>
                <div className="col-12 text-center mt-4">
                  <button type="submit" className="black-btn w-240">Get Appraisal</button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default MoreInfoAppraiseModal;
