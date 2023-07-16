// Footer.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
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
      <RouterLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        &copy; 2023 Mythic+ Bot
      </RouterLink>
      </Typography>
    </Box>
  );
}

export default Footer;
