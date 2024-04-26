'use client'

import Link from "next/link";
import Image from "next/image";
import {formatToTimeAgo} from "@/lib/utils";

interface PostsListType {
    id: number;
    title: string;
    description: string;
    created_at: Date;
    photo: string;
}

const PostsList = (props: PostsListType) => {
    const { id, title, description, created_at, photo } = props;
    return (
        <>
            <Link href={`/post/${id}`} className="flex gap-5">
                <div className="flex flex-col gap-1">
                    <span className="s14-medium-lh20">{title}</span>
                    <span>{description}</span>
                    <span className="s11-regular-lh15 text-gray060">{formatToTimeAgo(created_at.toString())}</span>
                </div>
                <div className="relative size-28 rounded-md overflow-hidden">
                    <Image src={photo}
                           alt={title}
                           fill
                           quality={10}
                    />
                </div>
            </Link>
        </>
    );
}

export default PostsList;