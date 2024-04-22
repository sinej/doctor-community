'use server';

import {z} from "zod";

const passwordRegex = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/
)

const checkUsername = (username: string) =>
    !username.includes('doctor');
const checkPasswords = ({ password, passwordConfirm }: { password: string, passwordConfirm: string }) =>
    password === passwordConfirm;

const FORM_SCHEMA = z.object({
    username: z.string({
        invalid_type_error: "이름은 글자이어야 합니다.",
        required_error: '이름이 정확하지 않습니다.'
    })
        .min(2, "이름은 2자 이상이어야 합니다.")
        .max(10, "이름은 10자 이하이어야 합니다.")
        .toLowerCase()
        .trim()
        .transform(username => `💯${username}💯`)
        .refine(checkUsername, "doctor를 사용할 수 없습니다."
        ),
    email: z.string().email()
        .toLowerCase(),
    password: z.string().min(4).regex(passwordRegex, "비밀번호는 소문자, 대문자, 숫자, 특수문자를 포함해야 합니다."),
      passwordConfirm: z.string().min(4).regex(passwordRegex, "비밀번호는 소문자, 대문자, 숫자, 특수문자를 포함해야 합니다."),
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