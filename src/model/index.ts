export interface ILNBitsConfig {
	adminKey?: string
	endpoint?: string
	invoiceReadKey?: string
}
export type WithRequiredProp<T, TKey extends keyof T> = T & Required<Pick<T, TKey>>