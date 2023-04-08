import { ILNBitsConfig } from './model'
import { LNBitsPaylinkClass } from './paylink'
import { LNBitsPaywallClass } from './paywall'
import { LNBitsTPoSClass } from './tpos'
import { LNBitsUserManagerClass } from './usermanager'
import { LNBitsWalletClass } from './wallet'
import { LNBitsWithdrawClass } from './withdraw'



export default (
	params: ILNBitsConfig
): {
	paylink: LNBitsPaylinkClass;
	paywall: LNBitsPaywallClass;
	tpos: LNBitsTPoSClass;
	userManager: LNBitsUserManagerClass;
	wallet: LNBitsWalletClass;
	withdraw: LNBitsWithdrawClass;
} =>
	({
		wallet: new LNBitsWalletClass(params),
		userManager: new LNBitsUserManagerClass(params),
		paywall: new LNBitsPaywallClass(params),
		withdraw: new LNBitsWithdrawClass(params),
		paylink: new LNBitsPaylinkClass(params),
		tpos: new LNBitsTPoSClass(params),
	})
