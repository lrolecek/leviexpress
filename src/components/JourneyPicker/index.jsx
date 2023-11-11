import React, { useEffect, useState } from 'react';
import './style.css';


const CityOptions = ({cities}) => {
  return (
    <>
      <option value="">Vyberte</option>
      {cities.map(
        city => <option key={city.code} value={city.code}>{city.name}</option>
      )}
    </>
  );
}

const DateOptions = ({dates}) => {
  return (
    <>
      <option value="">Vyberte</option>
      {dates.map(
        date => <option key={date.dateBasic} value={date.dateBasic}>{date.dateCs}</option>
      )}
    </>
  );
}

export const JourneyPicker = ({ onJourneyChange }) => {

  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [date, setDate] = useState('');
  const [cities, setCities] = useState([]);
  const [dates, setDates] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Odesílám formulář s cestou');
    console.log('From:', fromCity);
    console.log('To:  ', toCity);
    console.log('Date:', date);
  }

  const handleFromCityChange = (event) => {
    setFromCity(event.target.value);
  }

  const handleToCityChange = (event) => {
    setToCity(event.target.value);
  }

  const handleDateChange = (event) => {
    setDate(event.target.value);
  }

  useEffect(() => {
    const fetchCities = async () => {
      const response = await fetch('https://apps.kodim.cz/daweb/leviexpress/api/cities');
      const data = await response.json();
      setCities(data.results);
    }

    const fetchDates = async () => {
      const response = await fetch('https://apps.kodim.cz/daweb/leviexpress/api/dates');
      const data = await response.json();
      setDates(data.results);
    }

    fetchCities();
    fetchDates();
  }, []);


  return (
    <div className="journey-picker container">
      <h2 className="journey-picker__head">Kam chcete jet?</h2>
      <div className="journey-picker__body">
        <form className="journey-picker__form" onSubmit={handleSubmit}>
          <label>
            <div className="journey-picker__label">Odkud:</div>
            <select onChange={handleFromCityChange} value={fromCity}>
              <CityOptions cities={cities} />
            </select>
          </label>
          <label>
            <div className="journey-picker__label">Kam:</div>
            <select onChange={handleToCityChange} value={toCity}>
              <CityOptions cities={cities} />
            </select>
          </label>
          <label>
            <div className="journey-picker__label">Datum:</div>
            <select onChange={handleDateChange} value={date}>
              <DateOptions dates={dates} />
            </select>
          </label>
          <div className="journey-picker__controls">
            <button
              className="btn"
              type="submit"
            >
              Vyhledat spoj
            </button>
          </div>
        </form>
        <img className="journey-picker__map" src="/map.svg" />
      </div>
    </div>
  );
}
