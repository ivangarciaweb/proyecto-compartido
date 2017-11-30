button.addEventListener('click', function(event){
    async function instaData(){
        const url = 'https://fipe.parallelum.com.br/api/v1/carros/marcas';
        let firstData = await fetch(url);
        let data = await firstData.json()
        console.log(data);
    }
    instaData();
});


async function instaData(){
    const url = 'https://api.spacexdata.com/v1/launches?year=2017';
    let firstData = await fetch(url);
    let data = await firstData.json();
    data.forEach(function(element){
        console.log(element.links.mission_patch);
    });
    //console.log(data);
}
instaData();