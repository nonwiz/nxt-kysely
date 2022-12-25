import {Kysely, PostgresDialect} from "kysely";
import { Pool } from 'pg'
import Cursor from 'pg-cursor'
import {DB} from "./model";


export const db = new Kysely<DB>({
    // PostgresDialect requires the Cursor dependency
    dialect: new PostgresDialect({
        pool: new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
            }
        }),
        cursor: Cursor
    }),

})



