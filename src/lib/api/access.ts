import { dev } from '$app/environment';
import { goto } from '$app/navigation';
import { mb,isLoggedIn } from '$lib/api/store';
import { get } from 'svelte/store';
export const accessApi = async (accessUrl: string, obj: object={}, method='POST') => {
    const mbId = get(mb)?.mb_id;
    const mbToken = get(mb)?.mb_token;
    const siteCode = 'eetimes';
    const API_ENDPOINT = 'https://fynx.cc/api/routes/';
    const authInfo = {
        mbId,
        mbToken,
        siteCode
    }
    const params = {
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            authInfo,
            ...obj
        })
    };
    // console.log('api root params:: ', params);
    const res = await fetch(API_ENDPOINT + accessUrl, params);
    const { data } = await res.json();
    if (data.msg === 'x!') {
        if (dev) console.log('Invalid access token')
        isLoggedIn.set(false);
        goto('/');
        ///toast 띄우는 코드
    }
    return data;
}

export const resetMb = async (mbId: string) => {
    const params = { mbId }
    await accessApi('member/resetMb', params);
    const data = await accessApi('member/resetMb', params);
    mb.set(data.mb);
}