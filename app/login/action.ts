'use server'

import {redirect} from "next/navigation";

export async function handleForm(prevState: any, formData: FormData) {
    await new Promise(resolve =>
        setTimeout(resolve, 5000)
    );
    redirect('/');
    return {
        errors: ["password too short"]
    }
}