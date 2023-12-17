import { goto } from '$app/navigation';
import { isLoggedIn } from '$lib/api/store';
export const siteDomain = '';
export const siteHost = '//' + siteDomain;
export const logoutLimitedTime = 600; // 10분
export const getLogout = (): void => {
	if(!isLoggedIn) goto('/');
}
export const resetTimer = (): void => {
	document.getElementById('btnTimer')?.click();
};
export const addCommas = (num: number): string => {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
export const getCopyText = (content: string) => {
	navigator.clipboard.writeText(content);
};
export const getEmailMatch = (email: string) => {
	const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
	if (!email || email.match(regExp) == null) return false;
	else return true;
};
export const scrollToId = (elmId: string) => {
	const element = document.getElementById(elmId);
	if (element) {
		element.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
			inline: 'nearest'
		});
	}
};
export const itemArray = [
	{ name: 'USDT', logo: 'coin_usdt' },
	{ name: 'USDT', logo: 'coin_usdt' },
	{ name: 'USDT', logo: 'coin_usdt' },
	{ name: 'KRW', logo: 'coin_krw' },
	{ name: 'KRW', logo: 'coin_krw' },
	{ name: 'KRW', logo: 'coin_krw' },
]
export const ibLv = 4;
export const brLv = 6;
export const sys7Lv = 7;
export const sys8Lv = 8;
export const sys9Lv = 9;
export const sys10Lv = 10;
export const lvArray = [
	{ lv: 1, name: '비회원', ref: null },
	{ lv: 2, name: '회원', ref: null },
	{ lv: ibLv, name: 'IB', ref: null },
	{ lv: brLv, name: 'CO', ref: null },
	{ lv: sys7Lv, name: 'CO', ref: null },
	{ lv: sys8Lv, name: 'SYS', ref: null },
	{ lv: sys9Lv, name: 'SYS', ref: null },
	{ lv: sys10Lv, name: 'SYS', ref: null }
];
export const lvArray2 = [
	{ lv: 1, name: '비회원', ref: null },
	{ lv: 2, name: '회원', ref: null }
];
export const lvColorArray = [
	{ lv: 1, name: 'surface' },
	{ lv: 2, name: 'primary' },
	{ lv: 4, name: 'warning' },
	{ lv: 6, name: 'surface' },
	{ lv: 7, name: 'secondary' },
	{ lv: 8, name: 'secondary' },
	{ lv: 9, name: 'secondary' },
	{ lv: 10, name: 'secondary' }
];

export const getLvName = (lv: number) => {
	const lvObj = lvArray.find((obj) => obj.lv === lv);
	return lvObj?.name;
};
export const lvNameElm = (lv: number) => {
	const lvColorObj = lvColorArray.find((obj) => obj.lv === lv);
	const color = lvColorObj?.name;
	return '<span class="badge variant-filled-' + color + '">' + getLvName(lv) + '</span>';
};

export const getUsdtPrice = async () => {
	const itemApiUrl = 'https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD'
	const response = await fetch(itemApiUrl);
	const data = await response.json();
	return Math.floor(data[0]['basePrice'] * 1 + 50);
}

export const getBnbPrice = async () => {
	const itemApiUrl = 'https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT'
	const response = await fetch(itemApiUrl);
	const data = await response.json();
	const usdtPrice = await getUsdtPrice();
	return data['price'] * usdtPrice * 1.0355;
}

export const getItemPrice = async (itemName: string) => {
	if (itemName === 'USDT'||itemName === 'NETELLER')
		return getUsdtPrice();
	else if (itemName === 'BNB')
		return getBnbPrice();
	const itemApiUrl = 'https://crix-api-endpoint.upbit.com/v1/crix/candles/days/?code=CRIX.UPBIT.KRW-' + itemName;
	const response = await fetch(itemApiUrl);
	const data = await response.json();
	return data[0]['tradePrice'];
}