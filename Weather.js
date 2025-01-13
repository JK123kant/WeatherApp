const weatherData=document.querySelector("#weather-data");
const CityName=document.querySelector("#cityname");
const FormElement=document.querySelector("form");
const IconImage=document.querySelector("#icon");



const Apikey="f8e898d0812b5f04b5a7df91513d6eeb";

FormElement.addEventListener("submit",(e)=>{
    const Cityvalue=CityName.value;
    getweatherdata(Cityvalue);
    e.preventDefault();

})

async function getweatherdata(Cityvalue)
{
    try{
   const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${Cityvalue}&appid=${Apikey}&units=metric`);
        if(!response.ok){
            throw new Error(" Bad Connection ");
        }

       const data=await response.json();
      console.log(data);
       const Temprature=Math.floor(data.main.temp);
       const description=data.weather[0].description;
        const icon=data.weather[0].icon;

       const Details=[
        `Feels Like: ${Math.floor(data.main.feels_like)}`,
        `Humidity : ${Math.floor(data.main.humidity)}%`,
        `Wind Speed: ${data.wind.speed} m/s`
       ]

       weatherData.querySelector("#temp").textContent=`${Temprature}°C`;
        weatherData.querySelector("#desc").textContent=`${description}`;
        IconImage.innerHTML=`<img src="https://openweathermap.org/img/wn/${icon}.png" alt="">`;
        weatherData.querySelector("#details").innerHTML=Details.map((Details)=>{
               return `<div>${Details}</div>`;
        }).join("");

    }catch(err)
    {
        weatherData.querySelector("#temp").textContent="Try Again"
        weatherData.querySelector("#desc").textContent=" An Error Occured"
        IconImage.innerHTML=" "
    }

}