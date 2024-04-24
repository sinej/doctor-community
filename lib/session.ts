import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionTypes {
    id?: number;
}

export default function getSession() {
    return getIronSession<SessionTypes>(cookies(), {
        cookieName: "doctor-name",
        password: process.env.NEXT_PUBLIC_COOKIE_PASSWORD!
    })
}