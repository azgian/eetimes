import { writable } from 'svelte/store';
export const mb = writable<Mb>();
export const isLoggedIn = writable(false);
export interface Mb {
    mb_id: string;
    mb_password: string;
    re_id: string;
    mb_name: string;
    mb_email: string;
    mb_level: number;
    mb_hp: string;
    mb_bank: string;
    mb_point: number;
    mb_memo: string;
    mb_token: string;
}
export const searchMbList = writable<Mb[]>([]);