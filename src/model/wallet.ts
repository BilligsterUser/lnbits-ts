export interface ICheckInvoice {
	details: IDetails
	paid: boolean
	preimage: string
}

export interface IDetails {
	amount: number
	bolt11: string
	// eslint-disable-next-line @typescript-eslint/naming-convention
	checking_id: string
	expiry: number
	extra: IExtra
	fee: number
	memo: string
	// eslint-disable-next-line @typescript-eslint/naming-convention
	payment_hash: string
	pending: boolean
	preimage: string
	time: number
	// eslint-disable-next-line @typescript-eslint/naming-convention
	wallet_id: string
	webhook?: null | string
	// eslint-disable-next-line @typescript-eslint/naming-convention
	webhook_status?: number | null
}

export interface IExtra {
	internalId?: string
}
export interface ICreateInvoiceParam {
	amount: number
	bolt11?: string
	// eslint-disable-next-line @typescript-eslint/naming-convention
	description_hash?: string
	expiry?: number
	internal?: boolean
	// eslint-disable-next-line @typescript-eslint/naming-convention
	lnurl_balance_check?: string
	// eslint-disable-next-line @typescript-eslint/naming-convention
	lnurl_callback?: string
	memo?: string
	out: boolean
	// eslint-disable-next-line @typescript-eslint/naming-convention
	unhashed_description?: string
	unit?: string
	webhook?: string
}
export interface ICreateInvoice {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	checking_id: string
	// eslint-disable-next-line @typescript-eslint/naming-convention
	lnurl_response: string | null
	// eslint-disable-next-line @typescript-eslint/naming-convention
	payment_hash: string
	// eslint-disable-next-line @typescript-eslint/naming-convention
	payment_request: string
}

export interface IPayInvoice {// eslint-disable-next-line @typescript-eslint/naming-convention
	checking_id: string
	// eslint-disable-next-line @typescript-eslint/naming-convention
	payment_hash: string
}
export interface IWalletDetails {
	balance: number
	id: string
	name: string
}