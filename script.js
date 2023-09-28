
const weather={
    
    async apiData(location) {
        const apiKey = 'eb5ff27666a746a2b14140032231909';
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=7`;
    
        try {
          const data = await fetch(url);
          const Data=await data.json();
            return {
                'location':Data.location,
                'current':Data.current,
                'forecast':Data.forecast
            }
    
        }
        catch(err){
            console.log(err);
        }
    
    }

}
const searchbtn=document.querySelector('.btn');
let fetchedData=null;
let userlocation='agra';
searchbtn.addEventListener('click',(event)=>{
    event.preventDefault();
    const s=document.querySelector('.search');
    userlocation=s.value;
    s.value='';
    console.log(userlocation);
    currentData();
    currentDayForecast();
    sevenDay();
    aircond();
    searchbtn.setAttribute='';
})
currentData(); 
async function currentData(){
    const city=document.querySelector('.city');
    weather.apiData(userlocation).then(weatherData=>{
    fetchedData=weatherData;
    const imgicon=document.querySelector('.current-day-img');
    imgicon.setAttribute('src',fetchedData.current.condition.icon);
    city.innerHTML=fetchedData.location.name;
    document.querySelector('.state').innerHTML=`${fetchedData.location.region},${fetchedData.location.country}`
    document.querySelector('.curr-temp').innerHTML=`${fetchedData.current.temp_c}&degC`
    document.querySelector('.curr-state').innerHTML=`${fetchedData.current.condition.text}`
    console.log(fetchedData);

});
}
async function currentDayForecast(){
    let i=1;
    weather.apiData(userlocation).then(weatherData=>{
        fetchedData=weatherData;
        document.querySelectorAll('.t').forEach(ele=>{
            const icon=document.querySelector(`.curr-forecast-icon${i}`);
            const temp=document.querySelector(`.temp${i}`);
            const icUrl=fetchedData.forecast.forecastday[0].hour[ele.getAttribute('value')].condition.icon;
            icon.setAttribute('src',icUrl);
            temp.innerHTML=`${fetchedData.forecast.forecastday[0].hour[ele.getAttribute('value')].temp_c}&degC`;
            i++
        })

    })
}
currentDayForecast();
async function sevenDay(){
    const days=['Sun','Mon','Tue','Wed','Thur','Fri','Sat'];
    let i=0;
    weather.apiData(userlocation).then(weatherData=>{
        
        const sevenD=document.querySelectorAll('.sevenDay');

        sevenD.forEach(ele=>{
            const date=new Date(weatherData.forecast.forecastday[i].date);
            let dayy=ele.querySelector(`.day${i}`);
            if(i==0){
            dayy.innerHTML=`Today`;
            }
            else{
                dayy.innerHTML=`${days[date.getDay()]}`;
            }
            let weather=ele.querySelector(`.weather${i}`);
            let temper=ele.querySelector(`.temp${i}`);
            
             weather.innerHTML=`<img src="${weatherData.forecast.forecastday[i].day.condition.icon}"></img>${weatherData.forecast.forecastday[i].day.condition.text}`;
                         temper.innerHTML=`${weatherData.forecast.forecastday[i].day.maxtemp_c}&degC/${weatherData.forecast.forecastday[i].day.mintemp_c}&degC`;
            
           
           


            
            i++;
        });
       

    })
}
sevenDay();
async function aircond(){
    weather.apiData(userlocation).then(weatherData=>{

        document.querySelector('.feel').innerHTML=`<h4>Real Feel</h4><br><h5>${weatherData.current.feelslike_c}&degC</h5>`
        document.querySelector('.wind').innerHTML=`<h4>Wind</h4><br><h5>${weatherData.current.wind_kph}km/h</h5>`
        document.querySelector('.rain').innerHTML=`<h4>Chance Of Rain</h4><br><h5>${weatherData.forecast.forecastday[0].day.daily_chance_of_rain}</h5>`
        document.querySelector('.uv').innerHTML=`<h4>UV</h4><br><h5>${weatherData.current.uv}</h5>`
    })
}
aircond();
//hide
// console.log(document.querySelector(".currState"));
// setInterval(()=>{
  
//     document.querySelector(".currState").classList.add('hide');

//     setTimeout(()=>{
//         document.querySelector(".currState").classList.remove('hide');
//     },600)
    

// },1000);

