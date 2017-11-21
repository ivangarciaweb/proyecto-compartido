let launchesList = document.getElementById("launches");
const url = 'https://api.spacexdata.com/v1/launches?year=';

function knowYear(url){
	//Creo la variable que almacenara los elementos donde estaré escuchando el click
	let yearClick = document.getElementsByClassName("js-year");
	//Me devuelve un objeto como si fuera un array(es raro) y por eso se utiliza el "Array.from" para especificar que es un array y se ejecuta un forEach
	Array.from(yearClick).forEach(function(elemento){
		//En cada elemento del array se pone un evento de escucha para recoger el click
	    elemento.addEventListener("click", function(){
			//Almacenamos en una variable el contenido en texto del elemento donde hemos hecho click
			let yearSelect = this.innerHTML;
			//Seleccionamos en esta parte vamos a cambiar el texto del botón que abre el listado de años, por el año seleccionado
			let button = document.getElementById("button-select");
			//Aqui le estamos pasando como valor el año
			button.innerHTML = yearSelect;
			//Llamamos a la función buildLaunch y le pasamos los parametros que vamos a necesitar
			buildLaunch(url , yearSelect);
		});
	}); 
}

knowYear(url)

function clearList(launchesList){
	launchesList.innerHTML = "";
}

/*function writeLaunchData(launchesList){
	// Pintamos el html con la información que nos trae la API con los parámetros recibidos por el objeto
	launchesList.innerHTML += `
	<li>
		<img src="${element.links.mission_patch}">
		<p>Número de lanzamiento: <span>${element.flight_number}</span></p>
		<p>Nombre del Cohete: <span>${element.rocket.rocket_name}</span></p>
		<p>Hora global de lanzamiento: <span>${element.launch_date_utc}</span></p>
		<p>Año de lanzamiento: <span>${element.launch_year}</span></p>
		<p>Detalles:</p>
		<span>${element.details}</span>
	</li>`;
}*/


async function buildLaunch(url , year){
	// Lo primero juntamos la url de la api con la fecha elegida en el "select"
    let urlWithYear = url + year;
	// Con fetch hacemos una llamada a la api deseada, en nuestro caso Space X
	let firstData = await fetch(urlWithYear);
	// Almacenamos en contenido recibido por la API, como un JSON (tipo objeto)
	let data = await firstData.json();	
	//Vaciamos el contenido del elemento UL donde se va a pintar el contenido
	clearList(launchesList);
	//Hacemos un forEach para poder recorrer los elementos del objeto
	data.forEach(function(element){
		//writeLaunchData(launchesList)
		launchesList.innerHTML += `
		<li>
			<img src="${element.links.mission_patch}">
			<p>Número de lanzamiento: <span>${element.flight_number}</span></p>
			<p>Nombre del Cohete: <span>${element.rocket.rocket_name}</span></p>
			<p>Hora global de lanzamiento: <span>${element.launch_date_utc}</span></p>
			<p>Año de lanzamiento: <span>${element.launch_year}</span></p>
			<p>Detalles:</p>
			<span>${element.details}</span>
		</li>`;
    });
}


