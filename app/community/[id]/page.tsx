import db from "@/lib/db";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import {
    unstable_cache as nextCache,
    revalidateTag,
} from "next/cache";

async function getIsOwner(userId: number) {
    // const session = await getSession();
    // if (session.id) {
    //   return session.id === userId;
    // }
    return false;
}

async function getProduct(id: number) {
    const product = await db.community.findUnique({
        where: {
            id,
        },
        include: {
            user: {
                select: {
                    username: true,
                    avatar: true,
                },
            },
        },
    });
    return product;
}

const getCachedProduct = nextCache(getProduct, ["product-detail"], {
    tags: ["product-detail"],
});

async function getProductTitle(id: number) {
    const product = await db.community.findUnique({
        where: {
            id,
        },
        select: {
            title: true,
        },
    });
    return product;
}

const getCachedProductTitle = nextCache(getProductTitle, ["product-title"], {
    tags: ["product-title"],
});

export async function generateMetadata({ params }: { params: { id: string } }) {
    const product = await getCachedProductTitle(Number(params.id));
    return {
        title: product?.title,
    };
}

export default async function ProductDetail({
                                                params,
                                            }: {
    params: { id: string };
}) {
    const id = Number(params.id);
    if (isNaN(id)) {
        return notFound();
    }
    const product = await getCachedProduct(id);
    if (!product) {
        return notFound();
    }
    const isOwner = await getIsOwner(product.userId);
    const revalidate = async () => {
        "use server";
        revalidateTag("xxxx");
    };
    // const createChatRoom = async () => {
    //     "use server";
    //     const session = await getSession();
    //     const room = await db.chatRoom.create({
    //         data: {
    //             users: {
    //                 connect: [
    //                     {
    //                         id: product.userId,
    //                     },
    //                     {
    //                         id: session.id,
    //                     },
    //                 ],
    //             },
    //         },
    //         select: {
    //             id: true,
    //         },
    //     });
    //     redirect(`/chats/${room.id}`);
    // };

    console.log("product", product)
    return (
        <div className="pb-40">
            <div className="relative aspect-square">
                <Image
                    className="object-cover"
                    fill
                    src={`${product.photo}/width=500,height=500`}
                    alt={product.title}
                />
            </div>
            <div className="p-5 flex items-center gap-3 border-b border-neutral-700">
                <div className="size-10 overflow-hidden rounded-full">
                    {product.user.avatar !== null ? (
                        <Image
                            src={product.user.avatar}
                            width={40}
                            height={40}
                            alt={product.user.username}
                        />
                    ) : null}
                </div>
                <div>
                    <h3>{product.user.username}</h3>
                </div>
            </div>
            <div className="p-5">
                <h1 className="text-2xl font-semibold">{product.title}</h1>
                <p>{product.description}</p>
            </div>
            <div className="fixed w-full bottom-0  p-5 pb-10 bg-neutral-800 flex justify-between items-center max-w-screen-sm">
                {isOwner ? (
                    <form action={revalidate}>
                        <button className="bg-red-500 px-5 py-2.5 rounded-md text-white font-semibold">
                            Revalidate title cache
                        </button>
                    </form>
                ) : null}
                <form>
                    <button className="bg-orange-500 px-5 py-2.5 rounded-md text-white font-semibold">
                        채팅하기
                    </button>
                </form>
            </div>
        </div>
    );
}

export async function generateStaticParams() {
    const products = await db.community.findMany({
        select: {
            id: true,
        },
    });
    return products.map((product) => ({ id: product.id + "" }));
}