import { ApiException } from "chanfana";
import { describe, expect, it } from "vitest";
import app from "../../src/index";

app.get("/__test_api_exception", () => {
	throw new ApiException("Boom");
});

app.get("/__test_generic_exception", () => {
	throw new Error("Boom");
});

describe("Global error handler", () => {
	it("formats ApiException errors", async () => {
		const response = await app.request("http://local.test/__test_api_exception");
		const body = await response.json<{
			success: boolean;
			errors: unknown[];
		}>();

		expect(response.status).toBeGreaterThanOrEqual(400);
		expect(response.status).toBeLessThan(600);
		expect(body.success).toBe(false);
		expect(Array.isArray(body.errors)).toBe(true);
	});

	it("returns a generic 500 for unknown errors", async () => {
		const response = await app.request("http://local.test/__test_generic_exception");
		const body = await response.json<{
			success: boolean;
			errors: Array<{ code: number; message: string }>;
		}>();

		expect(response.status).toBe(500);
		expect(body.success).toBe(false);
		expect(body.errors[0].code).toBe(7000);
	});
});
