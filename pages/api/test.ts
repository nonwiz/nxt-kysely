
import type { NextApiRequest, NextApiResponse } from "next"
import {kysely} from "@/db";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    for await (const item of kysely.selectFrom('users').selectAll().stream()) {
        console.log({item})
    }

    res.send({
        error: "You must be signed in to view the protected content on this page.",
    })
}
