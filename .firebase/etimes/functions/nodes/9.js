

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/news/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/9.77e06714.js","_app/immutable/chunks/scheduler.bb964b1c.js","_app/immutable/chunks/index.cbeecc46.js","_app/immutable/chunks/stores.ab89cfaa.js","_app/immutable/chunks/singletons.6989a244.js"];
export const stylesheets = ["_app/immutable/assets/9.b64b3c02.css"];
export const fonts = [];
