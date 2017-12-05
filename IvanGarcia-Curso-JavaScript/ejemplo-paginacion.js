// PROBLEMA: TENEMOS UN ARRAY CON 300 OBJETOS
// MOSTRAR DE 10 EN 10
// PODER CLICKAR EN NUMERO
// EL NUMERO DE NÚMEROS DEPENDERÁ DEL TOTAL DE OBJETOS

// LOS OBJETOS VAN A SER NÚMEROS

function preparacion(totalObjectsNumber){
    let ourArray = [];
    for(let index = 0; index < totalObjectsNumber; index++){
        ourArray.push({ clave: index+1});
    }
    return ourArray;
}

const a = preparacion(500);
// console.log(a);

// Caso 1: muestra desde el index 0 hasta el index 9 (desde resultado 1 al resultado 10)
    for (let index = 0; index < 10; index++){
        console.log(a[index]);
    }

// Que algoritmo usar para mostrar de 10 en 10

function clickNumber(number){
    const end = (number * 10)
    for (let index = end - 10; index < end; index++){
        console.log(a[index-1]);
    }
}

clickNumber(2);