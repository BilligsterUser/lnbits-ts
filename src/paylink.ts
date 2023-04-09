/* eslint-disable @typescript-eslint/naming-convention */
import axios, { AxiosError, AxiosInstance } from 'axios'
import { ILNBitsConfig } from './model'



interface ILinks {
	comment_chars: number
	currency: string
	description: string
	id: number
	lnurl: string
	max: number
	min: number
	served_meta: number
	served_pr: number
	success_text: string
	success_url: string
	wallet: string
	webhook_url: string
}

export class LNBitsPaylinkClass {

	constructor(params: ILNBitsConfig) {
		this.adminKey = params?.adminKey ? params.adminKey :''
		this.invoiceReadKey = params?.invoiceReadKey ? params.invoiceReadKey :''
		this.endpoint = params.endpoint || this.endpoint
		this.api = axios.create({
			baseURL: `${this.endpoint}/lnurlp/api/v1`,
			headers: {
				'Content-Type': 'application/json',
			},
		})
	}
	private adminKey = ''
	private api: AxiosInstance
	private endpoint = 'https://legend.lnbits.com'
	private invoiceReadKey = ''

	createPayLink(params: {
		amount: number;
		comment_chars: number;
		description: string;
		max: number;
		min: number;
	}): Promise<ILinks> {
		this.api.defaults.headers['X-Api-Key'] = this.adminKey
		return this.api
			.post<ILinks>('/links', params)
			.then(res => res.data)
			.catch((err: AxiosError) => { throw err })
	}

	deletePayLink(params: { pay_id: number }): Promise<boolean> {
		this.api.defaults.headers['X-Api-Key'] = this.adminKey
		return this.api
			.delete(`/links/${params.pay_id}`)
			.then(() => true)
			.catch(() => false)
	}

	getLink(params: { pay_id: string }): Promise<ILinks> {
		this.api.defaults.headers['X-Api-Key'] = this.invoiceReadKey
		return this.api
			.get<ILinks>(`/links/${params.pay_id}`)
			.then(res => res.data)
			.catch((err: AxiosError) => { throw err })
	}

	getLinks(): Promise<ILinks[]> {
		this.api.defaults.headers['X-Api-Key'] = this.invoiceReadKey
		return this.api
			.get<ILinks[]>('/links')
			.then(res => res.data)
			.catch((err: AxiosError) => {
				throw err
			})
	}

	updatePayLink(params: {
		amount: number;
		comment_chars: number;
		description: string;
		max: number;
		min: number;
		pay_id: number;
	}): Promise<ILinks> {
		this.api.defaults.headers['X-Api-Key'] = this.adminKey
		return this.api
			.put<ILinks>(`/links/${params.pay_id}`, params)
			.then(res => res.data)
			.catch((err: AxiosError) => { throw err })
	}
}
