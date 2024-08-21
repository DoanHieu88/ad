export function maskPhoneNumber(phoneNumber) {
  // Ensure the input is a string
  const phoneStr = phoneNumber.toString();

  // Check if the phone number length is sufficient to mask
  if (phoneStr.length < 10) {
    return "Invalid number"; // or throw an error depending on your use case
  }

  // Extract the first three digits, mask the middle digits, and show the last three digits
  return (
    phoneStr.substring(0, 3) +
    "*".repeat(phoneStr.length - 6) +
    phoneStr.substring(phoneStr.length - 3)
  );
}

export function secondsToMMSS(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  // Pad the minutes and seconds with leading zeros if needed
  const paddedMinutes = String(minutes).padStart(2, "0");
  const paddedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${paddedMinutes}:${paddedSeconds}`;
}
