import axios, { AxiosError, AxiosInstance } from 'axios'
import { ILNBitsConfig } from './model'
import { ICheckInvoice, ICreateInvoice, ICreateInvoiceParam, IPayInvoice, IWalletDetails } from './model/wallet'

export class LNBitsWalletClass {
	readonly #adminKey: string
	readonly #api: AxiosInstance
	readonly #endpoint: string = 'https://legend.lnbits.com'
	readonly #invoiceReadKey: string

	constructor(params: ILNBitsConfig) {
		this.#adminKey = params?.adminKey ? params.adminKey : ''
		this.#invoiceReadKey = params?.invoiceReadKey ? params.invoiceReadKey : ''
		this.#endpoint = params.endpoint || this.#endpoint
		this.#api = axios.create({
			baseURL: `${this.#endpoint}/api/v1`,
			// eslint-disable-next-line @typescript-eslint/naming-convention
			headers: { 'Content-Type': 'application/json' },
		})
	}

	// eslint-disable-next-line @typescript-eslint/naming-convention
	checkInvoice(payment_hash: string): Promise<ICheckInvoice> {
		this.#api.defaults.headers['X-Api-Key'] = this.#invoiceReadKey
		return this.#api
			.get<ICheckInvoice>(`/payments/${payment_hash}`)
			.then(res => res.data)
			.catch((err: AxiosError) => { throw err })
	}

	createInvoice(params: ICreateInvoiceParam): Promise<ICreateInvoice> {
		this.#api.defaults.headers['X-Api-Key'] = this.#invoiceReadKey
		// lnbits does not like empty values
		return this.#api
			.post<ICreateInvoice>('/payments', params)
			.then(res => res.data)
			.catch((err: AxiosError) => { throw err })
	}

	payInvoice(bolt11: string): Promise<IPayInvoice> {
		this.#api.defaults.headers['X-Api-Key'] = this.#adminKey
		return this.#api
			.post<IPayInvoice>('/payments', { bolt11, out: true })
			.then(res => res.data)
			.catch((err: AxiosError) => { throw err })
	}

	walletDetails(): Promise<IWalletDetails> {
		this.#api.defaults.headers['X-Api-Key'] = this.#invoiceReadKey
		return this.#api
			.get<IWalletDetails>('/wallet')
			.then(res => res.data)
			.catch((err: AxiosError) => { throw err })
	}
}
