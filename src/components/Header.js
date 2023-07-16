import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import styled from '@emotion/styled';

import Logo from '../color_logo.svg'; // Import your logo

const Title = styled(Typography)`
  flex-grow: 1;
  display: flex;
  align-items: center;
`;

const LogoImage = styled('img')`
  height: 35px; // Adjust based on your logo size
  width: auto; // Let the width adjust automatically
  max-width: 100%;
`;

function Header() {
  const theme = useTheme();

  return (
    <AppBar position="static" sx={{ backgroundColor: theme.palette.tertiary.main }}>
      <Toolbar>
        <Stack direction="row" spacing={2} alignItems="center">
          <LogoImage src={Logo} alt="logo" />

          <Box flexGrow={1}>
            <Typography variant="h6"></Typography>
          </Box>
        </Stack>

        <Button
          variant="outlined"
          sx={{
            color: theme.palette.secondary.main,
            borderColor: theme.palette.secondary.main,
            backgroundColor: theme.palette.background.default,
            whiteSpace: 'nowrap', // Prevent the button from wrapping
            marginLeft: 'auto', // Push the button to the right edge
          }}
        >
          Coming soon
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;

