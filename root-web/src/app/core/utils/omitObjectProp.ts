export function omitObjectProp(key: string, obj: any) {
    const { [key]: omitted, ...rest } = obj;
    return rest;
}
