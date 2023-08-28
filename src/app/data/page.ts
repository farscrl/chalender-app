export interface Page<T> {
    content: T[];
    first: boolean;
    last: boolean;
    totalPages: number;
    size: number;
    number: number;
}
