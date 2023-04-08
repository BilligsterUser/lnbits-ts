/* eslint-disable @typescript-eslint/naming-convention */
import axios, { AxiosError, AxiosInstance } from 'axios'
import { ILNBitsConfig } from './model'



interface ILinks {
	id: string
	is_unique: boolean
	k1: string
	lnurl: string
	max_withdrawable: number
	min_withdrawable: number
	number: number
	open_time: number
	title: string
	unique_hash: string
	used: number
	uses: number
	usescsv: string
	wait_time: number
	wallet: string
}

export class LNBitsWithdrawClass {

	constructor(params: ILNBitsConfig) {
		this.adminKey = params.adminKey
		this.invoiceReadKey = params.invoiceReadKey
		this.endpoint = params.endpoint || this.endpoint
		this.api = axios.create({
			baseURL: `${this.endpoint}/withdraw/api/v1`,
			headers: {
				'Content-Type': 'application/json',
			},
		})
	}
	private adminKey = ''
	private api: AxiosInstance
	private endpoint = 'https://lnbits.com'
	private invoiceReadKey = ''

	createLink(params: {
		is_unique: boolean;
		max_withdrawable: number;
		min_withdrawable: number;
		title: string;
		uses: number;
		wait_time: number;
	}): Promise<ILinks> {
		this.api.defaults.headers['X-Api-Key'] = this.adminKey
		return this.api
			.post<ILinks>('/links', params)
			.then(res => res.data)
			.catch((err: AxiosError) => { throw err })
	}

	deleteLink (params: { withdraw_id: string }): Promise<boolean> {
		this.api.defaults.headers['X-Api-Key'] = this.adminKey
		return this.api
			.delete(`/links/${params.withdraw_id}`)
			.then(() => true)
			.catch(() => false)
	}

	getLinks(params?: { withdraw_id?: string }): Promise<ILinks[]>{
		this.api.defaults.headers['X-Api-Key'] = this.invoiceReadKey
		let url = '/links'
		if (params?.withdraw_id) {
			url = `/links/${params?.withdraw_id}`
		}
		return this.api
			.get<ILinks[]>(url)
			.then(res => res.data)
			.catch((err: AxiosError) => { throw err })
	}

	updateLink(params: {
		is_unique: boolean;
		max_withdrawable: number;
		min_withdrawable: number;
		title: string;
		uses: number;
		wait_time: number;
		withdraw_id: string;
	}): Promise<ILinks>  {
		this.api.defaults.headers['X-Api-Key'] = this.adminKey
		return this.api
			.put<ILinks>(`/links/${params.withdraw_id}`, params)
			.then(res => res.data)
			.catch((err: AxiosError) => { throw err })
	}
}
