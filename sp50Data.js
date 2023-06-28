let cachedSp50Data = [];

export async function fetchSp50Data() {
  if (cachedSp50Data.length === 0) {
    const res = await fetch('https://sheetdb.io/api/v1/a9594qqvqa75e');
    const data = await res.json();
    cachedSp50Data = data;
  }
  return cachedSp50Data;
}

export async function fetchSp50Ids() {
    const sp50Data = await fetchSp50Data();
    const ids = sp50Data.map((item) => item.ID.toString());
    return ids;
  }
