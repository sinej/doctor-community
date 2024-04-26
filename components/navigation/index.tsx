'use client'
import Link from "next/link";
import {
    AiFillAppstore,
    AiFillHome,
    AiOutlineAppstore,
    AiOutlineHome,
} from "react-icons/ai";
import {usePathname} from "next/navigation";
import {IoChatbubbleEllipses, IoChatbubbleEllipsesOutline} from "react-icons/io5";
import React from "react";
import {RiCapsuleFill, RiCapsuleLine} from "react-icons/ri";

interface NavType {

};

const Nav = async (props: NavType) => {
    const {} = props;
    const pathname = usePathname();


    return (
        <div className="fixed bottom-0 w-full mx-auto max-w-screen-md grid grid-cols-4
        border-t border-gray030 py-2">
            <Link className="flex flex-col items-center text-gray080" href="/">
                {pathname === '/home' ?
                    <AiFillHome className="w-6 h-6 mb-1"/> :
                    <AiOutlineHome className="w-6 h-6 mb-1"/>
                }
                <span className="s13-regular-lh16">홈</span>
            </Link>
            <Link className="flex flex-col items-center text-gray080" href="/community">
                {pathname === '/community' ?
                    <AiFillAppstore className="w-6 h-6 mb-1"/> :
                    <AiOutlineAppstore className="w-6 h-6 mb-1"/>
                }
                <span className="s13-regular-lh16">커뮤니티</span>
            </Link>
            <Link className="flex flex-col items-center text-gray080" href="/chat">
                {pathname === "/chat" ?
                    <IoChatbubbleEllipses className="w-6 h-6 mb-1"/> :
                    <IoChatbubbleEllipsesOutline className="w-6 h-6 mb-1"/>
                }
                <span className="s13-regular-lh16">채팅</span>
            </Link>
            <Link className="flex flex-col items-center text-gray080" href="/profile">
                {pathname === '/profile' ?
                    <RiCapsuleFill className="w-6 h-6 mb-1" /> :
                    <RiCapsuleLine className="w-6 h-6 mb-1"/>
                }
                <span className="s13-regular-lh16">마이페이지</span>
            </Link>

        </div>
    );
}

export default Nav;