import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { Outlet, useNavigate } from "react-location";
import { useStore } from "./features/store";

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
    </div>
  );
}

export default App;
