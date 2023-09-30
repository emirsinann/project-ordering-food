

export default function checkTokenExpiration() {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    const parts = accessToken.split(".");

    const payload = parts[1];

    const decodedPayload = atob(payload);

    const payloadObj = JSON.parse(decodedPayload);

    const expirationTime = payloadObj.exp * 1000; // Convert to milliseconds


    if (Date.now() > expirationTime) {
      return true; // Token has expired
    }
  }

  return false; // Token is still valid
}
