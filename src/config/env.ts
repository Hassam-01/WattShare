
if (typeof process !== "undefined" && process.env) {
	const dotenv = await import("dotenv");
	dotenv.config();
}

export const imgBBAPI = import.meta.env.VITE_IMGBB_API_KEY || "";
