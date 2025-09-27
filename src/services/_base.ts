export const getRequest = async <T>(url: string) => {
  try {
    const res = await fetch(url, {method: "GET"});
    const json = await res.json();
    return json as T;
  }
  catch (ex) {
    console.error(ex);
    throw ex;
  }
}