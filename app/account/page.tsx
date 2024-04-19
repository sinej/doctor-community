import React from 'react';
import Link from "next/link";
import {ChatBubbleIcon} from "@radix-ui/react-icons";
import {FaGithub} from "react-icons/fa";

type Props = {

};

const Account = (props: Props) => {
    const {} = props;
    return (
        <>
            <div className="flex flex-col gap-10 py-12">
                <div className="flex flex-col gap-1">
                    <h2 className="s24-bold-lh32 text-gray080">안녕하세요</h2>
                    <p className="s18-regular-lh26 text-gray040">닥터를 시작해볼까요?</p>
                </div>
                <form className="flex flex-col gap-3 relative">
                    <input type="text"
                           placeholder="   "
                           className="block bg-transparent rounded-md w-full h-10 focus:outline-none ring-1 focus:ring-2
                           ring-gray030 focus:ring-blue020 border-none px-3 peer"
                           required
                    />
                    <label
                        className="absolute text-md text-gray050 duration-100 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] left-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-9 peer-focus:left-0"
                    >
                        이름
                    </label>
                    <span className="text-red070 s13-regular-lh16 relative left-1">input error</span>

                    <button className="primary-btn bg-blue030 hover:bg-blue040 transition-color s14-regular-lh20"
                    >가입하기</button>
                </form>

                <div className="border border-gray010"/>
                <Link href="/SNS"
                      className="primary-btn bg-gray070 hover:bg-gray080 items-center flex justify-center"
                >
                    <span className="mr-3 relative -top-[2px]">
                        <FaGithub/>
                    </span>
                    <span className="s14-medium-lh20">SNS으로 가입하기</span>
                </Link>
            </div>
        </>
    );
}

export default Account;