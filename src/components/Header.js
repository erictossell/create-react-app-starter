import React from 'react';
import { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

import { AppBar, Toolbar, Typography, Box, Stack, Container, List, ListItem, Drawer, IconButton, ListItemText, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import styled from '@emotion/styled';
import MenuIcon from '@mui/icons-material/Menu';

import InviteButton from './InviteButton';

import Logo from '../color_logo.svg'; // Import your logo

const LogoImage = styled('img')`
  height: 35px; // Adjust based on your logo size
  width: auto; // Let the width adjust automatically
  max-width: 100%;
`;


function Header() {

  const theme = useTheme();
  const location = useLocation();
  const matches = useMediaQuery(theme.breakpoints.up('lg'));
  
  const CustomListItem = styled(ListItem)(({ theme }) => ({
    backgroundColor: theme.palette.tertiary.main, // or other color you want
    color: theme.palette.text.primary, // or other color you want
    '&.Mui-selected': {
      color: theme.palette.secondary.main, // color of the selected item
    },
    '&:hover': {
      backgroundColor: theme.palette.tertiary.main, // or other color you want
    },
    width: '100%',
  }));

  const StyledDrawer = styled(Drawer)({
    ".MuiDrawer-paper": {
      backgroundColor: theme.palette.tertiary.main,
     width: "250px",
    },
    "& .MuiList-root": {
      flexDirection: "column", // Display items vertically in the drawer
    },
  });

  const StyledIconButton = styled(IconButton)({
    marginLeft: theme.spacing(2),
    color: theme.palette.secondary.main,// Spacing the Icon Button from the Coming Soon button
  });
  

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };


const MenuList = (
  <Box display="flex" flexDirection="row" alignItems="center">
    <CustomListItem
      button
      component={RouterLink}
      to="/docs"
      selected={location.pathname === "/docs"} // highlights the item if the path is "/docs"
    >
      <ListItemText primaryTypographyProps={{ sx: { whiteSpace: 'nowrap' } }} primary="Docs" />
    </CustomListItem>
    <CustomListItem
      button
      component={RouterLink}
      to="/devblog"
      selected={location.pathname === "/devblog"} // highlights the item if the path is "/devblog"
    >
      <ListItemText primaryTypographyProps={{ sx: { whiteSpace: 'nowrap' } }} primary="Dev Blog" />
    </CustomListItem>
    <CustomListItem
      button
      component={RouterLink}
      to="/repo"
      selected={location.pathname === "/repo"} // highlights the item if the path is "/repo"
    >
      <ListItemText primaryTypographyProps={{ sx: { whiteSpace: 'nowrap' } }} primary="Repo" />
    </CustomListItem>

    {matches && <InviteButton />}
  </Box>
);

const VerticalMenuList = (
  <Box width="200px"> {/* Set the desired width */}
    <CustomListItem
      button
      component={RouterLink}
      to="/"
      selected={location.pathname === "/"} // highlights the item if the path is "/"
    >
      <ListItemText primaryTypographyProps={{ sx: { display: 'flex' } }} primary="Mythic+ Bot" />
    </CustomListItem>
    <CustomListItem
      button
      component={RouterLink}
      to="/docs"
      selected={location.pathname === "/docs"} // highlights the item if the path is "/docs"
    >
      <ListItemText primaryTypographyProps={{ sx: { width: '100%' } }} primary="Docs" />
    </CustomListItem>
    <CustomListItem
      button
      component={RouterLink}
      to="/devblog"
      selected={location.pathname === "/devblog"} // highlights the item if the path is "/devblog"
    >
      <ListItemText primaryTypographyProps={{ sx: { width: '100%' } }} primary="Dev Blog" />
    </CustomListItem>
    <CustomListItem
      button
      component={RouterLink}
      to="/repo"
      selected={location.pathname === "/repo"} // highlights the item if the path is "/repo"
    >
      <ListItemText primaryTypographyProps={{ sx: { whiteSpace: 'nowrap' } }} primary="Repo" />
    </CustomListItem>

  </Box>
);

return (
    <>
      <AppBar position="static" sx={{ backgroundColor: theme.palette.tertiary.main }}>
        <Container maxWidth="lg">
          <Toolbar>
            <Box flexGrow={1}>
              <Stack direction="row" spacing={2} alignItems="center">
                <RouterLink to="/">
                  <LogoImage src={Logo} alt="logo" />
                </RouterLink>

                <Box flexGrow={1}>
                  <Typography variant="h6"></Typography>
                </Box>
                {matches && (
                  <Box display="flex" alignItems="center">
                    {MenuList}
                  </Box>
                )}
              </Stack>
            </Box>
            {!matches && (
              <>
                <StyledIconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ ml: 2 }}
                  onClick={handleDrawerToggle}
                >
                  <MenuIcon />
                </StyledIconButton>
              <InviteButton />
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      {!matches && ( // Show the drawer when screen size is less than 'lg'
        <StyledDrawer open={drawerOpen} onClose={handleDrawerToggle}>
          <List>
            {VerticalMenuList}
          </List>
          <InviteButton />
        </StyledDrawer>
      )}
    </>
  );
}export default Header;
