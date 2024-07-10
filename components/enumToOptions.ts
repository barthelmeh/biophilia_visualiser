export default function enumToOptions<T extends string | number,>(enumObj: { [key: string]: T }): Array<{ label: string, value: T }> {
    return Object.values(enumObj).map(value => ({
        label: value.toString(),
        value: value
    }));
}