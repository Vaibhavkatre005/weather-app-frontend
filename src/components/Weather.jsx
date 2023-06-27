import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/styles.css";
import errImages from "../images/cloud.png";
import loadingImg from "../images/loading.gif";

export const Weather = () => {
  const [location, setLocation] = useState("");
  const [weatherDatas, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {}, []);
  function getLocationAllData(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f67ce3cbda34802cac20f6b6b0dfd418`;
    fetch(url)
      .then(function (res) {
        return res.json();
      })
      .then(function (res) {
        console.log(res);
        setWeatherData(res);
        setError(false);
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  const handleLocationC = (event) => {
    setLocation(event.target.value);
  };

  const handleWeatherS = async () => {
    try {
      setLoading(true);
      setWeatherData(null);

      const response = await axios.get(
        `https://weather-app-backend-nu.vercel.app/api/getweather?location=${location}`
      );

      setWeatherData(response.data);
      setLocation("");
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  function getLocationData() {
    navigator.geolocation.getCurrentPosition(successData);

    function successData(position) {
      var cards = position.coords;
      console.log("Your current location is:");
      console.log(`Latitudes : ${cards.latitudes}`);
      console.log(`Longitudes: ${cards.longitudes}`);
      console.log(`More or less ${cards.accuracys} meters.`);
      getLocationAllData(cards.latitudes, cards.longitudes);
    }
  }

  return (
    <div className="containers">
      <div >
        <h1 >
          Weather App
        </h1>
      </div>
      <div className="inputSearch"> 
        <input
          type="search"
          value={location}
          onChange={handleLocationC}
          onKeyUp={(e) => {
            if (e.keyCode === 13) {
              handleWeatherS();
            }
          }}
          placeholder="Enter City"
        />
        {/* <div className="btncurrent"> */}
          {/* <button onClick={getLocationData}> Current Location</button> */}
        {/* </div> */}
      </div>

      {loading && (
        <div className="loadingContainer">
          <img src={loadingImg} width="100" height="100" alt="Loading..." />
        </div>
      )}

      {error && (
        <div className="errorContainer">
          <img src={errImages} width="200" height="200" alt="Error" />
          <h3>No Data Found..</h3>
        </div>
      )}

      {weatherDatas && (
        <div className="WeatherData">
          <div className="weatherdiv">
            <h2>Weather Information</h2>
            <p className="location">Location: {weatherDatas.name}</p>
            <p className="temperature">
              Temperature: {weatherDatas.main.temp/10}°C
            </p>
            <p className="humidity">Humidity: {weatherDatas.main.humidity}%</p>
          </div>

          <div className="isframe">
            <iframe
              src={`https://maps.google.com/maps?q=${weatherDatas.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
              frameborder="0"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};
