// si es divisible entre 4 pero no entre 100

function esBisiesto(anio){
	if (anio%4 == 0 && anio%100 != 0){
		return("El año es bisiesto")
	}
	else{
		return("Pues no es bisiesto")
	}
}

console.log(esBisiesto(2004))