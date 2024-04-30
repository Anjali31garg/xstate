import logo from './logo.svg';
import './App.css';
import {useState,useEffect} from 'react';
function App() {
  
  const[country, setCountry] = useState([]);
  const[state, setState] = useState([]);
  const[city, setCity] = useState([]);
  const[selectedCountry, setSelectedCountry] = useState("");
  const[selectedState, setSelectedState] = useState("");
  const[selectedCity, setSelectedCity]= useState("");

  useEffect(()=>{
    const fetchData = async() =>{
      try{
        const response = await fetch('https://crio-location-selector.onrender.com/countries')
        if(!response.ok){
          throw new Error('failed to fetch');
        }

        const data = await response.json();
        setCountry(data);
      }catch(error){
        console.error('error', error);
      }
    };

    fetchData();

  },[])

  useEffect(()=>{
    const fetchState = async() =>{
      try{
        if(selectedCountry){
        const response = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
        if(!response.ok){
          throw new Error('failed to fetch')

        }

        const data = await response.json();
        setState(data);
        setSelectedState("");
        setCity([]);
        setSelectedCity("");
      }
    }catch(e){
      console.error("error in fetching",e);
      }
    }

    fetchState();
  },[selectedCountry])


  useEffect(()=>{
    const fetchCity = async()=>{
      try{
        if(selectedCountry && selectedState){
          const response = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`);
          if(!response.ok){
            throw new Error('fetching error');

          }

          const data = await response.json();
          setCity(data);
          setSelectedCity("");
        }

      }catch(e){
        console.error("error",e);
      }
    } 

    fetchCity();
  },[selectedCountry,selectedState])  


  return (
    <div className="App">
      <h1>Select Location</h1>
      <select value={selectedCountry} onChange={(e)=>setSelectedCountry(e.target.value)}>
        <option value="" disabled>Select Country</option>
        {country.map((countries) => (
          <option key={countries} value={countries}>
              {countries}
          </option>
        ))}
      </select>

      <select value={selectedState} onChange={(e)=>setSelectedState(e.target.value)}>
        <option value="" disabled>Select State</option>
        {state.map((states) => (
          <option key={states} value={states}>
              {states}
          </option>
        ))}
      </select>

      <select value={selectedCity} onChange={(e)=>setSelectedCity(e.target.value)}>
        <option value="" disabled>Select City</option>
        {city.map((cities) => (
          <option key={cities} value={cities}>
              {cities}
          </option>
        ))}
      </select>


        {selectedCity && <p><span>You selected </span><span className='mycity'>{selectedCity}</span>, {selectedState}, {selectedCountry}</p>}

        </div>
  );
}

export default App;
