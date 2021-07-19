export async function consultaApi(url) {
  let arr = [];
  try {
    const resultado = await fetch(url);
    const res = await resultado.json();
    console.log(res);
    if (res.errorMessage) throw alert("Peticiones a la API sobrepasadas");
    const items = res.items;
    arr = items.slice(0, 10);
    console.log(arr);
    return arr;
  } catch (error) {
    console.log(error);
  }
}
