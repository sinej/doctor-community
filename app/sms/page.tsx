'use client'

import Input from "@/components/form/input";
import FormButton from "@/components/form/button";
import React from "react";
import {useFormState} from "react-dom";
import {smsVerification} from "@/app/sms/action";

const initialState = {
    token: false,
    error: undefined,
}

const SMSLogin = () => {
    const [state, action] = useFormState(smsVerification, initialState)

    return (
        <>
            <div className="flex flex-col gap-10 py-8">
                <div className="flex flex-col gap-1">
                    <h2 className="s24-bold-lh32 text-gray080">SMS 로그인</h2>
                    <p className="s18-regular-lh26 text-gray040">핸드폰 번호로 인증해주세요</p>
                </div>
                <form className="flex flex-col gap-3 relative"
                      action={action}
                >
                    {state.token ? (
                        <Input type="number"
                               name="token"
                               placeholder="   "
                               required
                               label="인증번호"
                               min={100000}
                               max={999999}
                        />
                    ) : (
                        <Input type="text"
                               name="phoneNumber"
                               placeholder="   "
                               required
                               label="핸드폰 번호"
                               errors={state.error?.formErrors}
                        />
                    )}
                    <FormButton text={state.token ? '전송하기' : "인증 문자 보내기"}/>
                </form>
            </div>
        </>
    );
}

export default SMSLogin;