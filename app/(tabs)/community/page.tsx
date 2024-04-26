import db from "@/lib/db";
import PostsList from "@/components/posts/list";
import Link from "next/link";
import { Prisma } from "@prisma/client";
import { unstable_cache as nextCache, revalidatePath } from "next/cache";

import {BiPlus} from "react-icons/bi";

const getCachedProducts = nextCache(getInitialProducts, ["home-products"]);

async function getInitialProducts() {
    const products = await db.community.findMany({
        select: {
            title: true,
            created_at: true,
            photo: true,
            id: true,
        },
        orderBy: {
            created_at: "desc",
        },
    });
    return products;
}

export type InitialProducts = Prisma.PromiseReturnType<
    typeof getInitialProducts
>;

export const metadata = {
    title: "Home",
};

const Community = async () => {
    const initialProducts = await getInitialProducts();
    const revalidate = async () => {
        "use server";
        revalidatePath("/home");
    };

    return (
        <div className="p-5 flex flex-col gap-5">
            <PostsList initialProducts={initialProducts} />
            <Link href="/community/add">
                <div
                        className="border-none rounded-full size-16 fixed bottom-20 right-6 text-white bg-blue030
                        transition-colors hover:bg-blue040
                        "
                >
                    <BiPlus className="size-10"/>
                </div>
            </Link>
        </div>
    );
}

export default Community;