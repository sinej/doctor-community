"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import { postSchema } from "./schema";

export async function uploadPost(formData: FormData) {
    const data = {
        photo: formData.get("photo"),
        title: formData.get("title"),
        description: formData.get("description"),
    };
    const result = postSchema.safeParse(data);
    if (!result.success) {
        return result.error.flatten();
    } else {
        const session = await getSession();
        if (session.id) {
            const product = await db.community.create({
                data: {
                    title: result.data.title,
                    description: result.data.description,
                    photo: result.data.photo,
                    user: {
                        connect: {
                            id: session.id,
                        },
                    },
                },
                select: {
                    id: true,
                },
            });
            redirect(`/community/${product.id}`);
        }
    }
}

export async function getUploadUrl() {
    const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID}/images/v2/direct_upload`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_CLOUDFLARE_API_KEY}`,
            },
        }
    );
    const data = await response.json();
    return data;
}