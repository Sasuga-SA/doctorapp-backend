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

export function validateProfileUtil(data) {
  const errors = [];

  // userId validation (required)
  if (!data.userId || typeof data.userId !== "string") {
    errors.push("UserId is required and must be a string.");
  }

  // firstName validation (required, 2-50 characters)
  if (
    typeof data.firstName !== "string" ||
    data.firstName.trim().length < 2 ||
    data.firstName.trim().length > 50
  ) {
    errors.push("First name is required and must be between 2 and 50 characters.");
  }

  // lastName validation (required, 2-50 characters)
  if (
    typeof data.lastName !== "string" ||
    data.lastName.trim().length < 2 ||
    data.lastName.trim().length > 50
  ) {
    errors.push("Last name is required and must be between 2 and 50 characters.");
  }

  // dateOfBirth validation (optional, date format)
  if (data.dateOfBirth !== undefined && data.dateOfBirth !== null) {
    const date = new Date(data.dateOfBirth);
    if (isNaN(date.getTime())) {
      errors.push("Date of birth must be a valid date.");
    }
  }

  // gender validation (optional, specific values)
  if (data.gender !== undefined && data.gender !== null) {
    const validGenders = ["male", "female", "other"];
    if (!validGenders.includes(data.gender)) {
      errors.push("Gender must be one of: male, female, other.");
    }
  }

  // phone validation (optional, phone format)
  if (data.phone !== undefined && data.phone !== null) {
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
    if (typeof data.phone !== "string" || !phoneRegex.test(data.phone.trim())) {
      errors.push("Phone must be a valid phone number format.");
    }
  }

  // address validation (optional)
  if (data.address !== undefined && data.address !== null) {
    if (typeof data.address !== "string") {
      errors.push("Address must be a string.");
    }
  }

  // city validation (optional, maximum 100 characters)
  if (data.city !== undefined && data.city !== null) {
    if (typeof data.city !== "string" || data.city.trim().length > 100) {
      errors.push("City must be a string with maximum 100 characters.");
    }
  }

  // state validation (optional, maximum 100 characters)
  if (data.state !== undefined && data.state !== null) {
    if (typeof data.state !== "string" || data.state.trim().length > 100) {
      errors.push("State must be a string with maximum 100 characters.");
    }
  }

  // country validation (optional, maximum 100 characters)
  if (data.country !== undefined && data.country !== null) {
    if (typeof data.country !== "string" || data.country.trim().length > 100) {
      errors.push("Country must be a string with maximum 100 characters.");
    }
  }

  // postalCode validation (optional, maximum 20 characters)
  if (data.postalCode !== undefined && data.postalCode !== null) {
    if (typeof data.postalCode !== "string" || data.postalCode.trim().length > 20) {
      errors.push("Postal code must be a string with maximum 20 characters.");
    }
  }

  // profilePicture validation (optional, maximum 255 characters)
  if (data.profilePicture !== undefined && data.profilePicture !== null) {
    if (typeof data.profilePicture !== "string" || data.profilePicture.trim().length > 255) {
      errors.push("Profile picture URL must be a string with maximum 255 characters.");
    }
  }

  // bio validation (optional)
  if (data.bio !== undefined && data.bio !== null) {
    if (typeof data.bio !== "string") {
      errors.push("Bio must be a string.");
    }
  }

  // specialty validation (optional, must be one of the valid specialties)
  if (data.specialty !== undefined && data.specialty !== null) {
    if (typeof data.specialty !== "string" || data.specialty.trim().length === 0) {
      errors.push("Specialty must be a non-empty string.");
    } else if (!SPECIALTIES.includes(data.specialty)) {
      errors.push(`Specialty "${data.specialty}" is not valid.`);
    }
  }

  // isActive validation (optional, boolean)
  if (data.isActive !== undefined && data.isActive !== null) {
    if (typeof data.isActive !== "boolean") {
      errors.push("Is active must be a boolean value.");
    }
  }

  return errors;
} 