import { useState, useRef, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import ValidationError from '../../Errors/ValidationError';
import * as Yup from 'yup';

// Dynamically import Algolia components only on client side
const MyVehicleForm = ({ setGetQuoteModal, setSelectedValue, sotForm }) => {
    const formikRef = useRef(null);
    const [AlgoliaComponents, setAlgoliaComponents] = useState(null);
    const [searchClient, setSearchClient] = useState(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        
        // Dynamically import Algolia modules
        Promise.all([
            import('algoliasearch/lite'),
            import('react-instantsearch')
        ]).then(([algoliaModule, instantSearchModule]) => {
            const client = algoliaModule.liteClient('E8DWRSZE4Q', '2e1db67e90eec79f4968c0073885c388');
            setSearchClient(client);
            setAlgoliaComponents({
                InstantSearch: instantSearchModule.InstantSearch,
                Hits: instantSearchModule.Hits,
                useSearchBox: instantSearchModule.useSearchBox,
                useHits: instantSearchModule.useHits
            });
        });
    }, []);

    const handleSearchClick = (hit) => {
        formikRef.current.setFieldValue("vehicle", hit.vehicle_name);
        formikRef.current.setFieldValue("year", hit.year_is);
        formikRef.current.setFieldValue("make", hit.make_ss);
        formikRef.current.setFieldValue("model", hit.model_ss);
        formikRef.current.setFieldValue("trim", hit.trim_ss);

        setGetQuoteModal(true);
        setSelectedValue(hit.vehicle_name);
        if (typeof document !== 'undefined') {
            document.body.classList.add('body-overflow');
        }
    }

    const queryHook = (query, search) => {
        search(query);
        formikRef.current.setFieldValue("vehicle", query);
    };
    
    const validationSchema = Yup.object({
        vehicle: Yup.string()
            .trim()
            .required('Please enter your vehicle info'),
    });

    // Custom SearchBox Component
    const CustomSearchBox = ({ onHitClick, queryHook }) => {
        if (!AlgoliaComponents) return null;

        const { refine, currentRefinement } = AlgoliaComponents.useSearchBox({ queryHook });
        const [isFocused, setIsFocused] = useState(false);
        const [selectedHit, setSelectedHit] = useState("");
        
        const handleFocus = () => setIsFocused(true);
        const handleBlur = (e) => {
            setTimeout(() => {
                if (!e.relatedTarget || !e.relatedTarget.classList.contains('hit')) {
                    setIsFocused(false);
                }
            }, 200);
        };
        
        const handleHitClick = (hit) => {
            setSelectedHit(hit.vehicle_name);
            refine(hit.vehicle_name);
            onHitClick(hit);
        };

        const { items } = AlgoliaComponents.useHits();

        return (
            <>
                <div className="custom-searchbox relative">
                    <input
                        type="search"
                        value={selectedHit || currentRefinement || ''}
                        onChange={event => {
                            refine(event.currentTarget.value);
                            setSelectedHit(event.currentTarget.value);
                        }}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        name="vehicle"
                        className="form-control"
                        placeholder="Year Make Model Trim or VIN"
                    />
                    {isFocused && items.length > 0 && (
                        <AlgoliaComponents.Hits hitComponent={({ hit }) => (
                            <div className="hit" onMouseDown={() => handleHitClick(hit)}>
                                <p>{hit.vehicle_name}</p>
                            </div>
                        )} />
                    )}
                </div>
            </>
        );
    };
    
    return (
        <Formik
            initialValues={{
                vehicle: '',
                year: '',
                make: '',
                model: '',
                trim: ''
            }}
            validationSchema={validationSchema}
            innerRef={formikRef}
            onSubmit={(values, { resetForm }) => {
                setGetQuoteModal(true);
                setSelectedValue(values.vehicle ?? "");
                resetForm();
                if (typeof document !== 'undefined') {
                    document.body.classList.add('body-overflow');
                }
            }}
        >
            {({ values }) => (
                <Form className={`custom-form contact-form offer-form ${!sotForm ? 'mt-70' : ''}`} autoComplete="off">
                    <Field type="hidden" name="year" value={values.year} />
                    <Field type="hidden" name="make" value={values.make} />
                    <Field type="hidden" name="model" value={values.model} />
                    <Field type="hidden" name="trim" value={values.trim} />
                    <div className="form-group">
                        <div className="cs-label mb-2">Enter your vehicle info <span className="text-danger font-15">*</span></div>
                        {!sotForm ? (
                            isClient && searchClient && AlgoliaComponents ? (
                                <AlgoliaComponents.InstantSearch indexName="taxonomy_vins" searchClient={searchClient}>
                                    <CustomSearchBox 
                                        onHitClick={handleSearchClick} 
                                        queryHook={queryHook} 
                                    />
                                </AlgoliaComponents.InstantSearch>
                            ) : (
                                <input
                                    type="text"
                                    name="vehicle"
                                    className="form-control"
                                    placeholder="Year Make Model Trim or VIN"
                                    onChange={(e) => formikRef.current?.setFieldValue("vehicle", e.target.value)}
                                />
                            )
                        ) : (
                            <div className="flex md:flex-row flex-col items-center gap-3">
                                {isClient && searchClient && AlgoliaComponents ? (
                                    <AlgoliaComponents.InstantSearch indexName="taxonomy_vins" searchClient={searchClient}>
                                        <CustomSearchBox 
                                            onHitClick={handleSearchClick} 
                                            queryHook={queryHook} 
                                        />
                                    </AlgoliaComponents.InstantSearch>
                                ) : (
                                    <input
                                        type="text"
                                        name="vehicle"
                                        className="form-control"
                                        placeholder="Year Make Model Trim or VIN"
                                        onChange={(e) => formikRef.current?.setFieldValue("vehicle", e.target.value)}
                                    />
                                )}
                                <div>
                                    <button
                                        className="sme-btn uppercase get-started-btn uppercase px-3 whitespace-nowrap"
                                        type="submit"
                                    >
                                        GET My Value
                                    </button>
                                </div>
                            </div>
                        )}
                        <ValidationError name="vehicle" formik={{ touched: {}, errors: {} }} />
                    </div>

                    {!sotForm && (
                        <div>
                            <button className="sme-btn uppercase get-started-btn w-full uppercase" type="submit">
                                GET My Value
                            </button>
                        </div>
                    )}
                </Form>
            )}
        </Formik>
    );
};

export default MyVehicleForm;
