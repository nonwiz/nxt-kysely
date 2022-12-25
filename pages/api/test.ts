
import type { NextApiRequest, NextApiResponse } from "next"
import {db} from "../../db";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    for await (const item of db.selectFrom('users').selectAll().stream()) {
        console.log({item})
    }

    res.send({
        error: "You must be signed in to view the protected content on this page.",
    })
}
