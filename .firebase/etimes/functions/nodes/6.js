

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/guide/_slug_/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/6.1ce17646.js","_app/immutable/chunks/scheduler.bb964b1c.js","_app/immutable/chunks/index.cbeecc46.js","_app/immutable/chunks/index.5c709ea5.js"];
export const stylesheets = ["_app/immutable/assets/6.cced0fe1.css"];
export const fonts = [];
