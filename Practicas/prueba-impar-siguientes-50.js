function numerosImpares(num){
	for(contador = num+1; contador <= num+50; contador++){
		if(contador %2 != 0){
			console.log(contador);
		}
		
	}
}

numerosImpares(20)

//Mejorada

function showOdds (number){//declaro la funcion
	if(number % 2 != 0){//miro si el numero es impar
		var limit = number + 50;//declaro un limite
		for(number;number<limit;number=number+2){//preparo el bucle
			console.log(number);//imprimo el numero
		}
	}	
	else{
		number++; //En caso de que sea par le añado 1
		showOdds(number);	//le vuelvo a pasar la misma función
		
	}
}
showOdds(20)

//Mejorada con 2 funciones
function isPair(number){
	if(number % 2 != 0){
		return false;
	}
	else{
		return true;
	}
}

function showOdds(number){
	var limit = number + 50;
	if(isPair(number)){
		number++;
		for(number; number < limit; number= number + 2){
			console.log(number);
		}
	}
	else{
		for(number; number <= limit; number= number + 2){
			console.log('hola');
		}
	}
}

showOdds(20)