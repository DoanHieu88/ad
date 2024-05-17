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
