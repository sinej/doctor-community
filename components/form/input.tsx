import React from 'react';

interface InputPropsTypes {
    type: string;
    label: string;
    placeholder: string;
    required?: boolean;
    errors?: string[];
}

const Input = (props: InputPropsTypes) => {
    const { type, placeholder, required, label, errors } = props;
    return (
        <div className="relative py-2">
            <input type={type}
                   placeholder={placeholder}
                   className="relative pt-3 block bg-transparent rounded-md w-full h-10 focus:outline-none ring-1 focus:ring-2
                           ring-gray030 focus:ring-blue020 border-none px-3 peer"
                   required={required}
            />
            <label
                className="absolute text-md text-gray050 duration-100 transform -translate-y-3 scale-75 top-5 z-10 origin-[0] left-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 peer-focus:left-0"
            >
                {label}
            </label>
            {errors?.map((error, index) =>
                <span key={index} className="text-red070 s13-regular-lh16 relative left-1">{error}</span>
            )}
        </div>
    );
}

export default Input;