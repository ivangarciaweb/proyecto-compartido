let newCampaign = {
    name: 'Iván',
    title: 'Campaña Iván',
    subject: 'Prueba Campaña',
    html: `
    <p>
        Nueva campaña
        <br/>
        <strong> de prueba para metodo POST</strong>
    </p>`,
    schedule: 10,
    recipents: ['test@test.com','prueba@prueba.com', 'meme@meme.com']
}
let url = 'http://192.168.1.67:3000/campaign';
async function postMethod(url, newCampaign) {
    try{
        console.log(url);
        const headers = {
            'Accept': 'application/json',
            'Content-Type':'application/json'
        };
        const data = await fetch(url, {
            headers: headers,
            method: 'POST',
            body: JSON.stringify(newCampaign)
        });
        const dataObjectJson = await data.json();
        console.log(dataObjectJson);        
    }catch(error){
        console.log(error);
    }
}