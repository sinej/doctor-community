'use server';

import {z} from "zod";
import {PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR} from "@/lib/constants";
import db from "@/lib/db";
import * as bcrypt from "bcrypt";
import {redirect} from "next/navigation";
import getSession from "@/lib/session";


const checkUsername = (username: string) =>
    !username.includes('doctor');
const checkPasswords = ({ password, passwordConfirm }: { password: string, passwordConfirm: string }) =>
    password === passwordConfirm;

// username 이미 존재하는지 확인
const checkUniqueUsername = async (username: string) => {
    const user = await db.user.findUnique({
        where: {
            username,
        },
        select: {
            id: true
        }
    })
    return !Boolean(user);
}


// email 이미 누가 사용하고 있는지 확인
const checkUniqueEmail = async (email: string) => {
    const userEmail = await db.user.findUnique({
        where: {
            email
        },
        select: {
            id: true,
        }
    })
    return Boolean(userEmail) === false;
}

const formSchema = z.object({
    username: z.string({
        invalid_type_error: "이름은 글자이어야 합니다.",
        required_error: '이름이 정확하지 않습니다.'
    })
        .toLowerCase()
        .trim()
        // .transform(username => `💯${username}💯`)
        .refine(checkUsername, "doctor를 사용할 수 없습니다.")
        .refine(checkUniqueUsername, "이 사용자 이름은 이미 사용 중입니다."),
    email: z.string().email()
        .toLowerCase()
        .refine(checkUniqueEmail, "해당 이메일로 이미 등록된 계정이 있습니다."),
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
    // username 유효성검사
    const result =  await formSchema.safeParseAsync(data);

    if(!result.success) {
        return result.error.flatten()
    } else {
        // password hashing
        // npm i @types/bcrypt
        const hashedPassword = await bcrypt.hash(result.data.password, 12);

        // 사용자를 데이터베이스 저장
        const user = await db.user.create({
            data: {
                username: result?.data.username,
                email: result?.data.email,
                password: hashedPassword,

            },
            select: {
                id: true
            }
        })

        // 데이터베이스에 저장되면 사용자 자동 로그인
        const session = await getSession();
        session.id = user.id;
        await session.save();

        // 사용자가 로그인하면 = redirect '/home'
        redirect('/profile');
    }
}