import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function test() {
    const token = await db.sMSCode.findUnique({
        where: {
            id: 1,
        },
        include: {
            user: true
        }
    })
    console.log("token", token)
}
test()

export default db;