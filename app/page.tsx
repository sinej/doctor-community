"use client"

import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {ModeToggle} from "@/components/theme/switch";

const Home = () => {
    const { push } = useRouter();
    return (
        <>
            <ModeToggle/>
            <div>
                <div>
                    <div className="">
                        <img src="" alt=""/>
                        <h1>닥터</h1>
                        <h2>닥터 커뮤니티에 어서오세요!</h2>
                    </div>

                    <div>
                        <Button onClick={() => push('/account')}>시작하기</Button>
                        <div>
                            <span>이미 계정이 있나요?</span>
                            <Button onClick={() => push('/login')}>로그인</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Home;