/*
    Custom functions here is used for shorten functions
*/


export const checkNulls = (array: string[]) => {
    for (const key in array) {
        // @ts-ignore
        if (array[key] == null || array[key] == "") {
            return true;
        }
    }
    return false;
}

export const picks = (entities: object[], paths: string[]) => {
    // @ts-ignore
    return entities.map((entity) => pick(entity, paths));
}

export const pick = <T, K extends keyof T>(obj: T, paths: K[]): Pick<T, K> => ({
    ...paths.reduce((mem, key) => ({
        ...mem,
        [key]: obj?.[key]
    }), {})
} as Pick<T, K>);