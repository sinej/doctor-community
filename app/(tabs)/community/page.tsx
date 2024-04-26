import PostsList from "@/components/posts/list";
import db from "@/lib/db";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {BiPlus} from "react-icons/bi";

async function getPosts() {
    const posts = await db.community.findMany({
        select: {
            title: true,
            description: true,
            created_at: true,
            photo: true,
            id: true
        }
    });
    return posts
}
const Community = async () => {
    const posts = await getPosts();
    return (
        <div className="p-5 flex flex-col gap-5">
            {posts.map(post => (
                <PostsList key={post.id} {...post} />
            ))}
            <Link href="/community/add">
                <Button variant="outline" size="icon"
                        className="border-none rounded-full size-16 fixed bottom-20 right-6 text-white bg-blue030
                        transition-colors hover:bg-blue040
                        "
                >
                    <BiPlus className="size-10"/>
                </Button>
            </Link>
        </div>
    );
}

export default Community;