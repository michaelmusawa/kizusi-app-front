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

export const calculateCancellationDetails = (
  bookingDate: Date | undefined,
  // eslint-disable-next-line prettier/prettier
  amount: number
) => {
  const currentDate = new Date();
  const bookingDateObj = new Date(bookingDate ?? "");

  // Ensure we're working with numbers for the time difference
  const timeDiff = bookingDateObj.getTime() - currentDate.getTime();
  const daysDiff = timeDiff / (1000 * 3600 * 24);

  let cancellationFee = 0;
  let refundAmount = amount;

  if (daysDiff.toFixed(0) > "2") {
    // More than 2 days prior: No fee
    cancellationFee = 0;
    refundAmount = amount;
  } else if (daysDiff.toFixed(0) === "1") {
    // 1 day prior: 20% fee based on 50% of the amount
    console.log("im here");
    cancellationFee = 0.2 * (0.5 * amount);
    refundAmount = amount - cancellationFee;
  } else if (daysDiff <= 0) {
    // Same day or no-show: No refund
    cancellationFee = amount;
    refundAmount = 0;
  }

  console.log(daysDiff.toFixed(0), cancellationFee, refundAmount);

  return { daysDiff, cancellationFee, refundAmount };
};

export function calculateDaysBetween(
  startDate: Date | string,
  endDate: Date | string
): number {
  if (!startDate || !endDate) {
    throw new Error("Both startDate and endDate are required.");
  }

  // Convert strings to Date objects if necessary
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error(
      "Invalid date format. Ensure you pass valid Date objects or ISO date strings."
    );
  }

  // Normalize to midnight to avoid time zone issues
  const normalizedStart = new Date(
    start.getFullYear(),
    start.getMonth(),
    start.getDate()
  );
  const normalizedEnd = new Date(
    end.getFullYear(),
    end.getMonth(),
    end.getDate()
  );

  // Calculate the difference in days
  const msInDay = 1000 * 60 * 60 * 24;
  const diffInMs = normalizedEnd.getTime() - normalizedStart.getTime();
  const days = Math.round(diffInMs / msInDay) + 1;

  return days === 0 ? 1 : days;
}
