'use server';

import {z} from "zod";
import validate from "validator";
import {redirect} from "next/navigation";
import db from "@/lib/db";
import crypto from "crypto";
import getSession from "@/lib/session";
import twilio from "twilio";

const phoneSchema = z.string()
    .trim()
    .refine(
        phone =>
            validate.isMobilePhone(phone, "ko-KR"), "잘못된 번호 형식입니다."
    )

async function tokenExists(token: number) {
    const exists = await db.sMSCode.findUnique({
        where: {
            token: token.toString()
        },
        select: {
            id: true
        }
    })

    return Boolean(exists);
}

const verificationCodeSchema = z.coerce
    .number()
    .min(100000)
    .max(999999)
    .refine(tokenExists, "token이 존재하지 않습니다.")

interface ActionState {
    code: boolean;
}

async function getToken() {
    const token = crypto.randomInt(100000,999999).toString()
    const exists = await db.sMSCode.findUnique({
        where: {
            token,
        },
        select: {
            id: true
        }
    });

    if(exists) {
        return getToken();
    } else {
        return token
    }
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
            await db.sMSCode.deleteMany({
                where: {
                    user: {
                        phone: result.data
                    }
                }
            })

            const token = await getToken();
            await db.sMSCode.create({
                data: {
                    token,
                    user: {
                        connectOrCreate: {
                            where: {
                                phone: result.data
                            },
                            create: {
                                username: crypto.randomBytes(10).toString('hex'),
                                phone: result.data
                            }
                        }
                    }
                }
            })
            // 이전 token code 삭제하기
            // 새 token 생성
            // token -> SMS을 통해 사용자에게 보내기
            const client = twilio(
                process.env.TWILIO_ACCOUNT_SID,
                process.env.TWILIO_AUTH_TOKEN
            );
            await client.messages.create({
                body: `당신의 인증코드는 ${token} 입니다.`,
                from: process.env.TWILIO_PHONE_NUMBER!,
                to: process.env.MY_PHONE_NUMBER!
            })

            return {
                code: true,
            }
        }
    } else {
        const result = await verificationCodeSchema.spa(code)
        if(!result.success) {
            return {
                code: true,
                error: result.error.flatten(),
            }
        } else {
            const token = await db.sMSCode.findUnique({
                where: {
                    token: result.data.toString()
                },
                select: {
                    id: true,
                    userId: true
                }
            })

            if(token) {
                const session = await getSession();
                session.id = token!.userId;
                await session.save();
                await db.sMSCode.delete({
                    where: {
                        id: token!.id
                    }
                })
            }
            redirect('/profile')
        }
    }
}