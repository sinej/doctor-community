'use server';

import {z} from "zod";
import {PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR} from "@/lib/constants";
import bcrypt from "bcrypt";
import {redirect} from "next/navigation";
import db from "@/lib/db";
import getSession from "@/lib/session";

const checkEmailExists = async (email: string) => {
    // 이메일로 유저 찾기
    const user = await db.user.findUnique({
        where: {
            email,
        },
        select: {
            id: true
        }
    })

    return Boolean(user);
}

const formSchema = z.object({
    email: z.string()
        .email()
        .toLowerCase()
        .refine(checkEmailExists, "이 이메일을 사용하는 계정이 존재하지 않습니다."),
    password: z.string({
        required_error: "비밀번호를 입력하세요."
    }).min(PASSWORD_MIN_LENGTH).regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
})

export async function login(prevState: any, formData: FormData) {
    const data = {
        email: formData.get("email"),
        password: formData.get("password"),
    }

    const result = await formSchema.spa(data); // username 유효성검사

    if(!result.success) {
        return result.error.flatten()
    } else {
        // 비밀번호의 해시값 찾기 -> 사용자가 알고있음.
        const user = await db.user.findUnique({
            where: {
                email: result.data.email
            },
            select: {
                id: true,
                password: true,
            }
        })

        console.log("user", user)
        // 사용자 로그인 처리
        const success = await bcrypt.compare(result.data.password, user!.password ?? "");
        if(success) {
            const session = await getSession()
            session.id = user!.id;
            // /profile 라우터 이동 처리
            redirect('/profile')
        } else {
            return {
                fieldErrors: {
                    password: ["잘못된 비밀번호 입니다."],
                    email: []
                }
            }
        }
    }
}