import React, { useState } from 'react';
import { supabaseFunctions } from '../api/supabaseClient';
import { File, X } from 'lucide-react'; // Import icons for better UI

// Reusable components
const FormSection = ({ title, bgColor, textColor, borderColor, children }) => (
    <div className={`w-full max-w-4xl ${bgColor} ${textColor} p-8 md:p-10 rounded-lg shadow-lg mb-8`}>
        <h2 className={`text-3xl font-bold border-b-4 ${borderColor} pb-2 mb-8`}>{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
    </div>
);

const InputField = ({ label, type = 'text', placeholder, span = 'md:col-span-1', value, onChange, name, required = false }) => (
    <div className={span}>
        <label className="block text-sm font-bold mb-2">{label}</label>
        <input
            type={type}
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 text-base leading-tight focus:outline-none focus:shadow-outline"
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
        />
    </div>
);

// FIX: Updated FileInput to show the selected file's name and a clear button
const FileInput = ({ label, span = 'md:col-span-2', name, onChange, fileName, onClear }) => (
    <div className={span}>
        <label className="block text-sm font-bold mb-2">{label}</label>
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-400 px-6 py-10 bg-white">
            {fileName ? (
                <div className="text-center">
                    <File className="mx-auto h-12 w-12 text-gray-600" />
                    <p className="mt-2 text-sm font-semibold text-gray-800">{fileName}</p>
                    <p className="text-xs text-gray-500">File selected</p>
                    <button 
                        type="button" 
                        onClick={() => onClear(name)} 
                        className="mt-2 text-xs text-red-500 hover:text-red-700 font-semibold"
                    >
                        Remove
                    </button>
                </div>
            ) : (
                <div className="text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label htmlFor={name} className="relative cursor-pointer rounded-md bg-white font-semibold text-angat-blue focus-within:outline-none focus-within:ring-2 focus-within:ring-angat-blue focus-within:ring-offset-2 hover:text-angat-pink">
                            <span>Upload a file</span>
                            <input id={name} name={name} type="file" className="sr-only" onChange={onChange} />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">PDF, DOCX, PNG, JPG up to 10MB</p>
                </div>
            )}
        </div>
    </div>
);


export default function RegisterPage({ onNavigate }) {
    const [formData, setFormData] = useState({
        user_email: '',
        user_password: '',
        passwordConfirm: '',
        organization_name: '',
        organization_address: '',
        organization_mission: '',
        organization_contact_person_fullname: '',
        organization_contact_person_position: '',
        organization_contact_person_number: '',
    });
    const [files, setFiles] = useState({
        mission_statement_file: null,
        past_projects_file: null,
        future_plans_file: null,
        legal_documents_file: null,
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleFileChange = (e) => {
        const { name, files: selectedFiles } = e.target;
        if (selectedFiles.length > 0) {
            setFiles(prevState => ({ ...prevState, [name]: selectedFiles[0] }));
        }
    };

    // FIX: Added a function to clear a specific file from state
    const handleClearFile = (fileName) => {
        setFiles(prevState => ({ ...prevState, [fileName]: null }));
        // Also clear the file input visually
        document.getElementById(fileName).value = "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (formData.user_password !== formData.passwordConfirm) {
            setError("Passwords do not match.");
            return;
        }
        setLoading(true);

        const submissionData = new FormData();
        for (const key in formData) {
            submissionData.append(key, formData[key]);
        }
        for (const key in files) {
            if (files[key]) {
                submissionData.append(key, files[key]); // Use the key directly as the field name
            }
        }
        
        try {
            const { data } = await supabaseFunctions.post('/organization/request-registration', submissionData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            console.log('Registration request successful:', data);
            setSuccess('Registration request sent successfully! Please wait for admin approval.');
        } catch (err) {
            console.error('Registration error:', err.response ? err.response.data : err.message);
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-50 flex flex-col items-center px-4 py-12 min-h-[calc(100vh-5rem)]">
            <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
                <FormSection title="Have a partnership with us today!" bgColor="bg-angat-blue" textColor="text-white" borderColor="border-angat-pink">
                    <InputField label="Email" type="email" name="user_email" value={formData.user_email} onChange={handleChange} placeholder="you@example.com" required />
                    <InputField label="Password" type="password" name="user_password" value={formData.user_password} onChange={handleChange} placeholder="******************" required />
                    <InputField label="Re-enter Password" type="password" name="passwordConfirm" value={formData.passwordConfirm} onChange={handleChange} placeholder="******************" required />
                </FormSection>

                <FormSection title="Organization Information" bgColor="bg-sidebar-light" textColor="text-gray-800" borderColor="border-sidebar-lighter">
                    <InputField label="Organization Name" name="organization_name" value={formData.organization_name} onChange={handleChange} placeholder="Your Organization Inc." required />
                    <InputField label="Address" name="organization_address" value={formData.organization_address} onChange={handleChange} placeholder="123 Example St, City" required />
                    <div className="md:col-span-2">
                        <label className="block text-sm font-bold mb-2">Mission Statement</label>
                        <textarea rows="6" className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 text-base leading-tight focus:outline-none focus:shadow-outline" placeholder="Describe your organization's mission..." name="organization_mission" value={formData.organization_mission} onChange={handleChange}></textarea>
                        <p className="text-center my-4">OR</p>
                        <FileInput label="Attach Mission Statement File" name="mission_statement_file" onChange={handleFileChange} fileName={files.mission_statement_file?.name} onClear={handleClearFile} />
                    </div>
                </FormSection>

                <FormSection title="Contact Person Details" bgColor="bg-angat-blue" textColor="text-white" borderColor="border-angat-pink">
                    <InputField label="Full Name" name="organization_contact_person_fullname" value={formData.organization_contact_person_fullname} onChange={handleChange} placeholder="Juan dela Cruz" required />
                    <InputField label="Position in Organization" name="organization_contact_person_position" value={formData.organization_contact_person_position} onChange={handleChange} placeholder="Project Manager" required />
                    <InputField label="Contact Number" type="tel" name="organization_contact_person_number" value={formData.organization_contact_person_number} onChange={handleChange} placeholder="09171234567" required />
                </FormSection>

                <FormSection title="History of Past Projects" bgColor="bg-sidebar-light" textColor="text-gray-800" borderColor="border-sidebar-lighter">
                    <FileInput label="Attach a summary or portfolio of past projects." name="past_projects_file" onChange={handleFileChange} fileName={files.past_projects_file?.name} onClear={handleClearFile}/>
                </FormSection>

                <FormSection title="Future Plans" bgColor="bg-angat-blue" textColor="text-white" borderColor="border-angat-pink">
                    <FileInput label="Attach a document outlining your future plans or proposals." name="future_plans_file" onChange={handleFileChange} fileName={files.future_plans_file?.name} onClear={handleClearFile}/>
                </FormSection>

                <FormSection title="Legal Documents" bgColor="bg-sidebar-light" textColor="text-gray-800" borderColor="border-sidebar-lighter">
                    <FileInput label="Attach SEC Registration, BIR Certificate, etc." name="legal_documents_file" onChange={handleFileChange} fileName={files.legal_documents_file?.name} onClear={handleClearFile}/>
                </FormSection>
                
                {error && <p className="text-red-500 text-center text-lg mb-4">{error}</p>}
                {success && <p className="text-green-500 text-center text-lg mb-4">{success}</p>}

                <div className="w-full max-w-4xl mt-4">
                    <button
                        className="bg-angat-pink text-white font-bold py-3 px-6 text-lg rounded-full w-full hover:opacity-90 transition-opacity duration-300 disabled:opacity-50"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Register'}
                    </button>
                </div>
            </form>
        </div>
    );
}