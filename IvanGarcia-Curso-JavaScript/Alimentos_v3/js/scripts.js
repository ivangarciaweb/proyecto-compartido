let productsList = document.getElementById("productInfo");
const url = 'https://world.openfoodfacts.org/api/v0/product/';

function clearInput(inputItem){
	inputItem.value = "";
}
function searchBarCode(url){
	//Creo la variable que almacenara los elementos donde estaré escuchando el click
	let searchClick = document.getElementById("buttonSearch");
	// Escuchamos el evento del botón buscar
	searchClick.addEventListener("click", function(){
		//Almacenamos en una variable el contenido en texto del elemento donde hemos hecho click
		let inputBarCode = document.getElementById("inputText");	
		let inputValueSend = inputBarCode.value;
		clearInput(inputBarCode);
		//console.log(inputBarCode);
		//Llamamos a la función buildLaunch y le pasamos los parametros que vamos a necesitar
		bringProductInfo(url , inputValueSend);
	});
}

searchBarCode(url)


function clearList(productsList){
	productsList.innerHTML = "";
}

function writeProductInfo(productsList, product){
	//Cuando recibimos los datos generamos el HTML que mostraremos
	if(product.status_verbose == "product found" && product.code != null){
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
			<li><p><strong>Ingredientes:</strong>${product.product.ingredients_text}</p></li>
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
	else{
		productsList.innerHTML = `
			<h4 class="error"><strong>!</strong><br/><br/>¡Ups! No se ha encontrado el producto relacionado con este código de barras en nuestra base de datos. Prueba a reescribirlo o introducir otro.</h4>
		`;
	}

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


$(function() {
	// Create the QuaggaJS config object for the live stream
	var liveStreamConfig = {
			inputStream: {
				type : "LiveStream",
				constraints: {
					width: {min: 640},
					height: {min: 480},
					aspectRatio: {min: 1, max: 100},
					facingMode: "environment" // or "user" for the front camera
				}
			},
			locator: {
				patchSize: "medium",
				halfSample: true
			},
			numOfWorkers: (navigator.hardwareConcurrency ? navigator.hardwareConcurrency : 4),
			decoder: {
				"readers":[
					{"format":"ean_reader","config":{}}
				]
			},
			locate: true
		};
	// The fallback to the file API requires a different inputStream option. 
	// The rest is the same 
	var fileConfig = $.extend(
			{}, 
			liveStreamConfig,
			{
				inputStream: {
					size: 800
				}
			}
		);
	// Start the live stream scanner when the modal opens
	$('#open-camera').on('click', function (e) {
		Quagga.init(
			liveStreamConfig, 
			function(err) {
				Quagga.start();
			}
		);
    });
	
	// Make sure, QuaggaJS draws frames an lines around possible 
	// barcodes on the live stream
	Quagga.onProcessed(function(result) {
		var drawingCtx = Quagga.canvas.ctx.overlay,
			drawingCanvas = Quagga.canvas.dom.overlay;
 
		if (result) {
			if (result.boxes) {
				drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
				result.boxes.filter(function (box) {
					return box !== result.box;
				}).forEach(function (box) {
					Quagga.ImageDebug.drawPath(box, {x: 0, y: 1}, drawingCtx, {color: "green", lineWidth: 2});
				});
			}
 
			if (result.box) {
				Quagga.ImageDebug.drawPath(result.box, {x: 0, y: 1}, drawingCtx, {color: "#00F", lineWidth: 2});
			}
 
			if (result.codeResult && result.codeResult.code) {
				Quagga.ImageDebug.drawPath(result.line, {x: 'x', y: 'y'}, drawingCtx, {color: 'red', lineWidth: 3});
			}
		}
	});
	
	// Once a barcode had been read successfully, stop quagga and 
	// close the modal after a second to let the user notice where 
	// the barcode had actually been found.
	Quagga.onDetected(function(result) {    		
		if (result.codeResult.code){
			$('#scanner_input').val(result.codeResult.code);
			Quagga.stop(); 		
		}
	});
    
	// Stop quagga in any case, when the modal is closed
    $('#livestream_scanner').on('click, function(){
    	if (Quagga){
    		Quagga.stop();	
    	}
    });
	
	// Call Quagga.decodeSingle() for every file selected in the 
	// file input
	$("#livestream_scanner input:file").on("change", function(e) {
		if (e.target.files && e.target.files.length) {
			Quagga.decodeSingle($.extend({}, fileConfig, {src: URL.createObjectURL(e.target.files[0])}), function(result) {alert(result.codeResult.code);});
		}
	});
});