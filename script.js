document.getElementById("body").addEventListener("load", insertProductsInTable());
document.getElementById("add_new_product_button").addEventListener("click", showNewProductForm);
document.getElementById("create_product_form").addEventListener("submit", createNewProduct);

function showNewProductForm() {
	const create_product_popup = document.getElementById("create_product_popup");
	const display = create_product_popup.style.display;

	create_product_popup.style.display = display === "none" ? "block" : "none";
}

function createNewProduct(event) {
	event.preventDefault();
	const datas = getFormData(event.target);
	insertProductInLocalStorage(datas);
	insertProductsInTable();
	showNewProductForm();
}

function getFormData(form) {
	const form_data = new FormData(form);
	return Object.fromEntries(form_data);
}

function insertProductInLocalStorage(data) {
	const products_in_local_storage = getProductsFromLocalStorage();
	const products_for_insert = returnProductsArrayToInsertInLocalStorage(data, products_in_local_storage);
	localStorage.setItem("products", JSON.stringify(products_for_insert));
}

function getProductsFromLocalStorage() {
	const products = localStorage.getItem("products");
	return products ? JSON.parse(products) : [];
}

function returnProductsOrderedByPrice(products) {
	const ordered_products = products.sort((a, b) => a.price - b.price);
	return ordered_products;
}

function returnProductsArrayToInsertInLocalStorage(new_product, products) {
	const products_for_insert = [new_product];
	if (products.length > 0) {
		products_for_insert.push(...products);
	}
	else if (products.length === 0) {
		return products_for_insert;
	}
	else {
		products_for_insert.push(products);
	}

	return products_for_insert;
}

function createNewProductRegisterInTable(name, price) {
	const product_table_body = document.getElementById("product_table_body");

	const table_row = document.createElement("tr");
	product_table_body.appendChild(table_row);

	const table_data_name = document.createElement("td");
	table_data_name.innerHTML = name;
	table_row.appendChild(table_data_name);

	const table_data_price = document.createElement("td");
	table_data_price.innerHTML = `R$ ${parseFloat(price).toFixed(2).replace(".", ",")}`;
	table_row.appendChild(table_data_price);
}

function insertProductsInTable() {
	clearTable();
	const products = getProductsFromLocalStorage();
	const ordered_products = returnProductsOrderedByPrice(products);
	if (ordered_products.length > 0) {
		ordered_products.forEach(product => {
			createNewProductRegisterInTable(product.name, product.price);
		});
	}
	else {
		createNewProductRegisterInTable("Você ainda não possui nenhum produto cadastrado, clique em '+' para cadastrar um novo", 0);
	}
}

function clearTable() {
	const product_table_body = document.getElementById("product_table_body");
	const rows = Array.from(product_table_body.children);
	rows.forEach(row => {
		row.remove();
	})
}
