'use client'

import React from 'react';
import Link from "next/link";
import {FaGithub} from "react-icons/fa";
import Input from "@/components/form/input";
import FormButton from "@/components/form/button";
import {useFormState} from "react-dom";
import { account } from "@/app/(auth)/account/actions";
import {PASSWORD_MIN_LENGTH} from "@/lib/constants";

const Account = () => {

    const [state, action] = useFormState(account, null)

    return (
        <>
            <div className="flex flex-col gap-10 py-12">
                <div className="flex flex-col gap-1">
                    <h2 className="s24-bold-lh32 text-gray080">안녕하세요</h2>
                    <p className="s18-regular-lh26 text-gray040">닥터를 시작해볼까요?</p>
                </div>
                <form action={action} className="flex flex-col gap-3 relative">
                    <Input type="text"
                           name="username"
                           placeholder="   "
                           required
                           label="이름"
                           minLength={2}
                           maxLength={10}
                           errors={state?.fieldErrors.username}
                    />
                    <Input type="email"
                           name="email"
                           placeholder="   "
                           required
                           label="이메일"
                           errors={state?.fieldErrors.email}
                    />
                    <Input type="password"
                           name="password"
                           placeholder="   "
                           required
                           label="비밀번호"
                           minLength={PASSWORD_MIN_LENGTH}
                           errors={state?.fieldErrors.password}
                    />
                    <Input type="password"
                           name="password-confirm"
                           placeholder="   "
                           required
                           label="비밀번호 확인"
                           minLength={PASSWORD_MIN_LENGTH}
                           errors={state?.fieldErrors.passwordConfirm}
                    />
                    <FormButton text="가입하기" />
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