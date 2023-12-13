

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.0c6a3615.js","_app/immutable/chunks/scheduler.bb964b1c.js","_app/immutable/chunks/index.cbeecc46.js","_app/immutable/chunks/stores.ab89cfaa.js","_app/immutable/chunks/singletons.6989a244.js"];
export const stylesheets = [];
export const fonts = [];
