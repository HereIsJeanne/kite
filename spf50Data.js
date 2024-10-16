export async function fetchSpf50Data() {
  const res = await fetch('https://sheetdb.io/api/v1/pbw45bqdwlytn');
  const data = await res.json();
  return data;
}

export async function fetchSpf50Ids() {
  const spf50Data = await fetchSpf50Data();
  const ids = spf50Data.map((item) => item.ID.toString());
  return ids;
}
