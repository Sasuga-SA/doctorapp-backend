export function validateUserUtil(data) {
  const errors = [];

  if (
    typeof data.email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())
  ) {
    errors.push("Email does not have a valid format.");
  }

  if (typeof data.password !== "string" || data.password.trim().length < 8) {
    errors.push("Password is required and must have at least 8 characters.");
  }

  if (data.role && typeof data.role !== "string") {
    errors.push("Role must be a string.");
  }

  return errors;
}
