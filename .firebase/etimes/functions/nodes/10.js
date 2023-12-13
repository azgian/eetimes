

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/staking/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/10.b336a8db.js","_app/immutable/chunks/scheduler.bb964b1c.js","_app/immutable/chunks/index.cbeecc46.js","_app/immutable/chunks/access.41baeaa7.js","_app/immutable/chunks/navigation.5e118f30.js","_app/immutable/chunks/singletons.6989a244.js","_app/immutable/chunks/config.f88b2aac.js","_app/immutable/chunks/index.5c709ea5.js","_app/immutable/chunks/IconXi.36933520.js"];
export const stylesheets = ["_app/immutable/assets/10.4569d824.css"];
export const fonts = [];
