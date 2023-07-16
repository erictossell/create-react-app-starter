// MainSection.js
import React from 'react';
import { Typography, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function MainSection() {
  const theme = useTheme();
  return (
    <Grid 
      container 
      alignItems="center" 
      justifyContent="center"
      style={{ flex: 1, marginTop: '20px' }}    
      sx={{ backgroundColor: theme.palette.background.default, color: theme.palette.text.primary }}
    >
      <Typography variant="body1" align="center">
        Use this page to try out the bot before you install it on your server.
      </Typography>
      
      <Typography 
        variant="body1"
        align="center"
        sx={{ color: theme.palette.secondary.main }} 
      >
        This page is currently using sample data provided by Take a Lap on Area-52 US.
      </Typography>
    </Grid>
  );
}

export default MainSection;

