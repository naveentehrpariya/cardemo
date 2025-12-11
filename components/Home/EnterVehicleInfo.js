import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const EnterVehicleInfo = ({ setOpenMoreInfoModal, setAppraisalContactInfo, formikRef }) => {
  const [step, setStep] = useState(1);

  const getValidationSchema = (currentStep) => {
    return Yup.object().shape({
      year: Yup.string().required('Vehicle Year is required'),
      make: Yup.string().required('Vehicle Make is required'),
      model: Yup.string().required('Vehicle Model is required'),
      ...(currentStep === 2 && {
        fullName: Yup.string().required('Full Name is required'),
        phone: Yup.string().required('Phone is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        zipcode: Yup.string()
          .matches(/^\d{5}$/, 'Zipcode must be exactly 5 digits')
          .required('Zipcode is required'),
      }),
    });
  };

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

  const handleNext = async (validateForm, setTouched) => {
    const errors = await validateForm();
    if (Object.keys(errors).length === 0) {
      setStep(2);
    } else {
      setTouched({
        year: true,
        make: true,
        model: true,
        trim: true,
        mileage: true,
      });
    }
  };

  return (
    <div className="rounded-[10px] !p-[50px] !pb-[70px] !pt-[30px] shadow-md  max-w-[410px]  backdrop-blur-[10px] bg-white/10  w-full">
      <div className="custom-form">
        <div className="font-eurostile text-[20px] font-[100] leading-normal tracking-normal text-black mb-4 uppercase">
          Enter Vehicle Info
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={getValidationSchema(step)}
          innerRef={formikRef}
          onSubmit={(values) => {
            setAppraisalContactInfo(values);
            setOpenMoreInfoModal(true);
            setStep(1);
          }}
        >
          {({ validateForm, setTouched }) => (
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
                      name="fullName"
                      className="form-control"
                      placeholder="Full Name*"
                    />
                    <ErrorMessage
                      name="fullName"
                      component="div"
                      className="text-error text-red-500"
                    />
                  </div>
                  <div className="mb-3">
                    <Field
                      type="text"
                      name="phone"
                      className="form-control"
                      placeholder="Phone number*"
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
                      placeholder="Email*"
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
                      placeholder="Zip code*"
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
              {step === 1 ? (
                <button
                  type="button"
                  className="black-btn w-full uppercase"
                  onClick={() => handleNext(validateForm, setTouched)}
                >
                  Next
                </button>
              ) : (
                <div className="d-flex align-item-center w-100">
                  <div className="w-50 pe-1">
                    <button
                      type="button"
                      className="black-btn w-100 uppercase"
                      onClick={() => setStep(1)}
                    >
                      Previous
                    </button>
                  </div>
                  <div className="w-50 ps-1">
                    <button type="submit" className="black-btn w-100 uppercase">
                      Submit
                    </button>
                  </div>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EnterVehicleInfo;
