/* eslint-disable @typescript-eslint/naming-convention */
import axios, { AxiosError, AxiosInstance } from 'axios'
import { ILNBitsConfig } from './model'



interface ITPoS {
	currency: string
	id: string
	name: string
	wallet: string
}

export class LNBitsTPoSClass {

	constructor(params: ILNBitsConfig) {
		this.adminKey = params?.adminKey ? params.adminKey : ''
		this.invoiceReadKey = params?.invoiceReadKey ? params.invoiceReadKey : ''
		this.endpoint = params.endpoint || this.endpoint
		this.api = axios.create({
			baseURL: `${this.endpoint}/tpos/api/v1`,
			headers: {
				'Content-Type': 'application/json',
			},
		})
	}
	private adminKey = ''
	private api: AxiosInstance
	private endpoint = 'https://legend.lnbits.com'
	private invoiceReadKey = ''

	createTPoS(params: {
		currency: string;
		name: string;
	}): Promise<ITPoS> {
		this.api.defaults.headers['X-Api-Key'] = this.invoiceReadKey
		return this.api
			.post<ITPoS>('/tposs', params)
			.then(res => res.data)
			.catch((err: AxiosError) => { throw err })
	}

	deleteTPoS(params: { tpos_id: string }): Promise<boolean> {
		this.api.defaults.headers['X-Api-Key'] = this.adminKey
		return this.api
			.delete(`/tposs/${params.tpos_id}`)
			.then(() => true)
			.catch(() => false)
	}

	getTPoS(): Promise<ITPoS[]> {
		this.api.defaults.headers['X-Api-Key'] = this.invoiceReadKey
		return this.api
			.get<ITPoS[]>('/tposs')
			.then(res => res.data)
			.catch((err: AxiosError) => { throw err })
	}
}
