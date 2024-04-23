"use client"

import {useRouter} from "next/navigation";
import {ModeToggle} from "@/components/theme/switch";
import Link from "next/link";
import "@/lib/db";


const Home = () => {
    const { push } = useRouter();

    return (
        <>
            <ModeToggle/>
            <div className="flex flex-col items-center justify-between min-h-screen">
                    <div className="flex flex-col items-center my-auto gap-2">
                        <span className="text-9xl">💊</span>
                        <h1 className="s32-bold-lh42 text-gray080 dark:text-white">닥터</h1>
                        <h2 className={`s24-medium-lh32 text-gray030 dark:text-white`}>닥터 커뮤니티에 어서오세요!</h2>
                    </div>

                    <div className="flex flex-col items-center w-full py-20">
                        <button onClick={() => push('/account')}
                                type="button"
                                className="primary-btn bg-blue030 hover:bg-blue040 transition-color s14-regular-lh20"
                        >시작하기</button>
                        <div className="w-full flex items-center justify-center s16-medium-lh22 mt-4">
                            <span>이미 계정이 있나요?</span>
                            <Link href={'/login'}
                                  className="text-blue040 !s16-medium-lh22 py-0 pl-2"
                            >로그인</Link>
                        </div>
                    </div>
                </div>
        </>
    )
}


export default Home;