"use server";

import db from "@/lib/db";

export async function getMoreProducts(page: number) {
    const post = await db.community.findMany({
        select: {
            title: true,
            created_at: true,
            photo: true,
            id: true,
        },
        skip: page * 1,
        take: 1,
        orderBy: {
            created_at: "desc",
        },
    });
    return post;
}
