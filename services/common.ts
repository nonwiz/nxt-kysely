import { NextApiResponse } from "next";

/*
    Common.ts: response and wrapper for backend
*/


export const Resp = (res: NextApiResponse, status: number, message: string, entities: any = null) => {
    const success = status >= 200 && status < 300;
    const isObj = typeof entities === "object";
    return res.status(status).json({ success, error: !success, message, entities: isObj ? { ...entities } : null });
}

export const errorWrapper = (error: any, message: string, data: any = null) => {
    return { success: false, error: true, message: `${message}, ${error.toString()}`, data: data || null }
}

export const successWrapper = (message: string, data: object) => {
    return { success: true, error: false, message, data }
}

export const isAdmin = (email: string): Boolean => {
    const adminEmails = process.env.ADMIN_EMAIL as string;
    return adminEmails.split("|").includes(email);
}

