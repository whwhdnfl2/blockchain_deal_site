import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Store from "@mui/icons-material/Store";
import Home from "@mui/icons-material/Home";
import PermIdentity from "@mui/icons-material/PermIdentity";
import Login from "../Login/Login";
import { useState } from "react";
import { Button } from "@mui/material";
import Card from "../../UI/Card/Card";
import MyInformation from "../MyInformation/MyInformation";
import Buy from "../Buy/Buy";
import Sell from "../Sell/Sell";
import SellTest from "../Sell/SellTest"


const drawerWidth = 240;

const HomePage = () => {
  const [page, setPage] = useState(1);
  const [myID, setMyID] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const [asset, setAsset] = useState(150);
  const [rec, setRec] = useState(100);


  const LoginHandler = () => {
    setIsLogin(true);
  };

  const LogoutHandler = () => {
    setIsLogin(false);
    setPage(1);
  };

  const MyIDHander = (ID) => {
    setMyID(ID);
  };

  const PageHanderOne = () => {
    setPage(1);
  };
  const PageHanderTwo = () => {
    setPage(2);
  };
  const PageHanderThree = () => {
    setPage(3);
  };
  const PageHanderFour = () => {
    setPage(4);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {page === 1 && `홈페이지`}
            {page === 2 && `내 거래내역`}
            {page === 3 && `REC 구매`}
            {page === 4 && `REC 판매`}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {["홈페이지", "내 거래내역", "REC 구매", "REC 판매"].map(
            (text, index) => (
              <ListItem key={text} disablePadding>
                {index === 0 && (
                  <ListItemButton disabled={!isLogin} onClick={PageHanderOne}>
                    <ListItemIcon>{<Home />}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                )}
                {index === 1 && (
                  <ListItemButton disabled={!isLogin} onClick={PageHanderTwo}>
                    <ListItemIcon>{<PermIdentity />}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                )}
                {index === 2 && (
                  <ListItemButton disabled={!isLogin} onClick={PageHanderThree}>
                    <ListItemIcon>{<Store />}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                )}
                {index === 3 && (
                  <ListItemButton disabled={!isLogin} onClick={PageHanderFour}>
                    <ListItemIcon>{<Store />}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                )}
              </ListItem>
            )
          )}
        </List>
        <Divider />
        {!isLogin && <Login onLogin={LoginHandler} onID={MyIDHander} />}
        {isLogin && (
          <Card>
            <p>{myID}</p>
            <p>보유 자산: {asset} </p>
            <p>보유 REC: {rec}</p>
            <Button onClick={LogoutHandler}>Logout</Button>
          </Card>
        )}
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        {page === 1 && <Typography paragraph>홈페이지</Typography>}
        {page === 2 && <MyInformation/>}
        {page === 3 && <Buy rec={rec} asset={asset} onRec={setRec} onAsset={setAsset}/>}
        {page === 4 && <SellTest rec={rec} asset={asset} onRec={setRec} onAsset={setAsset}>판매</SellTest>}
      </Box>
    </Box>
  );
};

export default HomePage;
