import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import * as React from 'react';

import { useAuthContext } from './AuthContextProvider';

interface Pages {
  label: string;
  href: string;
}

const pages: Array<Pages> = [
  { label: 'Home', href: '/home' },
  { label: 'Search', href: '/search' },
];

interface Setting {
  label: string;
  href: string;
}

const settings: Array<Setting> = [
  { label: 'Profile', href: '/profile' },
  { label: 'Logout', href: '/login' },
];

const ResponsiveAppBar: React.FC = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user, loading } = useAuthContext();

  return (
    <AppBar sx={{ width: '100', margin: '0', padding: '0' }} position="static">
      <Container>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/home"
            sx={{
              mr: 0,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.4rem',
              color: 'inherit',
              textDecoration: 'none',
              marginTop: 0,
            }}
          >
            <Box sx={{ marginTop: 1 }}>
              <Image src="/placeholder.png" alt="logo" width={55} height={55} />
            </Box>

            <Box sx={{ padding: '6px', margin: '16px' }} textAlign="center">
              TRAVEL HUB
            </Box>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page: Pages) => (
                <MenuItem
                  key={page.label}
                  component="a"
                  href={page.href}
                  onClick={handleCloseUserMenu}
                >
                  <Typography
                    sx={{ mr: 10, marginLeft: 0, marginTop: 0 }}
                    textAlign="center"
                  >
                    {page.label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
            <Image src="/placeholder.png" alt="logo" width={50} height={50} />
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/home"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            TRAVEL HUB
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page: Pages) => (
              <Button
                key={page.label}
                onClick={handleCloseNavMenu}
                href={page.href}
                sx={{ my: 2, marginRight: 3, color: 'white', display: 'block' }}
              >
                {page.label}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton
              sx={{ mr: 5 }}
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting: Setting) => (
                <MenuItem
                  key={setting.label}
                  component="a"
                  href={setting.href}
                  onClick={handleCloseUserMenu}
                >
                  <Typography textAlign="center">{setting.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
// eslint-disable-next-line import/no-default-export
export default ResponsiveAppBar;
