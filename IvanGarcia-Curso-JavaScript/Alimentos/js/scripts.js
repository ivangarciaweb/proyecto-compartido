let productsList = document.getElementById("productInfo");
const url = 'https://world.openfoodfacts.org/api/v0/product/';

function searchBarCode(url){
	//Creo la variable que almacenara los elementos donde estaré escuchando el click
	let searchClick = document.getElementById("buttonSearch");
	// Escuchamos el evento del botón buscar
	searchClick.addEventListener("click", function(){
		//Almacenamos en una variable el contenido en texto del elemento donde hemos hecho click
		let inputBarCode = document.getElementById("inputText").value;	
		console.log(inputBarCode);
		//Llamamos a la función buildLaunch y le pasamos los parametros que vamos a necesitar
		bringProductInfo(url , inputBarCode);
	});
}

searchBarCode(url)

function clearList(productsList){
	productsList.innerHTML = "";
}

function writeProductInfo(productsList, product){
	//Cuando recibimos los datos generamos el HTML que mostraremos
	productsList.innerHTML = `
	<h2>${product.product.product_name}</h2>
	<ul class="gallery">
		<li><img src="${product.product.image_url}"></p></li>
		<li><img src="${product.product.image_nutrition_url}"></p></li>
	</ul>	
	<ul class="productProperties">
		<li><p><strong>Marca:</strong>${product.product.brands}</p></li>
		<li><p><strong>Nombre del producto:</strong>${product.product.product_name}</p></li>
		<li><p><strong>Código de barras:</strong>${product.product.code}</p></li>
		<li><p><strong>Categoria:</strong>${product.product.categories}</p></li>
		<li><p><strong>País de procedencia:</strong>${product.product.countries}</p></li>
		<li><p><strong>Ingredientes:</strong>${product.product.ingredients_debug}</p></li>
		<li><p><strong>Apto para:</strong>${product.product.labels}</p></li>
		<li><p><strong>Última actualización:</strong>${product.product.last_edit_dates_tags[2]}</p></li>
		<li><p><strong>Envase:</strong>${product.product.packaging}</p></li>
		<li><p><strong>Peso:</strong>${product.product.quantity}</p></li>
		<li><p><strong>Lugar de fabricación:</strong>${product.product.manufacturing_places}</p></li>
	</ul>
	<ul class="productNutritionalValue">
		<h3>Valor Nutricional por cada 100g</h3>
		<li><p><strong>V. Energético</strong>${product.product.nutriments.energy_100g}</p></li>
		<li><p><strong>Carbohidratos</strong>${product.product.nutriments.carbohydrates_100g}</p></li>
		<li><p><strong>Grasas</strong>${product.product.nutriments.fat_100g}</p></li>
		<li><p><strong>Fibra</strong>${product.product.nutriments.fiber_100g}</p></li>
		<li><p><strong>Proteinas</strong>${product.product.nutriments.proteins_100g}</p></li>
		<li><p><strong>Sal</strong>${product.product.nutriments.salt_100g}</p></li>
		<li><p><strong>G. Saturadas</strong>${product.product.nutriments.fat_100g}</p></li>
		<li><p><strong>Sodio</strong>${product.product.nutriments.sodium_100g}</p></li>
		<li><p><strong>Azucares</strong>${product.product.nutriments.sugars_100g}</p></li>
	</ul>
	`;
}

async function bringProductInfo(url , barCode){
	// Lo primero juntamos la url de la api con el código de barras introducido y la extensión .json
	let urlWithBarCode = url + barCode + '.json';
	// Con fetch hacemos una llamada a la api deseada
	let firstData = await fetch(urlWithBarCode);
	// Almacenamos en contenido recibido por la API, como un JSON (tipo objeto)
	let data = await firstData.json();
	console.log(data);
	//Vaciamos el contenido del elemento UL donde se va a pintar el contenido
	clearList(productsList);
	//Llamamos a la función que va a escribir la información recibida.
	writeProductInfo(productsList , data);
}


