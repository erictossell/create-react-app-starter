// Footer.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function Footer() {
  const theme = useTheme();
  
  return (
    <Box 
      component="footer" 
      sx={{ 
        backgroundColor: theme.palette.tertiary.main, 
        color: theme.palette.text.primary, 
        padding: theme.spacing(2), 
        textAlign: 'center' 
      }}
    >
      <Typography
        variant="body1"
        sx={{ color: theme.palette.secondary.main }}
      >
        &copy; 2023 Mythic+ Bot
      </Typography>
    </Box>
  );
}

export default Footer;
