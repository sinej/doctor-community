import React from 'react';
import Link from "next/link";
import {ChatBubbleIcon} from "@radix-ui/react-icons";
import {FaGithub} from "react-icons/fa";
import Input from "@/components/form/input";
import FormButton from "@/components/form/button";

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
                    <Input type="text"
                           placeholder="   "
                           required
                           label="이름"
                           errors={[]}
                    />
                    <Input type="email"
                           placeholder="   "
                           required
                           label="이메일"
                           errors={[]}
                    />
                    <Input type="password"
                           placeholder="   "
                           required
                           label="비밀번호"
                           errors={[]}
                    />
                    <Input type="password"
                           placeholder="   "
                           required
                           label="비밀번호 확인"
                           errors={[]}
                    />
                    <FormButton loading={true} text="가입하기"/>
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