'use client'

import { CgSpinner } from "react-icons/cg";
import {useFormStatus} from "react-dom";

type Props = {
    text: string;
    // onClick: () => void;
};

const FormButton = (props: Props) => {
    const { text } = props;

    const { pending  } = useFormStatus();
    return (
        <>
            <button disabled={pending}
                    type="submit"
                    className="primary-btn bg-blue030 hover:bg-blue040 transition-color s14-regular-lh20
                    flex items-center justify-center
                     disabled:bg-gray030 disabled:text-gray060 cursor-pointer disabled:cursor-default"
            >
                {pending ?
                    <CgSpinner className="animate-spin" size={20} /> :
                    text
                }
            </button>
        </>
    );
}

export default FormButton;