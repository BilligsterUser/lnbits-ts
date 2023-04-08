/* eslint-disable @typescript-eslint/naming-convention */
import axios, { AxiosError, AxiosInstance } from 'axios'
import { ILNBitsConfig } from './model'



interface IPaywalls {
	amount: number
	description: string
	extras: string
	id: string
	memo: string
	remembers: boolean
	time: number
	url: string
	wallet: string
}

interface ICreatePaywall {
	amount: number
	description: string
	extras: string
	id: string
	memo: string
	remembers: boolean
	time: number
	url: string
	wallet: string
}

interface IInvoice {
	payment_hash: string
	payment_request: string
}

interface IInvoiceCheck {
	paid: string
}

export class LNBitsPaywallClass {

	constructor(params: ILNBitsConfig) {
		this.adminKey = params.adminKey
		this.invoiceReadKey = params.invoiceReadKey
		this.endpoint = params.endpoint || this.endpoint
		this.api = axios.create({
			baseURL: `${this.endpoint}/paywall/api/v1`,
			headers: {
				'Content-Type': 'application/json',
			},
		})
	}
	private adminKey = ''
	private api: AxiosInstance
	private endpoint = 'https://lnbits.com'
	private invoiceReadKey = ''

	checkInvoice(params: {
		payment_hash: string;
		paywall_id: string;
	}): Promise<IInvoiceCheck> {
		this.api.defaults.headers['X-Api-Key'] = this.invoiceReadKey
		return this.api
			.post<IInvoiceCheck>(`/paywalls/${params.paywall_id}/check_invoice`, params)
			.then(res => res.data)
			.catch((err: AxiosError) => { throw err })
	}

	createInvoice(params: {
		amount: number;
		paywall_id: string;
	}): Promise<IInvoice> {
		this.api.defaults.headers['X-Api-Key'] = this.invoiceReadKey
		return this.api
			.post<IInvoice>(`/paywalls/${params.paywall_id}/invoice`, params)
			.then(res => res.data)
			.catch((err: AxiosError) => { throw err })
	}

	createPaywall(params: {
		amount: number;
		description: string;
		memo: string;
		remembers: boolean;
		url: string;
	}): Promise<ICreatePaywall>  {
		this.api.defaults.headers['X-Api-Key'] = this.invoiceReadKey
		return this.api
			.post<ICreatePaywall>('/paywalls', params)
			.then(res => res.data)
			.catch((err: AxiosError) => { throw err })
	}

	deletePaywall(params: { paywall_id: string }): Promise<boolean> {
		this.api.defaults.headers['X-Api-Key'] = this.adminKey
		return this.api
			.delete(`/paywalls/${params.paywall_id}`)
			.then(() => true)
			.catch(() => false)
	}

	getPaywalls(): Promise<IPaywalls[]>  {
		this.api.defaults.headers['X-Api-Key'] = this.invoiceReadKey
		return this.api
			.get<IPaywalls[]>('/paywalls')
			.then(res => res.data)
			.catch((err: AxiosError) => { throw err })
	}
}
