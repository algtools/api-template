import type { D1Migration } from "cloudflare:test";

export type Env = globalThis.Env & {
	MIGRATIONS: D1Migration[];
};

declare module "cloudflare:test" {
	interface ProvidedEnv extends Env {}
}
