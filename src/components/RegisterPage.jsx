import React from 'react';

// A reusable component for a single form section
const FormSection = ({ title, bgColor, textColor, borderColor, children }) => (
  <div className={`w-full max-w-4xl ${bgColor} ${textColor} p-8 md:p-10 rounded-lg shadow-lg mb-8`}>
    <h2 className={`text-3xl font-bold border-b-4 ${borderColor} pb-2 mb-8`}>
      {title}
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {children}
    </div>
  </div>
);

// A reusable component for a text input field
const InputField = ({ label, type = 'text', placeholder, span = 'md:col-span-1' }) => (
  <div className={span}>
    <label className="block text-sm font-bold mb-2">{label}</label>
    <input
      type={type}
      className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 text-base leading-tight focus:outline-none focus:shadow-outline"
      placeholder={placeholder}
    />
  </div>
);

// A reusable component for a file input field
const FileInput = ({ label, span = 'md:col-span-2' }) => (
    <div className={span}>
        <label className="block text-sm font-bold mb-2">{label}</label>
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-400 px-6 py-10 bg-white">
            <div className="text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-angat-blue focus-within:outline-none focus-within:ring-2 focus-within:ring-angat-blue focus-within:ring-offset-2 hover:text-angat-pink">
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">PDF, DOCX, PNG, JPG up to 10MB</p>
            </div>
        </div>
    </div>
);

export default function RegisterPage() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center pt-32 pb-16 px-4">
      
      {/* --- Section 1: Account Creation (Blue box, Pink line) --- */}
      <FormSection title="Have a partnership with us today!" bgColor="bg-angat-blue" textColor="text-white" borderColor="border-angat-pink">
        <InputField label="Email" type="email" placeholder="you@example.com" />
        <InputField label="Password" type="password" placeholder="******************" />
        <InputField label="Re-enter Password" type="password" placeholder="******************" />
      </FormSection>

      {/* --- Section 2: Organization Information (Light yellow box, Lighter yellow line) --- */}
      <FormSection title="Organization Information" bgColor="bg-sidebar-light" textColor="text-gray-800" borderColor="border-sidebar-lighter">
        <InputField label="Organization Name" placeholder="Your Organization Inc." />
        <InputField label="Address" placeholder="123 Example St, City" />
        <div className="md:col-span-2">
            <label className="block text-sm font-bold mb-2">Mission Statement</label>
            <textarea 
                rows="6"
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 text-base leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Describe your organization's mission..."
            ></textarea>
            <p className="text-center my-4">OR</p>
            <FileInput label="Attach Mission Statement File" />
        </div>
      </FormSection>

      {/* --- Section 3: Contact Person Details (Blue box, Pink line) --- */}
      <FormSection title="Contact Person Details" bgColor="bg-angat-blue" textColor="text-white" borderColor="border-angat-pink">
        <InputField label="Full Name" placeholder="Juan dela Cruz" />
        <InputField label="Position in Organization" placeholder="Project Manager" />
        <InputField label="Email" type="email" placeholder="juan.delacruz@example.com" />
        <InputField label="Contact Number" type="tel" placeholder="09171234567" />
      </FormSection>

      {/* --- Section 4: History of Past Projects (Light yellow box, Lighter yellow line) --- */}
      <FormSection title="History of Past Projects" bgColor="bg-sidebar-light" textColor="text-gray-800" borderColor="border-sidebar-lighter">
        <FileInput label="Attach a summary or portfolio of past projects." />
      </FormSection>

      {/* --- Section 5: Future Plans (Blue box, Pink line) --- */}
      <FormSection title="Future Plans" bgColor="bg-angat-blue" textColor="text-white" borderColor="border-angat-pink">
        <FileInput label="Attach a document outlining your future plans or proposals." />
      </FormSection>

      {/* --- Section 6: Legal Documents (Light yellow box, Lighter yellow line) --- */}
      <FormSection title="Legal Documents" bgColor="bg-sidebar-light" textColor="text-gray-800" borderColor="border-sidebar-lighter">
        <FileInput label="Attach SEC Registration, BIR Certificate, etc." />
      </FormSection>

      {/* --- Final Register Button --- */}
      <div className="w-full max-w-4xl mt-4">
        <button
            className="bg-angat-pink text-white font-bold py-3 px-6 text-lg rounded-full w-full hover:opacity-90 transition-opacity duration-300"
            type="button"
        >
            Register
        </button>
      </div>
    </div>
  );
}
