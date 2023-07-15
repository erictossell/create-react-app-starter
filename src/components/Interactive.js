
import React, { useState, useRef, useEffect } from 'react';

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0); // Add this line
  const wrapperRef = useRef(null);

  const functionList = {
    "/guild daily": "commmand/guild daily",
    "/guild weekly": "command/guild weekly",
    "/guild mythic_plus": "command/guild mythic_plus",
    "/character best_runs": "command/character best_runs",
    "/character recent_runs": "command/character recent_runs",
    
    command: "/command/",
    "/": "/command/", // add this line to make "/" an alias for "command"
};

  const handleSearch = async (e) => {
    e.preventDefault();

    let funcName, params;
  // If the input starts with "/", treat it as "/command"
    if (input.startsWith("/")) {
      funcName = "/";
      params = input.slice(1); // remove the initial "/"
    } else {
      [funcName, ...params] = input.split(" ");
      // if funcName is "command", join the params back together
      if (funcName === "command") {
        params = params.join(" ");
      }
    }
  
    const func = functionList[funcName];

    if (typeof func === "function" && params.length === 2) {
      const [a, b] = params;
      setResult(func(parseInt(a), parseInt(b)));
    } else if (typeof func === "string" && params) {
      try {
        const response = await fetch("http://127.0.0.1:8000" + func + params);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setResult(data);
      } catch (error) {
        console.error("There has been a problem with your fetch operation:", error);
      }
    } else {
        setResult("Invalid input. Try again.");
    }
  }; 


   const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    let functionName = value.split(" ")[0];
    if(functionName) {
      let suggestions = Object.keys(functionList).filter(fn => fn.startsWith(functionName));
      setSuggestions(suggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };
  
  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion + " ");
    setShowSuggestions(false);
  };

  const handleClickOutside = event => {
    if (wrapperRef && !wrapperRef.current.contains(event.target)) {
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e) => {
    if (showSuggestions) {
      if (e.key === 'ArrowUp') {
        setActiveSuggestionIndex(index => index > 0 ? index - 1 : 0);
        e.preventDefault();
      } else if (e.key === 'ArrowDown') {
        setActiveSuggestionIndex(index => index < suggestions.length - 1 ? index + 1 : index);
        e.preventDefault();
      } else if (e.key === 'Enter' || e.key === 'Tab') {
        setInput(suggestions[activeSuggestionIndex]); // Set the input to the active suggestion
        setShowSuggestions(false);
        e.preventDefault();
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        setInput('');
        e.preventDefault();
      }
    }
  }; 

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef}>

      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          value={input} 
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter function and parameters"
        />
        <button type="submit">Send</button>
       {showSuggestions && suggestions.length > 0 && (
        <ul>
          {suggestions.map((suggestion, index) => (
            <li 
              key={suggestion} 
              onClick={() => handleSuggestionClick(suggestion)}
              style={index === activeSuggestionIndex ? { background: '#ccc' } : null} // Highlight the active suggestion
            >
              {suggestion}
            </li>
          ))}
        </ul>
        )}      
      {result && (
  Array.isArray(result.commands) ? (
    <div>
      <h2>Commands:</h2>
      <ul>
        {result.commands.map(command => <li key={command}>{command}</li>)}
      </ul>
    </div>
  ) : (
    <div>
      <p>Name: {result.name}</p>
      <p>Description: {result.description}</p>
      <p>Usage: {result.usage}</p>
      {result.image_url && <img src={result.image_url} alt={result.name} />}
    </div>
  )
)}
        
      </form>
      
    </div>
  );
}

export default App;

