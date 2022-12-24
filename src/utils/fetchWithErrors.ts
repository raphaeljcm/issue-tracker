export async function fetchWithErrors<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(url, options);
  const body = await response.json();

  let errorMessage = '';

  if (response.status !== 200 && body.error) {
    errorMessage += `Request failed with status ${response.status}. `;
    errorMessage += body.error ? body.error : 'An error has occurred';
  }

  if (errorMessage) throw new Error(errorMessage);

  return body;
}

// to simulate an error, set this to the request header
// it will make it so there's a 50% chance of a failed request
/*
  headers: {
    "x-error": true
  }
*/
