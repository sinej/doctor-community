import db from "@/lib/db";
import {notFound} from "next/navigation";
import getSession from "@/lib/session";
import Image from "next/image";
import Link from "next/link";
import {BiUser} from "react-icons/bi";
import Input from "@/components/form/input";
import {FiDelete} from "react-icons/fi";

async function getIsOwner(userId: number) {
    const session = await getSession()

    if(session.id) {
        return session.id === userId;
    }
    return false;
}

async function getPosts(id: number) {
    const community = await db.community.findUnique({
        where: {
            id,
        },
        include: {
            user: {
                select: {
                    username: true,
                    avatar: true,
                }
            }
        }
    });
    return community
}

interface CommunityDetailType {
    params: {
        id: string;
    }
};

const CommunityDetail = async (props: CommunityDetailType) => {
    const { params: { id }} = props;

    const detailId = Number(id);

    if(isNaN(detailId)) {
        return notFound();
    }

    const posts = await getPosts(detailId);
    console.log("posts", posts)

    if(!posts) {
        return notFound();
    }

    const isOwner = await getIsOwner(posts.userId);

    return (
        <div>
            <div className=" fixed top-2 right-6">
                <FiDelete size={16}/>
                <span className="text-red s14-medium-lh20">삭제</span>
            </div>
            <div className="p-5">
                <div className="flex items-center gap-3 border-b border-gray030">
                    <div className="size-10 rounded-full">
                        {posts.user.avatar !== null ? (
                           <Image src={posts.user.avatar}
                                  width={40}
                                  height={40}
                                  alt={posts.user.username}
                           />
                        ) : (
                            <BiUser className=""/>
                        )}
                    </div>
                    <div className="p-5 flex items-center gap-3 border-b border-gray030">
                        <h3>{posts.user.username}</h3>
                    </div>
                </div>
                <div>
                    <h1 className="s18-bold-lh26">{posts.title}</h1>
                    <p className="s15-regular-lh24">{posts.description}</p>
                </div>
                <div className="relative aspect-square rounded-md overflow-hidden">
                    <Image src={posts.photo} alt={posts.title} fill />
                </div>
            </div>
            <div className="fixed w-full bottom-0 left-0 p-5 pb-10 flex justify-between items-center">
                <Input type="email"
                       name="email"
                       placeholder="   "
                       required
                />
                <Link href={``}>채팅하기</Link>
            </div>
        </div>
    );
}

export default CommunityDetail;