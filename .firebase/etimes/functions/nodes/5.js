

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/guide/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.5784ea13.js","_app/immutable/chunks/scheduler.bb964b1c.js","_app/immutable/chunks/index.cbeecc46.js","_app/immutable/chunks/index.5c709ea5.js"];
export const stylesheets = ["_app/immutable/assets/5.563838a8.css"];
export const fonts = [];
