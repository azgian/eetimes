// import type { Action, PageServerLoad } from './$types';
// import { accessApi } from '$lib/api/access';
// export const load: PageServerLoad = async ({ locals }) => {
//     return {};
// }

// const reqCode:Action = async ({ request }) => {
//     const data = await request.formData();
//     const email = data.get('email');
//     const isRegister = data.get('isRegister');
//     const params = { email, isRegister }
//     const res = await accessApi('member/reqCode', params);
//     initCode = res.initCode;

// } 