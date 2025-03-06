export const getApiKey = async () => {
	const apiKey = await fetch("https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/keys", {
		method: "POST",
	});
	return apiKey.json();
};

export const getMenu = async () => {
	const apiKey = await getApiKey();
	const resp = await fetch("https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/menu", {
		method: "GET",
		headers: { "x-zocom": apiKey, accept: "application/json" },
	});
	const data = await resp.json();
	return data.items;
};
