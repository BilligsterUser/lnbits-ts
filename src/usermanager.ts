/* eslint-disable @typescript-eslint/naming-convention */
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import { ILNBitsConfig, WithRequiredProp } from './model'



interface Users {
	admin: string
	email: string
	id: string
	name: string
	password: string
}

export class LNBitsUserManagerClass {

	constructor(params: /* WithRequiredProp< */ILNBitsConfig/* , 'invoiceReadKey'> */) {
		this.invoiceReadKey = params?.invoiceReadKey ? params.invoiceReadKey : ''
		this.endpoint = params.endpoint || this.endpoint
		this.api = axios.create({
			baseURL: `${this.endpoint}/usermanager/api/v1`,
			headers: {
				'Content-Type': 'application/json',
			},
		})
	}
	private api: AxiosInstance
	private endpoint = 'https://legend.lnbits.com'
	private invoiceReadKey = ''

	activeExtension(params: {
		active: boolean;
		extension: string;
		userid: string;
	}): Promise<AxiosResponse> {
		this.api.defaults.headers['X-Api-Key'] = this.invoiceReadKey
		return this.api
			.post('/extensions', params)
			.then(res => res)
			.catch((err: AxiosError) => { throw err })
	}

	createUser(params: {
		admin_id: string;
		user_name: string;
		wallet_name: string;
	}): Promise<AxiosResponse> {
		this.api.defaults.headers['X-Api-Key'] = this.invoiceReadKey
		return this.api
			.post('/users', params)
			.then(res => res)
			.catch(err => { throw err })
	}

	createWallet(params: {
		admin_id: string;
		user_id: string;
		wallet_name: string;
	}): Promise<AxiosResponse> {
		this.api.defaults.headers['X-Api-Key'] = this.invoiceReadKey
		return this.api
			.post('/wallets/', params)
			.then(res => res)
			.catch((err: AxiosError) => { throw err })
	}

	deleteUser(params: { user_id: string }): Promise<boolean> {
		this.api.defaults.headers['X-Api-Key'] = this.invoiceReadKey
		return this.api
			.delete(`/users/${params.user_id}`)
			.then(() => true)
			.catch(() => false)
	}

	deleteWallet(params: { wallet_id: string }): Promise<boolean> {
		this.api.defaults.headers['X-Api-Key'] = this.invoiceReadKey
		return this.api
			.delete(`/wallets/${params.wallet_id}`)
			.then(() => true)
			.catch(() => false)
	}

	getTransactions(params: { wallet_id: string }): Promise<Users[]> {
		this.api.defaults.headers['X-Api-Key'] = this.invoiceReadKey
		return this.api
			.get<Users[]>(`/wallets/${params.wallet_id}`)
			.then(res => res.data)
			.catch((err: AxiosError) => { throw err })
	}

	getUsers(): Promise<Users[]> {
		this.api.defaults.headers['X-Api-Key'] = this.invoiceReadKey
		return this.api
			.get<Users[]>('/users')
			.then(res => res.data)
			.catch((err: AxiosError) => { throw err })
	}

	getWallets(params?: { user_id?: string }): Promise<Users[]> {
		this.api.defaults.headers['X-Api-Key'] = this.invoiceReadKey
		let url = '/wallets'
		if (params) {
			url = `/wallets/${params.user_id}`
		}
		return this.api
			.get<Users[]>(url)
			.then(res => res.data)
			.catch((err: AxiosError) => { throw err })
	}
}
