'use client'

import Input from "@/components/form/input";
import FormButton from "@/components/form/button";
import Link from "next/link";
import {FaGithub, FaPhone} from "react-icons/fa";
import React from "react";
import {useFormState} from "react-dom";
import {login} from "@/app/(auth)/login/action";
import {PASSWORD_MIN_LENGTH} from "@/lib/constants";

const Login = () => {

    const [state, action] = useFormState(login, null)

    return (
        <>
            <div className="flex flex-col gap-10 py-12">
                <div className="flex flex-col gap-1">
                    <h2 className="s24-bold-lh32 text-gray080">안녕하세요</h2>
                    <p className="s18-regular-lh26 text-gray040">닥터를 시작해볼까요?</p>
                </div>
                <form className="flex flex-col gap-3 relative"
                      action={action}
                >
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
                           errors={state?.fieldErrors.password}
                           minLength={PASSWORD_MIN_LENGTH}
                    />
                    <FormButton text="로그인" />
                </form>

                <div className="border border-gray010"/>
                <Link href="/sms"
                      className="primary-btn bg-gray070 hover:bg-gray080 items-center flex justify-center"
                >
                    <span className="mr-3 relative -top-[2px]">
                        <FaPhone/>
                    </span>
                    <span className="s14-medium-lh20">SNS으로 가입하기</span>
                </Link>

                <Link href="/github"
                      className="primary-btn bg-gray070 hover:bg-gray080 items-center flex justify-center"
                >
                    <span className="mr-3 relative -top-[2px]">
                        <FaGithub/>
                    </span>
                    <span className="s14-medium-lh20">Github으로 가입하기</span>
                </Link>
            </div>
        </>
    );
}

export default Login;