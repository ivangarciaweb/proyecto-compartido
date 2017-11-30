let url = 'http://192.168.1.67:3000/campaign/';
let newCampaign = {
    name: 'PUT Iván García',
    title: 'PUT Campaña Iván García'
}

async function getMethod(url, newCampaign){
	// Con fetch hacemos una llamada a la api deseada, en nuestro caso
	let firstData = await fetch(url);
	// Almacenamos en contenido recibido por la API, como un JSON (tipo objeto)
    let data = await firstData.json();
    let myId = data[18]._id;
    console.log(myId);
    putMethod(url, newCampaign, myId)
}



async function putMethod(url,newCampaign, myId) {
    try{
        console.log(url);
        let newUrl = url + myId;
        console.log(newUrl);
        const headers = {
            'Accept': 'application/json',
            'Content-Type':'application/json'
        };
        const data = await fetch(newUrl, {
            headers: headers,
            method: 'PUT',
            body: JSON.stringify(newCampaign)
        });
        const dataObjectJson = await data.json();
        console.log(dataObjectJson);        
    }catch(error){
        console.log(error);
    }
}
