const BASE_URL = import.meta.env.VITE_WEBSITE_URL || '/api/v1';

export type Genre = {
  id: string;
  name: string;
};

export async function getAll(): Promise<Genre[] | undefined> {
  try {
    const res = await fetch(`${BASE_URL}/genre`, { mode: 'cors' });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
