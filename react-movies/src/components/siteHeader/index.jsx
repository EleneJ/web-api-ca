import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router";
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {
  const { user, logout } = useAuth(); // use 'user' instead of 'currentUser'
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  console.log("User in SiteHeader:", user);

  const menuOptions = [
    { label: "Home", path: "/" },
    ...(user ? [              // <---- use 'user' here
      { label: "Favorites", path: "/movies/favorites" },
      { label: "Playlist", path: "/playlist" }
    ] : []),
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Top Rated", path: "/movies/top-rated" }
  ];

  const handleMenuSelect = (pageURL) => {
    setAnchorEl(null);
    navigate(pageURL);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

return (
  <>
    <AppBar position="fixed" sx={{ backgroundColor: "#8F4700" }}>
      <Toolbar>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          MovieGlobe
        </Typography>
        {isMobile ? (
          <>
            <IconButton
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={open}
              onClose={() => setAnchorEl(null)}
            >
              {menuOptions.map((opt) => (
                <MenuItem key={opt.label} onClick={() => handleMenuSelect(opt.path)}>
                  {opt.label}
                </MenuItem>
              ))}
              {user ? (
                <MenuItem onClick={logout}>Log Out</MenuItem>
              ) : (
                [
                  <MenuItem key="login" onClick={() => handleMenuSelect("/login")}>Log In</MenuItem>,
                  <MenuItem key="signup" onClick={() => handleMenuSelect("/signup")}>Sign Up</MenuItem>
                ]
              )}
            </Menu>
          </>
        ) : (
          <>
            {menuOptions.map((opt) => (
              <Button
                key={opt.label}
                color="inherit"
                onClick={() => handleMenuSelect(opt.path)}
              >
                {opt.label}
              </Button>
            ))}
            {user ? (
              <Button color="inherit" onClick={logout}>
                Log Out
              </Button>
            ) : (
              <>
                <Button color="inherit" onClick={() => navigate("/login")}>
                  Log In
                </Button>
                <Button color="inherit" onClick={() => navigate("/signup")}>
                  Sign Up
                </Button>
              </>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
    <Offset />
  </>
);

};

export default SiteHeader;
