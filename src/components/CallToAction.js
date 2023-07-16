
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Grid, Typography, Card, CardContent, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import InviteButton from './InviteButton';

function CallToAction() {
  const theme = useTheme();

return (

<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',  }}>
    <div style={{ width: '90vw' }}>
  <section style={{ backgroundColor: theme.palette.tertiary.main, padding: '40px', textAlign: 'center' }}>
    <h2>Explore More Pages</h2>
    <p>Discover additional information about Mythic+ Bot.</p>
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} sm={6} md={4}>
        <Card sx={{ marginTop: theme.spacing(2), backgroundColor: theme.palette.tertiary.main, color: '#fff'}}>
          <CardContent>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center',justifyContent: 'center', overflowWrap: 'break-word' }}>
              Docs
            </Typography>
            <Typography variant="body2" sx={{ display: 'flex', overflowWrap: 'break-word' }}>
              Check out our source code repository for open-source contributions.
            </Typography>
            <Button variant="contained" color="secondary" component={RouterLink} to="/docs">
              View Docs
            </Button>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card sx={{ marginTop: theme.spacing(2), backgroundColor: theme.palette.tertiary.main, color: '#fff' }}>
          <CardContent>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center',justifyContent: 'center', overflowWrap: 'break-word' }}>
              DevBlog
            </Typography>
            <Typography variant="body2" sx={{ display: 'flex', overflowWrap: 'break-word' }}>
              Check out our source code repository for open-source contributions.
            </Typography>
            <Button variant="contained" color="secondary" component={RouterLink} to="/devblog">
              View Dev Blog
            </Button>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card sx={{ marginTop: theme.spacing(2), backgroundColor: theme.palette.tertiary.main, color: '#fff'}}>
          <CardContent>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center',justifyContent: 'center', overflowWrap: 'break-word' }}>
              Repo
            </Typography>
            <Typography variant="body2" sx={{ display: 'flex', overflowWrap: 'break-word' }}>
              Check out our source code repository for open-source contributions.
            </Typography>
            <Button variant="contained" color="secondary" component={RouterLink} to="/repo">
              View Repository
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
    <Grid container justifyContent="center" sx={{ marginTop: '20px' }}>
      <Grid item>
        <InviteButton />
      </Grid>
    </Grid>
  </section>
  </div>
  </div>
);}
export default CallToAction;
