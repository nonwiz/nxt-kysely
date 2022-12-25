import {errorWrapper, isAdmin, successWrapper} from "./common";
import {Users} from "@/db/model";
import {db} from "@/db";

const bcrypt = require('bcrypt');

export const loginUser = async (email: string, password: string) => {
    const {error, data} = await getUserByEmail(email);
    if (data != null && !error) {
        // @ts-ignore
        const isValidPassword = await bcrypt.compare(password, data.password ? data.password : "");
        if (isValidPassword) {
            return successWrapper("User logged in successfully", data);
        }
    }
    return errorWrapper("", "Account doesn't exist or invalid password");
}

export const registerUser = async (user: { password: string; role: any; name: any; email: string }) => {
    user.email = user.email.toLowerCase();
    const {data} = await getUserByEmail(user.email);
    if (data == null) {
        const salt = await bcrypt.genSalt(10);
        // hashing password
        user.role = isAdmin(user.email) ? "admin" : "customer";
        user.password = await bcrypt.hash(user.password, salt);
        return await createUser(user);
    }
    return errorWrapper("", "User already exists");
}

const createUser = async (user: { password: string; role: any; name: any; email: string }) => {
    try {
        if (user.email == null || user.email == "") {
            return errorWrapper({}, "User email can't be null")
        }
        user.email = user.email.toLowerCase();
        const data = await db
            .insertInto("users")
            .values({
                email: user.email,
                name: user.name,
                password: user.password,
                role: user.role
            })
            .execute();

        return successWrapper("User created successfully", data);
    } catch (error) {
        return errorWrapper(error, "Error creating user");
    }
}

export const getUsers = async () => {
    try {
        const data = await db.selectFrom("users").selectAll().execute();
        return successWrapper("Users fetched successfully", data);
    } catch (error: any) {
        return errorWrapper(error, "Error fetching users");
    }
}

/*
 * Start of Internal Functions
 */

export const getUserByEmail = async (email: string) => {
    try {
        const data = await db
            .selectFrom("users")
            .selectAll()
            .where("email", "=", email)
            .execute()
            ;
        if (data && data.length) {
            return successWrapper("User found", data[0]);
        }
        return errorWrapper("User not found", ``);
    } catch (error: any) {
        return errorWrapper(error, "Error fetching user");
    }
}



