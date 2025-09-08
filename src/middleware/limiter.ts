import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: process.env.NODE_ENV === "test" ? 999 : 10, // max 3 request per IP
  message: {
    status: 429,
    error: "Terlalu banyak percobaan login. Coba lagi setelah 15 menit.",
  },
  standardHeaders: true, // menambahkan header RateLimit
  legacyHeaders: false,
});

export const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 jam
  max: 3, // max 3 request per IP
  message: {
    status: 429,
    error: "Terlalu banyak percobaan register. Coba lagi setelah 1 jam.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const refreshLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: process.env.NODE_ENV === "test" ? 999 : 15, // max 15 request per IP
  message: {
    status: 429,
    error:
      "Terlalu banyak percobaan refresh token. Coba lagi setelah 15 menit.",
  },
  standardHeaders: true, // menambahkan header RateLimit
  legacyHeaders: false,
});
