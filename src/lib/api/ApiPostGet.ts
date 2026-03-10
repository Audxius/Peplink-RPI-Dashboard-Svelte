export const apiGet = async (path: string) => {
  const response = await fetch(path, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  });

  if (!response.ok) {
    throw new Error(`GET failed (${response.status})`);
  }

  return response.json();
};

export const apiPost = async (path: string, payload: any) => {
  const response = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`POST failed (${response.status})`);
  }

  return response.json();
};
