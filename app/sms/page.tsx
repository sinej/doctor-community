'use client'

import Input from "@/components/form/input";
import FormButton from "@/components/form/button";
import React from "react";
import {useFormState} from "react-dom";
import {smsVerification} from "@/app/sms/action";

const initialState = {
    code: false,
}

const SMSLogin = () => {
    const [state, action] = useFormState(smsVerification, initialState)

    return (
        <>
            <div className="flex flex-col gap-10 py-8 px-6">
                <div className="flex flex-col gap-1">
                    <h2 className="s24-bold-lh32 text-gray080">SMS 로그인</h2>
                    <p className="s18-regular-lh26 text-gray040">핸드폰 번호로 인증해주세요</p>
                </div>
                <form className="flex flex-col gap-3 relative"
                      action={action}
                >
                    <Input type="number"
                           name="phoneNumber"
                           placeholder="   "
                           required
                           label="핸드폰 번호"
                           // errors={state?.fieldErrors.phoneNumber}
                    />
                    {state.code ? <Input type="number"
                                         name="verificationCode"
                                         placeholder="   "
                                         required
                                         label="인증번호"
                        // errors={state?.fieldErrors.verificationCode}
                                         min={100000}
                                         max={999999}
                    />: null}
                    <FormButton text="인증"/>
                </form>
            </div>
        </>
    );
}

export default SMSLogin;