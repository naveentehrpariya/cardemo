import { useFormikContext } from 'formik';

export default function ValidationError({ name, formik }) {
    // Try to get formik from context if not passed as prop
    const contextFormik = useFormikContext();
    const activeFormik = formik || contextFormik;
    
    if (!activeFormik) return null;
    
    return (
        <>
            {activeFormik.touched?.[name] && activeFormik.errors?.[name] ? (
                <div className="text-red-600 text-sm mt-1">{activeFormik.errors[name]}</div>
            ) : null}
        </>
    );
}
