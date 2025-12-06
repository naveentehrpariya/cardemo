import Image from 'next/image';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  // Add validation if needed
});

const MoreInfoAppraiseModal = ({ close }) => {
  const handleFileUpload = (event, setFieldValue) => {
    const files = event.target.files;
    setFieldValue('files', files);
  };

  const handleDrop = (event, setFieldValue) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    setFieldValue('files', files);
  };

  return (
    <div className="bg-white">
      <div className="bg-[#212020] px-5 py-5 flex items-center justify-between">
        <h1 className="font-eurostile text-xl font-bold text-center text-white w-full">
          Thank You
        </h1>
        <button className="text-white hover:opacity-80" type="button" onClick={close}>
          <Image src="/images/white-close.svg" alt="Close" width={24} height={24} />
        </button>
      </div>
      <div className="py-8 px-4 md:px-24">
        <div className="lg-title text-center text-black fw-400 pt-3 pb-4">
          We need a little more info to appraise your vehicle
        </div>
        <div className="rounded-lg bg-gray-light py-11 px-6 md:px-28 custom-form">
          <Formik
            initialValues={{ condition: '', vin: '', fullName: '', phone: '', comments: '', files: [] }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              console.log(values);
              resetForm();
              close();
            }}
          >
            {({ values, setFieldValue }) => (
              <Form className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <div className="md:col-span-1">
                  <div className="mb-3">
                    <label>Condition</label>
                    <Field as="select" name="condition" className="form-control">
                      <option value="">Select Condition</option>
                      {['Good'].map(item => (
                        <option key={item} value={item}>{item}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="condition" component="div" className="text-error text-red-500" />
                  </div>
                  <div className="mb-3">
                    <label>VIN Number</label>
                    <Field type="text" name="vin" className="form-control" />
                    <ErrorMessage name="vin" component="div" className="text-error text-red-500" />
                  </div>
                  <div className="mb-3">
                    <label>Full Name</label>
                    <Field type="text" name="fullName" className="form-control" />
                    <ErrorMessage name="fullName" component="div" className="text-error text-red-500" />
                  </div>
                  <div className="mb-3">
                    <label>Phone</label>
                    <Field type="text" name="phone" className="form-control" />
                    <ErrorMessage name="phone" component="div" className="text-error text-red-500" />
                  </div>
                </div>
                <div className="md:col-span-1">
                  <div className="mb-3">
                    <label>&nbsp;</label>
                    <div
                      className="px-5 py-8 rounded border-2 border-dashed border-gray-300 bg-white text-center"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => handleDrop(e, setFieldValue)}
                    >
                      <div className="sm-title text-center mb-3 text-black">Upload Vehicle Photos</div>
                      <div className="text-center my-3">
                        <Image src="/images/icon-upload.png" alt="Upload" width={48} height={48} />
                      </div>
                      <div className="text-gray font-18 text-center">Drag and Drop your files or</div>
                      <div className="relative inline-block mt-4">
                        <button
                          type="button"
                          className="black-btn flex items-center gap-2"
                        >
                          <Image src="/images/icon-photo.png" alt="Photo" width={20} height={20} />
                          <span>Browse</span>
                        </button>
                        <input
                          type="file"
                          multiple
                          onChange={(e) => handleFileUpload(e, setFieldValue)}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                      <div className="text-gray font-12 text-center mt-2">
                        You can upload up to 10 photos
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <div className="mb-3">
                    <label>Comments</label>
                    <Field as="textarea" name="comments" className="form-control h-140" />
                  </div>
                </div>
                <div className="md:col-span-2 text-center mt-4">
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
