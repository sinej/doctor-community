import React from 'react';
import { CgSpinner } from "react-icons/cg";

type Props = {
    text: string;
    loading: boolean;
};

const FormButton = (props: Props) => {
    const { text, loading } = props;
    return (
        <>
            <button disabled={loading}
                    className="primary-btn bg-blue030 hover:bg-blue040 transition-color s14-regular-lh20
                    flex items-center justify-center
                     disabled:bg-gray030 disabled:text-gray060 cursor-pointer disabled:cursor-default"
            >
                {loading ?
                    <CgSpinner className="animate-spin" size={20} /> :
                    text
                }
            </button>
        </>
    );
}

export default FormButton;