import React from 'react';
import { ThemeProvider, createTheme, CssBaseline, Grid } from '@mui/material';
import Header from './components/Header';
import MainSection from './components/MainSection';
import Footer from './components/Footer';
import InteractiveComponent from './components/Interactive';

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
        },
      },
    },
  },

  palette: {
    primary: {
      main: '#2D2C38',
    },
    secondary: {
      main: '#C133FF',
    },
    tertiary: {
      main: '#27262E',
    },
    error: {
      main: '#red',
    },
    background: {
      default: '#2D2C38',
    },
    text: {
      primary: '#fff',
      secondary: '#ccc',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Grid container direction="column" style={{ minHeight: '100vh' }}>
          <Grid item>
            <Header />
          </Grid>

          <Grid item container component="main" style={{ flex: 1 }}>
            <Grid item xs={1} sm={2} md={3} lg={4} />
            <Grid item xs={10} sm={8} md={6} lg={4}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <MainSection />
                </Grid>
                <Grid item xs={12}>
                  <InteractiveComponent />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={1} sm={2} md={3} lg={4} />
          </Grid>

          <Grid item>
            <Footer />
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default App;

