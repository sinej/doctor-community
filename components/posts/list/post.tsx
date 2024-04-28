import { formatToTimeAgo } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface ListProductProps {
    title: string;
    created_at: Date;
    photo: string;
    id: number;
}

export default function ListProduct({
                                        title,
                                        created_at,
                                        photo,
                                        id,
                                    }: ListProductProps) {
    return (
        <Link href={`/community/${id}`} className="flex gap-5">
            <div className="relative size-28 rounded-md overflow-hidden">
                <Image fill src={`${photo}`} className="object-cover" alt={title} />
            </div>
            <div className="flex flex-col gap-1 *:text-white">
                <span className="text-lg">{title}</span>
                <span className="text-sm text-neutral-500">
          {formatToTimeAgo(created_at.toString())}
        </span>
            </div>
        </Link>
    );
}