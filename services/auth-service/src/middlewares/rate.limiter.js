const loginAttempts = {};

export const rateLimiter = (req, res, next) => {
  const ip = req.ip;
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const maxAttempts = 5;

  if (!loginAttempts[ip]) {
    loginAttempts[ip] = [];
  }

  loginAttempts[ip] = loginAttempts[ip].filter(
    (timestamp) => now - timestamp < windowMs,
  );

  if (loginAttempts[ip].length >= maxAttempts) {
    const oldestAttempt = loginAttempts[ip][0];
    const retryAfterMs = windowMs - (now - oldestAttempt);
    const retryAfterSec = Math.ceil(retryAfterMs / 1000);
    const retryAfterMin = Math.ceil(retryAfterSec / 60);

    return res.status(429).json({
      message: `Too many attempts. Try again in ${retryAfterMin} minutes.`,
      retryAfterSMin: retryAfterMin,
      retryAfterSec,
    });
  }

  loginAttempts[ip].push(now);
  next();
};
