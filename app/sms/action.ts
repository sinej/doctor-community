'use server';

import {z} from "zod";

const FORM_SCHEMA = z.object({
    phoneNumber: z.string(),
    verificationCode: z.string(),
})

export async function smsVerification(prevState: any, formData: FormData) {
    const data = {
        phoneNumber: formData.get("phoneNumber"),
        verificationCode: formData.get("verificationCode"),
    }

    const result =  FORM_SCHEMA.safeParse(data); // username 유효성검사

    if(!result.success) {
        return result.error.flatten()
    } else {
        console.log("result.data", result.data)
    }
}