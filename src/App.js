import logo from "./logo.png";
import "./App.css";
import TimeZoneConverter from "./tzConvert";

function App() {
  return (
    <div className="App">
      <div style={{display:'flex', flexDirection:'row',  margin: "15px 11px"}}>
        <div style={{ textAlign: "start", lineHeight:'0px'}}>
          <p>Tech Deed | v1.1.0</p>
          <h4 style={{fontWeight:"normal"}}><span style={{fontWeight:"bolder", fontSize:"20px"}}>tcz</span> Time Converter</h4>
        </div>
        <img src={logo} style={{ width: "42px", height: "42px", margin:'5px 0px 0px 10px' }} />
      </div>
      <div>
        <img src={logo} style={{ width: "180px", height: "180px" }} />
      </div>
      <TimeZoneConverter />

      <footer>
        <div>
          <p>
            Developed by <i>https://github.com/bathiya96a</i>
          </p>
          <p>
            All rights reserved.{" "}
            <a
              style={{ textDecoration: "none", color: "#0096c7" }}
              href="https://github.com/bathiya96a"
            >
              bathiya96a
            </a>{" "}
            &copy; 2024{" "}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
