import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Outlet, useNavigate, Link } from "react-location";
import { useStore } from "./features/store";

const DRAWER_WIDTH = 320;

function DrawerLink({ to, title }: { to: string; title: string }) {
  return (
    <Link to={to} style={{ textDecoration: "none", color: "inherit" }}>
      <ListItem button>{title}</ListItem>
    </Link>
  );
}

function App() {
  const { invoiceSender, invoiceReceiver } = useStore();
  const navigate = useNavigate();

  const hasRequiredData = invoiceSender.email && invoiceReceiver.email;

  React.useLayoutEffect(() => {
    if (!hasRequiredData) {
      navigate({
        to: "/onboarding",
      });
    }
  }, [hasRequiredData, navigate]);

  return (
    <div style={{ display: "flex", flexGrow: 1 }}>
      <Box sx={{ flexGrow: 1, color: "white" }}>
        <Drawer
          sx={{
            "& .MuiDrawer-paper": {
              width: DRAWER_WIDTH,
            },
          }}
          variant="permanent"
          anchor="left"
          open
        >
          <List>
            <DrawerLink to="/" title="Generate invoices" />
            <DrawerLink to="/edit-sender" title="Invoice sender details" />
            <DrawerLink to="/edit-receiver" title="Invoice receiver details" />
          </List>
        </Drawer>

        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            flexDirection: "column",
            ml: `${DRAWER_WIDTH}px`,
          }}
        >
          <AppBar position="sticky" sx={{ mb: 8 }}>
            <Toolbar>
              <IconButton color="inherit" sx={{ mr: 2 }}>
                <MenuIcon />
              </IconButton>

              <Typography variant="h6">Invoice generator</Typography>
            </Toolbar>
          </AppBar>

          <Outlet />
        </Box>
      </Box>
    </div>
  );
}

export default App;
