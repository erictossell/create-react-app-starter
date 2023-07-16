
import React, { useState, useRef, useEffect } from 'react';
import { Button, TextField, List, ListItem, Typography, Container, Card, CardContent, Grid, Box} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';

function App() {
  const theme = useTheme();
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
    commands: "/command/",
    "/": "/command/", // add this line to make "/" an alias for "command"
};

  const handleSearch = async (e) => {
    e.preventDefault();

    if (input.trim() === '') {
      setResult(null);
      return;
    }

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
        const response = await fetch("https://mplus-api.up.railway.app" + func + params);
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
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
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
      } else if (e.key === 'Tab') {
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
  <Container
    ref={wrapperRef}
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '15px',
    }}
    sx={{
      backgroundColor: theme.palette.tertiary.main,
      padding: '20px',     
      borderRadius: '7px'
    }}
  >
    <form onSubmit={handleSearch} style={{ width: '100%' }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={9}>
          <TextField
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Enter commands and parameters"
            fullWidth
            sx={{ color: '#fff', height: '100%' }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{
              backgroundColor: theme.palette.secondary.main,
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
            endIcon={<SendIcon />}
          >
          Send
          </Button>
        </Grid>
      </Grid>

      {showSuggestions && suggestions.length > 0 && (
        <List sx={{ marginTop: theme.spacing(2) }}>
          {suggestions.map((suggestion, index) => (
            <ListItem
              key={suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
              sx={{
                backgroundColor: index === activeSuggestionIndex ? '#ccc' : 'transparent',
                color: '#fff'
              }}
            >
              {suggestion}
            </ListItem>
          ))}
        </List>
      )}

      {result && (
        <Card
          sx={{
            marginTop: theme.spacing(2),
            backgroundColor: theme.palette.tertiary.main,
            color: '#fff'
          }}
        >
          <CardContent>
            {Array.isArray(result.commands) ? (
              <div>
                <Typography variant="h5">Commands:</Typography>
                <List>
                  {result.commands.map(command => (
                    <ListItem key={command}>{command}</ListItem>
                  ))}
                </List>
              </div>
            ) : (
              <div>
                
            <Typography variant="body1" align="center" sx={{color: theme.palette.secondary.main, fontWeight: 'bold', marginTop: '10px' }}>
              Name:
            </Typography>
            <Typography variant="body1" align="center">
              {result.name}
            </Typography>
            <Typography variant="body1" align="center" sx={{color: theme.palette.secondary.main, fontWeight: 'bold', marginTop: '10px' }}>
              Description:
            
            </Typography>
            <Typography variant="body1" align="center">  {result.description} </Typography>

            <Typography variant="body1" align="center" sx={{color: theme.palette.secondary.main, fontWeight: 'bold', marginTop: '10px' }}>
              Usage: 
            </Typography>
            <Typography variant="body1" align="center" sx={{marginBottom: '10px'}}>
              {result.usage}
            </Typography>
            
           <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              {result.image_url && (
                <img
                  src={result.image_url}
                  alt={result.name}
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              )}
          </Box>         
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </form>
  </Container>
);
}

export default App;
