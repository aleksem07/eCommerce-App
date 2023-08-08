export function validateForm(data: string, type: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  switch (data) {
    case "email":
      const isEmailValid = data.trim().match(emailRegex);
      return isEmailValid;
    case "password":
      const isPasswordValid = data.trim().match(passwordRegex);
      return isPasswordValid;
  }

  // Password validation
  const isPasswordValid = password.match(passwordRegex);

  // Return validation result
  return isEmailValid && isPasswordValid;
}
