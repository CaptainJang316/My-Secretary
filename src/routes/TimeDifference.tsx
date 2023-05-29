import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function CountryTimeDifference() {
  const [country1, setCountry1] = useState('Australia/Sydney');
  const [country2, setCountry2] = useState('Canada/Toronto');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [difference, setDifference] = useState('');

  function handleCountry1Change(event: React.ChangeEvent<HTMLSelectElement>) {
    setCountry1(event.target.value);
  }

  function handleCountry2Change(event: React.ChangeEvent<HTMLSelectElement>) {
    setCountry2(event.target.value);
  }

  function handleStartDateChange(event: React.ChangeEvent<HTMLInputElement>) {
    setStartDate(event.target.value);
  }

  function handleEndDateChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEndDate(event.target.value);
  }

  function calculateDifference() {
    const start = new Date(`${startDate}T00:00:00`);
    const end = new Date(`${endDate}T00:00:00`);

    const timezone1 = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const timezone2 = country2;

    const diff = Math.abs(end.getTime() - start.getTime());

    const offset1 = new Date().toLocaleString('en-US', { timeZone: timezone1 }).match(/([-\+]\d{2}):(\d{2})$/)![1];
    const offset2 = new Date().toLocaleString('en-US', { timeZone: timezone2 }).match(/([-\+]\d{2}):(\d{2})$/)![1];

    const hoursDiff = Math.abs(parseInt(offset2) - parseInt(offset1));

    setDifference(`${hoursDiff} hours`);
  }

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Country Time Difference Calculator</h1>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="country1">Country 1:</label>
            <select id="country1" className="form-control" value={country1} onChange={handleCountry1Change}>
              <option value="Australia/Sydney">Australia/Sydney</option>
              <option value="Canada/Toronto">Canada/Toronto</option>
              <option value="Japan/Tokyo">Japan/Tokyo</option>
              <option value="US/Pacific">US/Pacific</option>
            </select>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="country2">Country 2:</label>
            <select id="country2" className="form-control" value={country2} onChange={handleCountry2Change}>
              <option value="Australia/Sydney">Australia/Sydney</option>
              <option value="Canada/Toronto">Canada/Toronto</option>
              <option value="Japan/Tokyo">Japan/Tokyo</option>
              <option value="US/Pacific">US/Pacific</option>
            </select>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="start-date">Start Date:</label>
            <input type="date" id="start-date" className="form-control" value={startDate} onChange={handleStartDateChange} />
        </div>
      </div>
      <div>
        <label htmlFor="end-date">End Date:</label>
        <input type="date" id="end-date" value={endDate} onChange={handleEndDateChange} />
      </div>
      <button onClick={calculateDifference}>Calculate Difference</button>
      {difference && (
        <div>
          <p>Time Difference: {difference}</p>
        </div>
      )}
    </div>
    </div>  
  );
}

export default CountryTimeDifference;