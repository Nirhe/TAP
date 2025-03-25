import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';
import SmartToyIcon from '@mui/icons-material/SmartToy';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  borderBottom: `1px solid ${theme.palette.divider}`,
  boxShadow: 'none',
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: '64px',
  padding: '0 24px',
}));

const NavButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginLeft: theme.spacing(1),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.primary.main,
  },
}));

const StyledFooter = styled('footer')(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.divider}`,
  marginTop: 'auto',
}));

const Layout = ({ children }) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: 'background.default'
    }}>
      <StyledAppBar position="fixed">
        <Container maxWidth="xl">
          <StyledToolbar>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <SmartToyIcon sx={{ color: 'primary.main', mr: 1 }} />
              <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 600 }}>
                Ticket Analysis AI
              </Typography>
            </Box>
            <Box>
              <NavButton>
                <DashboardIcon />
              </NavButton>
              <NavButton>
                <HistoryIcon />
              </NavButton>
              <NavButton>
                <SettingsIcon />
              </NavButton>
            </Box>
          </StyledToolbar>
        </Container>
      </StyledAppBar>

      <Box component="main" sx={{ 
        flexGrow: 1, 
        pt: 8,
        pb: 4,
        backgroundColor: 'background.default'
      }}>
        <Container maxWidth="xl">
          {children}
        </Container>
      </Box>

      <StyledFooter>
        <Container maxWidth="xl">
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            color: 'text.secondary'
          }}>
            <Typography variant="body2">
              © 2024 - Ticket Analysis AI
            </Typography>
            <Typography variant="body2">
              Powered by Advanced AI
            </Typography>
          </Box>
        </Container>
      </StyledFooter>
    </Box>
  );
};

export default Layout; 