import getSession from "@/lib/session";
import db from "@/lib/db";
import {notFound, redirect} from "next/navigation";
import {Button} from "@/components/ui/button";
import {AiOutlineNotification, AiOutlineSetting} from "react-icons/ai";

async function getUser() {
    const session = await getSession();
    if (session?.id) {
        const user = await db.user.findUnique({
            where: {
                id: session.id,
            },
        });
        if (user) {
            return user;
        }
    }
    notFound();
}

const Profile = async () => {

    const user = await getUser();

    const logout = async () => {
        "use server"
        const session = await getSession();
        await session.destroy();
        redirect('/')

    }
    return (
        <>
            <div>
                <div className="flex items-center w-full justify-end gap-[5px]">
                    <Button className="text-gray060">
                        <AiOutlineNotification size={20}/>
                    </Button>
                    <Button className="px-0 text-gray060">
                        <AiOutlineSetting size={20}/>
                    </Button>
                </div>
                <div className="flex items-center justify-between">
                    <h2 className="text-gray080 s18-bold-lh26 tracking-normal">{user?.username}</h2>
                    <form action={logout}>
                        <Button variant="link"
                                className="text-gray030 s14-regular-lh20 px-0"
                        >로그아웃</Button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Profile;