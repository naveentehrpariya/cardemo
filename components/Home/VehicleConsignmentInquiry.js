import Image from 'next/image';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

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
  comments: Yup.string()
});

const VehicleConsignmentInquiry = ({ close }) => {
  return (
    <div className="bg-white">
      <div className="bg-[#212020] px-5 py-5 flex items-center justify-between">
        <h1 className="font-eurostile text-xl font-bold text-center text-white w-full">
          Vehicle Consignment Inquiry
        </h1>
        <button className="text-white hover:opacity-80" type="button" onClick={close}>
          <Image src="/images/white-close.svg" alt="Close" width={24} height={24} />
        </button>
      </div>
      <div className="py-8 px-4 md:px-24">
        <div className="lg-title text-center text-black fw-400 pt-3 pb-4">
          Vehicle Consignment Inquiry
        </div>
        <div className="rounded-lg bg-gray-light py-11 px-6 md:px-28 custom-form">
          <Formik
            initialValues={{ fullName: '', email: '', phone: '', year: '', make: '', model: '', comments: '' }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({ values, setFieldValue }) => (
              <Form className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <div className="md:col-span-1">
                  <div className="mb-3">
                    <label>Full Name</label>
                    <Field type="text" name="fullName" className="form-control" />
                    <ErrorMessage name="fullName" component="div" className="text-error text-red-500" />
                  </div>
                  <div className="mb-3">
                    <label>Email</label>
                    <Field type="text" name="email" className="form-control" />
                    <ErrorMessage name="email" component="div" className="text-error text-red-500" />
                  </div>
                  <div className="mb-3">
                    <label>Phone</label>
                    <Field type="text" name="phone" className="form-control" />
                    <ErrorMessage name="phone" component="div" className="text-error text-red-500" />
                  </div>
                  <div className="mb-3">
                    <label>Year</label>
                    <Field as="select" name="year" className="form-control">
                      <option value="">Select Year</option>
                      {[2022, 2023, 2024, 2025].map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="year" component="div" className="text-error text-red-500" />
                  </div>
                  <div className="mb-3">
                    <label>Make</label>
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
                    <ErrorMessage name="make" component="div" className="text-error text-red-500" />
                  </div>
                  <div className="mb-3">
                    <label>Model</label>
                    <Field as="select" name="model" className="form-control">
                      <option value="">Select Model</option>
                      {makes.find(m => m.name === values.make)?.models.map((model, index) => (
                        <option key={index} value={model}>{model}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="model" component="div" className="text-error text-red-500" />
                  </div>
                </div>
                <div className="md:col-span-1">
                  <div className="h-full mb-3">
                    <label>Comments</label>
                    <Field as="textarea" name="comments" className="form-control h-[calc(100%-41px)]" />
                  </div>
                </div>
                <div className="md:col-span-2 text-center mt-4">
                  <button type="submit" className="black-btn w-240">SEND</button>
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
