/* eslint-disable @typescript-eslint/naming-convention */
import axios, { AxiosError, AxiosInstance } from 'axios'
import { ILNBitsConfig } from './model'



interface IWalletDetails {
	balance: number
	id: string
	name: string
}

interface ICreateInvoice {
	checking_id: string
	lnurl_response: string
	payment_hash: string
	payment_request: string
}

interface IPayInvoice {
	payment_hash: string
}

interface ICheckInvoice {
	payment_hash: string
}

export class LNBitsWalletClass {

	constructor(params: ILNBitsConfig) {
		this.adminKey = params.adminKey
		this.invoiceReadKey = params.invoiceReadKey
		this.endpoint = params.endpoint || this.endpoint
		this.api = axios.create({
			baseURL: `${this.endpoint}/api/v1`,
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
	}): Promise<ICheckInvoice> {
		this.api.defaults.headers['X-Api-Key'] = this.invoiceReadKey
		return this.api
			.get<ICheckInvoice>(`/payments/${params.payment_hash}`)
			.then(res => res.data)
			.catch((err: AxiosError) => { throw err })
	}

	createInvoice(
		params: {
			amount: number;
			memo: string;
			out?: boolean;
			webhook?: string;
		} = {
			amount: 0,
			memo: 'memo',
			out: false,
			webhook: '',
		}
	): Promise<ICreateInvoice> {
		this.api.defaults.headers['X-Api-Key'] = this.invoiceReadKey
		// lnbits does not like empty values
		if (!params.webhook) { delete params.webhook }
		return this.api
			.post < ICreateInvoice>('/payments', params)
			.then(res => res.data)
			.catch((err: AxiosError) => { throw err })
	}

	payInvoice(
		params: {
			bolt11: string;
			out: boolean;
		} = {
			bolt11: '',
			out: true,
		}
	): Promise<IPayInvoice> {
		this.api.defaults.headers['X-Api-Key'] = this.adminKey
		return this.api
			.post <IPayInvoice>('/payments', params)
			.then(res => res.data)
			.catch((err: AxiosError) => { throw err })
	}

	walletDetails(): Promise<IWalletDetails> {
		this.api.defaults.headers['X-Api-Key'] = this.adminKey
		return this.api
			.get<IWalletDetails>('/wallet')
			.then(res => res.data)
			.catch((err: AxiosError) => { throw err })
	}
}
