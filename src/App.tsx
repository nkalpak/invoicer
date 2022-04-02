import React from "react";
import {
  AppBar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { Outlet, Link } from "react-location";
import { useStore } from "./features/store";
import { CallReceived, Receipt, Send } from "@mui/icons-material";
import { PageTitle, usePageTitle } from "./components/page-title/page-title";
import { OnboardingPage } from "./features/onboarding/pages/onboarding-page";

const DRAWER_WIDTH = 320;

function DrawerLink({
  to,
  title,
  icon,
}: {
  to: string;
  title: string;
  icon: React.ReactNode;
}) {
  const theme = useTheme();

  return (
    <Link
      getActiveProps={() => ({
        style: {
          color: theme.palette.primary.main,
        },
      })}
      to={to}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <ListItem button>
        <ListItemIcon sx={{ color: "inherit" }}>{icon}</ListItemIcon>
        <ListItemText>{title}</ListItemText>
      </ListItem>
    </Link>
  );
}

function App() {
  const pageTitle = usePageTitle();

  return (
    <div style={{ display: "flex", flexGrow: 1 }}>
      <PageTitle />

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
            <DrawerLink icon={<Receipt />} to="/" title="Generate invoices" />
            <DrawerLink
              icon={<Send />}
              to="/edit-sender"
              title="Invoice sender details"
            />
            <DrawerLink
              icon={<CallReceived />}
              to="/edit-receiver"
              title="Invoice receiver details"
            />
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
              <Typography variant="h6">{pageTitle}</Typography>
            </Toolbar>
          </AppBar>

          <AppContent />
        </Box>
      </Box>
    </div>
  );
}

function AppContent() {
  const { invoiceSender, invoiceReceiver } = useStore();
  const hasRequiredData = invoiceSender.email && invoiceReceiver.email;

  return hasRequiredData ? <Outlet /> : <OnboardingPage />;
}

export default App;
