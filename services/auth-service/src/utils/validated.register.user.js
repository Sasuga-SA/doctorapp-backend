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
    errors.push("El nombre es obligatorio y debe tener al menos 2 caracteres.");
  }

  if (typeof data.lastName !== "string" || data.lastName.trim().length < 2) {
    errors.push(
      "El apellido es obligatorio y debe tener al menos 2 caracteres.",
    );
  }

  if (
    typeof data.email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())
  ) {
    errors.push("El correo electrónico no tiene un formato válido.");
  }

  if (typeof data.password !== "string" || data.password.trim().length < 8) {
    errors.push(
      "La contraseña es obligatoria y debe tener al menos 8 caracteres.",
    );
  }
  if (data.role === "doctor") {
    if (
      typeof data.specialty !== "string" ||
      data.specialty.trim().length === 0
    ) {
      errors.push("La especialidad es obligatoria para doctores.");
    } else if (!SPECIALTIES.includes(data.specialty)) {
      errors.push(`La especialidad "${data.specialty}" no es válida.`);
    }
  } else if (data.specialty) {
    errors.push("Solo los doctores pueden tener una especialidad.");
  }

  if (
    data.phone !== undefined &&
    (typeof data.phone !== "string" || data.phone.trim().length < 7)
  ) {
    errors.push("El teléfono debe tener al menos 7 dígitos si se proporciona.");
  }

  return errors;
}
