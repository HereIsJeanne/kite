let cachedSpf50Data = [];

export async function fetchSpf50Data() {
  if (cachedSpf50Data.length === 0) {
    const res = await fetch('https://sheetdb.io/api/v1/pbw45bqdwlytn');
    const data = await res.json();
    cachedSpf50Data = data;
  }
  return cachedSpf50Data;
}

export async function fetchSpf50Ids() {
    const spf50Data = await fetchSpf50Data();
    const ids = spf50Data.map((item) => item.ID.toString());
    return ids;
  }
