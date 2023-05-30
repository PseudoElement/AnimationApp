export function omitObjectProp<T extends object, K extends keyof T>(key: K, obj: T): Omit<T, K> {
    const { [key]: omitted, ...rest } = obj;
    return rest;
}
