export function validateForm(data: string, type: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  let isEmailValid, isPasswordValid;

  switch (type) {
    case "email":
      isEmailValid = data.trim().match(emailRegex);
      return isEmailValid;
    case "password":
      isPasswordValid = data.trim().match(passwordRegex);
      return isPasswordValid;
  }
}
