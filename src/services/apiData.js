export const getApiKey = async () => {
	const apiKey = await fetch("https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/keys", {
		method: "POST",
	});
	return apiKey.json();
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

export const getOrCreateTenant = async () => {
	const storedTenant = localStorage.getItem("yumyum_tenant");

	if (storedTenant) {
		console.log("Using existing tenant:", storedTenant);
		return storedTenant;
	}

	const timestamp = new Date().getTime().toString().slice(-5);
	const newTenantName = `yumyum_${timestamp}`;
	console.log("Generated new tenant name:", newTenantName);

	try {
		const result = await createTenant(newTenantName);
		console.log("Created new tenant:", newTenantName, result);

		localStorage.setItem("yumyum_tenant", newTenantName);

		return newTenantName;
	} catch (error) {
		console.error("Failed to create tenant:", error);

		return "yumyum_fallback";
	}
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

export const fetchReceipt = async (orderId) => {
	if (!orderId) {
		return null;
	}

	try {
		const apiKey = await getApiKey();
		const response = await fetch(
			`https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/receipts/${orderId}`,
			{
				headers: {
					accept: "application/json",
					"x-zocom": apiKey,
				},
			},
		);

		if (response.ok) {
			const data = await response.json();
			console.log("Receipt data:", data);
			return data.receipt;
		} else {
			console.error("Failed to fetch receipt:", response.status);
			return null;
		}
	} catch (error) {
		console.error("Error fetching receipt:", error);
		return null;
	}
};
