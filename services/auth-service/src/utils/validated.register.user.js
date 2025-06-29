const SPECIALTIES = [
  "Alergólogo",
  "Anestesiólogo",
  "Cardiólogo",
  "Cirujano cardiovascular",
  "Cirujano general",
  "Cirujano maxilofacial",
  "Cirujano plástico",
  "Dermatólogo",
  "Endocrinólogo",
  "Fisiatra",
  "Fisioterapeuta",
  "Gastroenterólogo",
  "Geriatra",
  "Ginecólogo",
  "Hematólogo",
  "Infectólogo",
  "Internista",
  "Médico del deporte",
  "Médico familiar",
  "Médico general",
  "Neumólogo",
  "Neurólogo",
  "Nutriólogo",
  "Obstetra",
  "Odontólogo",
  "Oftalmólogo",
  "Oncólogo",
  "Ortopedista",
  "Otorrinolaringólogo",
  "Patólogo",
  "Pediatra",
  "Podólogo",
  "Psiquiatra",
  "Psicólogo clínico",
  "Psicoterapeuta",
  "Radiólogo",
  "Reumatólogo",
  "Sexólogo",
  "Terapeuta ocupacional",
  "Traumatólogo",
  "Urólogo",
];

export function validateUserUtil(data) {
  const errors = [];

  if (typeof data.firstName !== "string" || data.firstName.trim().length < 2) {
    errors.push("First name is required and must have at least 2 characters.");
  }

  if (typeof data.lastName !== "string" || data.lastName.trim().length < 2) {
    errors.push(
      "Last name is required and must have at least 2 characters.",
    );
  }

  if (
    typeof data.email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())
  ) {
    errors.push("Email does not have a valid format.");
  }

  if (typeof data.password !== "string" || data.password.trim().length < 8) {
    errors.push(
      "Password is required and must have at least 8 characters.",
    );
  }
  if (data.role === "doctor") {
    if (
      typeof data.specialty !== "string" ||
      data.specialty.trim().length === 0
    ) {
      errors.push("Specialty is required for doctors.");
    } else if (!SPECIALTIES.includes(data.specialty)) {
      errors.push(`Specialty "${data.specialty}" is not valid.`);
    }
  } else if (data.specialty) {
    errors.push("Only doctors can have a specialty.");
  }

  if (
    data.phone !== undefined &&
    (typeof data.phone !== "string" || data.phone.trim().length < 7)
  ) {
    errors.push("Phone must have at least 7 digits if provided.");
  }

  return errors;
}
