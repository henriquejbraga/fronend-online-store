const BASE_URL = 'https://api.mercadolibre.com/sites/MLB/';

async function callAPI(query) {
  try {
    const responseRaw = await fetch(query);
    const responseJSON = await responseRaw.json();
    return responseJSON;
  } catch (error) {
    console.log(`[Erro]: ${error}`);
    return null;
  }
}

export async function getCategories() {
  const CATEGORIES_ENDPOINT = `${BASE_URL}categories`;

  return callAPI(CATEGORIES_ENDPOINT);
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const CATEGORY_ENDPOINT = `${BASE_URL}search?category=${categoryId}`;
  const QUERY_ENDPOINT = `${BASE_URL}search?q=${query}`;
  const CATEGORY_QUERY_ENDPOINT = `${BASE_URL}search?category=${categoryId}&q=${query}`;

  if (categoryId && !query) {
    return callAPI(CATEGORY_ENDPOINT);
  }
  if (!categoryId && query) {
    return callAPI(QUERY_ENDPOINT);
  }
  return callAPI(CATEGORY_QUERY_ENDPOINT);
}
