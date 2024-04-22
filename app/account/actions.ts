'use server';

import {z} from "zod";
import {PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR} from "@/lib/constants";


const checkUsername = (username: string) =>
    !username.includes('doctor');
const checkPasswords = ({ password, passwordConfirm }: { password: string, passwordConfirm: string }) =>
    password === passwordConfirm;

const FORM_SCHEMA = z.object({
    username: z.string({
        invalid_type_error: "이름은 글자이어야 합니다.",
        required_error: '이름이 정확하지 않습니다.'
    })
        .toLowerCase()
        .trim()
        .transform(username => `💯${username}💯`)
        .refine(checkUsername, "doctor를 사용할 수 없습니다."
        ),
    email: z.string().email()
        .toLowerCase(),
    password: z.string().min(PASSWORD_MIN_LENGTH).regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
      passwordConfirm: z.string().min(PASSWORD_MIN_LENGTH).regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
}).refine(checkPasswords, {
        message: "두 비밀번호가 동일해야됩니다.",
        path: ['confirmPassword']
    }
)

export async function account(prevState: any, formData: FormData) {
    const data = {
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
        passwordConfirm: formData.get("password-confirm")
    }

     const result =  FORM_SCHEMA.safeParse(data); // username 유효성검사

    if(!result.success) {
        return result.error.flatten()
    } else {
        console.log("result?.data", result?.data)
    }
}