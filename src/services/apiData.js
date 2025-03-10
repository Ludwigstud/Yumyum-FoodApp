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

export const createTenant = async (tenantName) => {
	const apiKey = await getApiKey();
	const response = await fetch("https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/tenants", {
		method: "POST",
		headers: {
			"x-zocom": apiKey,
			"Content-Type": "application/json",
			accept: "application/json",
		},
		body: JSON.stringify({ name: tenantName }),
	});
	return response.json();
};

export const submitOrder = async (tenantName, items) => {
	const apiKey = await getApiKey();
	

	const response = await fetch(
		`https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/${tenantName}/orders`,
		{
			method: "POST",
			headers: {
				"x-zocom": apiKey,
				"Content-Type": "application/json",
				accept: "application/json",
			},
			body: JSON.stringify({ items }),
		},
	);
	const data = await response.json();
	
	return data;
};

export const getOrders = async (tenantName) => {
	const apiKey = await getApiKey();
	const response = await fetch(
		`https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/${tenantName}/orders`,
		{
			method: "GET",
			headers: {
				"x-zocom": apiKey,
				accept: "application/json",
			},
		},
	);
	return response.json();
};

export const getOrderById = async (tenantName, orderId) => {
	const apiKey = await getApiKey();
	const response = await fetch(
		`https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/${tenantName}/orders/${orderId}`,
		{
			method: "GET",
			headers: {
				"x-zocom": apiKey,
				accept: "application/json",
			},
		},
	);
	return response.json();
};

export const getReceiptById = async (receiptId) => {
	const apiKey = await getApiKey();
	const response = await fetch(
		`https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/receipts/${receiptId}`,
		{
			method: "GET",
			headers: {
				"x-zocom": apiKey,
				accept: "application/json",
			},
		},
	);
	return response.json(); // Add this return statement
};
