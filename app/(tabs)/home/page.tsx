import ProductList from "@/components/posts/list";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import { unstable_cache as nextCache, revalidatePath } from "next/cache";
import Link from "next/link";

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

//export const dynamic = "force-dynamic";
// export const revalidate = 60;

export default async function Home() {
    const initialProducts = await getInitialProducts();
    const revalidate = async () => {
        "use server";
        revalidatePath("/home");
    };
    return (
        <div>
            <ProductList initialProducts={initialProducts} />
            <Link
                href="/community/add"
                className="bg-orange-500 flex items-center justify-center rounded-full size-16 fixed bottom-24 right-8 text-white transition-colors hover:bg-orange-400"
            >
            </Link>
        </div>
    );
}