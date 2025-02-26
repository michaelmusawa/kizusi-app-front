export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Format the time to always show 2 digits for minutes and seconds
  const formattedTime = `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}`;

  // Return the formatted date and time
  return `${day < 10 ? "0" + day : day} ${month} ${year}, ${formattedTime}`;
}

export const validatePassword = (password: string) => {
  const minLength = /.{6,}/; // At least 6 characters
  const upperCase = /[A-Z]/; // At least one uppercase letter
  const lowerCase = /[a-z]/; // At least one lowercase letter
  const number = /[0-9]/; // At least one number
  const specialChar = /[!@#$%^&*]/; // At least one special character

  if (!minLength.test(password)) {
    return "Password must be at least 6 characters long.";
  }
  if (!upperCase.test(password)) {
    return "Password must include at least one uppercase letter.";
  }
  if (!lowerCase.test(password)) {
    return "Password must include at least one lowercase letter.";
  }
  if (!number.test(password)) {
    return "Password must include at least one number.";
  }
  if (!specialChar.test(password)) {
    return "Password must include at least one special character.";
  }

  return "";
};
