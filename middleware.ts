import {NextRequest, NextResponse} from "next/server";
import getSession from "@/lib/session";

interface Routes {
    [key: string]: boolean;
}

const publicOnlyUrls: Routes = {
    "/": true,
    "/login": true,
    "/sms": true,
    "/account": true,
}
export async function middleware(request: NextRequest) {
    const session = await getSession()
    const exists = publicOnlyUrls[request.nextUrl.pathname]
    if(!session.id) {
        if(!exists) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    } else {
        if(exists) {
            return NextResponse.redirect(new URL("/home", request.url));
        }
    }
    // const pathname = request.nextUrl.pathname;
    // if(pathname === "/") {
    //     const response = NextResponse.next();
    //     response.cookies.set("middleware-cookie", "hello");
    //     return response;
    // }
    // if (pathname === "/profile") {
    //     // return Response.json({
    //     //     error: "여기에 허용되지 않습니다."
    //     // })
    //     return Response.redirect(new URL('/', request.url));
    // }
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image/favicon.ico).*)"],
    // matcher: ["/", "/profile", "/account", "/user/:path*"],
}