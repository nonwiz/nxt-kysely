import clientPromise from "./mongodb";

export enum Collections {
    users = "users",
}

export const useDb = async (collection: Collections) => {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    return db.collection(collection);
}