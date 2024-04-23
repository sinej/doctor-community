'use server';

import {z} from "zod";
import validate from "validator";
import {redirect} from "next/navigation";

const phoneSchema = z.string().trim().refine(phone => validate.isMobilePhone(phone, "ko-KR"))

const verificationCodeSchema = z.coerce.number().min(100000).max(999999);

interface ActionState {
    code: boolean;
}

export async function smsVerification(prevState: ActionState, formData: FormData) {
    const phone = formData.get('phoneNumber')
    const code = formData.get('verificationCode')

    if(!prevState.code) {
        const result = phoneSchema.safeParse(phone);
        if(!result.success) {
            return {
                code: false,
                error: result.error.flatten(),
            }
        } else {
            return {
                code: true,
            }
        }
    } else {
        const result = verificationCodeSchema.safeParse(code)
        if(!result.success) {
            return {
                code: true,
                error: result.error.flatten(),
            }
        } else {
            redirect('/')
        }
    }
}