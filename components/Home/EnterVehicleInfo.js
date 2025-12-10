import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const EnterVehicleInfo = ({ setOpenMoreInfotModal }) => {
  const [step, setStep] = useState(1);

  const validationSchema = Yup.object({
    // Add validation if needed
  });

  const initialValues = {
    year: '',
    make: '',
    model: '',
    trim: '',
    mileage: '',
    fullName: '',
    phone: '',
    email: '',
    zipcode: '',
    vin: '',
    desiredamount: '',
  };

  const handleSubmit = (values) => {
    if (step === 1) {
      setStep(2);
    } else {
      setOpenMoreInfotModal(true);
    }
  };

  return (
    <div className="rounded-[10px] p-[50px] pb-[100px] pt-[30px] shadow-lg  max-w-[410px]  backdrop-blur-[10px] bg-white/10  w-full">
      <div className="custom-form">
        <div className="font-eurostile text-[20px] font-[100] leading-normal tracking-normal text-black mb-4 uppercase">
          Enter Vehicle Info
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ touched, errors }) => (
            <Form>
              {step === 1 ? (
                <>
                  <div className="mb-3">
                    <Field
                      type="text"
                      name="year"
                      className="form-control !font-[100] font-euro"
                      placeholder="Vehicle Year *"
                    />
                    <ErrorMessage
                      name="year"
                      component="div"
                      className="text-error text-red-500"
                    />
                  </div>
                  <div className="mb-3">
                    <Field
                      type="text"
                      name="make"
                      className="form-control !font-[100] font-euro"
                      placeholder="Vehicle Make *"
                    />
                    <ErrorMessage
                      name="make"
                      component="div"
                      className="text-error text-red-500"
                    />
                  </div>
                  <div className="mb-3">
                    <Field
                      type="text"
                      name="model"
                      className="form-control !font-[100] font-euro"
                      placeholder="Vehicle Model *"
                    />
                    <ErrorMessage
                      name="model"
                      component="div"
                      className="text-error text-red-500"
                    />
                  </div>
                  <div className="mb-3">
                    <Field
                      type="text"
                      name="trim"
                      className="form-control !font-[100] font-euro"
                      placeholder="Vehicle Trim"
                    />
                  </div>
                  <div className="mb-3">
                    <Field
                      type="text"
                      name="mileage"
                      className="form-control !font-[100] font-euro"
                      placeholder="Estimated Mileage"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-3">
                    <Field
                      type="text"
                      name="fullname"
                      className="form-control"
                      placeholder="Full Name"
                    />
                    <ErrorMessage
                      name="fullname"
                      component="div"
                      className="text-error text-red-500"
                    />
                  </div>
                  <div className="mb-3">
                    <Field
                      type="text"
                      name="phone"
                      className="form-control"
                      placeholder="Phone number"
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-error text-red-500"
                    />
                  </div>
                  <div className="mb-3">
                    <Field
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-error text-red-500"
                    />
                  </div>
                  <div className="mb-3">
                    <Field
                      type="text"
                      name="zipcode"
                      className="form-control"
                      placeholder="Zip code"
                    />
                    <ErrorMessage
                      name="zipcode"
                      component="div"
                      className="text-error text-red-500"
                    />
                  </div>
                  <div className="mb-3">
                    <Field
                      type="text"
                      name="vin"
                      className="form-control"
                      placeholder="VIN"
                    />
                  </div>
                  <div className="mb-3">
                    <Field
                      type="text"
                      name="desiredamount"
                      className="form-control"
                      placeholder="Desired Amount"
                    />
                  </div>
                </>
              )}
              <div>
                <button type="submit" className="black-btn w-full uppercase">
                  {step === 1 ? 'Next' : 'Submit'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EnterVehicleInfo;
