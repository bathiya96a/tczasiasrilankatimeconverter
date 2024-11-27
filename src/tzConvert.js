import React, { useState } from "react";
import moment from "moment-timezone";
import DateTimePicker from "react-datetime-picker"; // Install: npm install react-datetime-picker
import "./styles.css";

const TimeZoneConverter = () => {
  const [conversionType, setConversionType] = useState("UTC to Asia/Colombo");
  const [inputTime, setInputTime] = useState("");
  const [selectedTimezone, setSelectedTimezone] = useState("Asia/Colombo");
  const [sourceTimezone, setSourceTimezone] = useState("UTC");
  const [targetTimezone, setTargetTimezone] = useState("Asia/Colombo");
  const [useDateTimePicker, setUseDateTimePicker] = useState(false);
  const [datePickerValue, setDatePickerValue] = useState(new Date()); // Default to current date and time
  const [result, setResult] = useState("");

  // Fetch list of all time zones from moment-timezone
  const timezones = moment.tz.names();

  // Handle conversions based on the selected conversion type
  const handleConvert = () => {
    let convertedTime = "";
    try {
      const timeToConvert = useDateTimePicker
        ? moment(datePickerValue).format("YYYY-MM-DDTHH:mm:ss")
        : inputTime;

      switch (conversionType) {
        case "UTC to Asia/Colombo":
          convertedTime = moment.utc(timeToConvert).tz("Asia/Colombo").format("YYYY-MM-DD HH:mm:ss");
          break;

        case "Asia/Colombo to UTC":
          convertedTime = moment.tz(timeToConvert, "Asia/Colombo").utc().format("YYYY-MM-DDTHH:mm:ss");
          break;

        case "Asia/Colombo to Any":
          convertedTime = moment.tz(timeToConvert, "Asia/Colombo").tz(selectedTimezone).format("YYYY-MM-DD HH:mm:ss");
          break;

        case "Any to Asia/Colombo":
          convertedTime = moment.tz(timeToConvert, selectedTimezone).tz("Asia/Colombo").format("YYYY-MM-DD HH:mm:ss");
          break;

        case "Timezone to Timezone":
          convertedTime = moment.tz(timeToConvert, sourceTimezone).tz(targetTimezone).format("YYYY-MM-DD HH:mm:ss");
          break;

        default:
          convertedTime = "Invalid Conversion Type";
      }
    } catch (error) {
      convertedTime = "Invalid input or format";
    }
    setResult(convertedTime);
  };

  return (
    <div className="time-converter">




      <h1>Time Converter</h1>
      <div className="app-container">
        {/* Sidebar for Conversion Types */}
        <div className="sidebar">
          {[
            "UTC to Asia/Colombo",
            "Asia/Colombo to UTC",
            "Asia/Colombo to Any",
            "Any to Asia/Colombo",
            "Timezone to Timezone",
          ].map((type) => (
            <button
              key={type}
              className={`sidebar-button ${conversionType === type ? "active" : ""}`}
              onClick={() => setConversionType(type)}
            >
              {type}
            </button>
          ))}
        </div>


        {/* Conversion Box */}
        <div className="conversion-box">
          <h2 style={{ fontWeight: "bold" }}>{`Convert ${conversionType}`}</h2>

          {/* Input Method Toggle */}
          <div className="input-method-toggle">
            <label>
              <input
                type="checkbox"
                checked={useDateTimePicker}
                onChange={() => setUseDateTimePicker(!useDateTimePicker)}
              />
              Use Date-Time Picker
            </label>
          </div>

          {/* Input Group */}
          <div className="input-group">
            {useDateTimePicker ? (
              <div className="datetime-picker-container">
                <label>Select Date and Time:</label>
                <div style={{display:'flex', flexDirection:'row'}}>
                <p style={{fontSize:'12px', margin:'10px 10px'}}>Format: DD/MM/YYYY HH:MM</p>
                <p style={{fontSize:'12px', margin:'10px 10px'}}>Example: 23/11/2024 15:25</p>
                </div>
                <DateTimePicker
                  onChange={setDatePickerValue}
                  value={datePickerValue}
                />
              </div>
            ) : (
              <div>
                <label>Time Input:</label>
                <input
                  type="text"
                  placeholder="e.g., 2024-11-27T15:00:00"
                  value={inputTime}
                  onChange={(e) => setInputTime(e.target.value)}
                />
              </div>
            )}
          </div>

          {/* Additional Inputs Based on Conversion Type */}
          {conversionType === "Asia/Colombo to Any" && (
            <div className="input-group">
              <label>Target Timezone:</label>
              <select value={selectedTimezone} onChange={(e) => setSelectedTimezone(e.target.value)}>
                {timezones.map((zone) => (
                  <option key={zone} value={zone}>
                    {zone}
                  </option>
                ))}
              </select>
            </div>
          )}

          {conversionType === "Any to Asia/Colombo" && (
            <div className="input-group">
              <label>Source Timezone:</label>
              <select value={selectedTimezone} onChange={(e) => setSelectedTimezone(e.target.value)}>
                {timezones.map((zone) => (
                  <option key={zone} value={zone}>
                    {zone}
                  </option>
                ))}
              </select>
            </div>
          )}

          {conversionType === "Timezone to Timezone" && (
            <>
              <div className="input-group">
                <label>Source Timezone:</label>
                <select value={sourceTimezone} onChange={(e) => setSourceTimezone(e.target.value)}>
                  {timezones.map((zone) => (
                    <option key={zone} value={zone}>
                      {zone}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-group">
                <label>Target Timezone:</label>
                <select value={targetTimezone} onChange={(e) => setTargetTimezone(e.target.value)}>
                  {timezones.map((zone) => (
                    <option key={zone} value={zone}>
                      {zone}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {/* Convert Button */}
          <button className="convert-button" onClick={handleConvert}>
            Convert
          </button>

          {/* Result Display */}
          <div className="result-box">
            <label>Converted Time:</label>
            <div>{result}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeZoneConverter;
