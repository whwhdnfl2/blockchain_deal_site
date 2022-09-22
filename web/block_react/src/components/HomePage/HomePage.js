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
import MyInformationTable from "../MyInformation/MyInformationTable";
import Buy from "../Buy/Buy";
import Sell from "../Sell/Sell";
import ErrorLogin from "../Login/ErrorLogin";


const drawerWidth = 240;

const HomePage = () => {
  console.log("홈페이지");
  const [page, setPage] = useState(1);
  const [myID, setMyID] = useState("");
  const [isLoginBuyer, setIsLoginBuyer] = useState(false);
  const [isLoginSeller, setIsLoginSeller] = useState(false);
  const [tax, setTax] = useState(0);

  const [asset, setAsset] = useState(150);
  const [rec, setRec] = useState(100);

  const [sellRows, setSellRows] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [loginIsValid, setLoginIsValid] = useState(false);

  const [role, setRole] = useState("buyer");


  const BuyerLoginHandler = () => {
    setIsLoginBuyer(true);
  };

  const SellerLoginHandler = () => {
    setIsLoginSeller(true);
  };

  const LogoutHandler = () => {
    setIsLoginBuyer(false);
    setIsLoginSeller(false);
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
    setIsLoading(true);
    setPage(3);
    fetch("https://swapi.dev/api/films")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const transformedData = data.results.map((movieData) => {
        return {
          rec: movieData.episode_id,
          num: movieData.director,
          allRec: movieData.title,
          id: movieData.release_date,
        };
      });
      setSellRows(transformedData);
      setIsLoading(false);
      console.log("homepagebuyshow");
    });
  };
  const PageHanderFour = () => {
    setIsLoading(true);
    setPage(4);
    fetch("https://swapi.dev/api/films")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const transformedData = data.results.map((movieData) => {
        return {
          rec: movieData.episode_id,
          num: movieData.director,
          allRec: movieData.title,
          id: movieData.release_date,
        };
      });
      setSellRows(transformedData);
      setIsLoading(false);
      console.log("homepagesellshow");
    });
  };

  return (
    <React.Fragment>
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
                  <ListItemButton disabled={!(isLoginBuyer||isLoginSeller)} onClick={PageHanderOne}>
                    <ListItemIcon>{<Home />}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                )}
                {index === 1 && (
                  <ListItemButton disabled={!(isLoginBuyer||isLoginSeller)} onClick={PageHanderTwo}>
                    <ListItemIcon>{<PermIdentity />}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                )}
                {index === 2 && (
                  <ListItemButton disabled={!isLoginBuyer} onClick={PageHanderThree}>
                    <ListItemIcon>{<Store />}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                )}
                {index === 3 && (
                  <ListItemButton disabled={!isLoginSeller} onClick={PageHanderFour}>
                    <ListItemIcon>{<Store />}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                )}
              </ListItem>
            )
          )}
        </List>
        <Divider />
        {!(isLoginBuyer || isLoginSeller) && <Login onRole={setRole} onSellerLogin={SellerLoginHandler} onBuyerLogin={BuyerLoginHandler} onID={MyIDHander} onTax={setTax} isValid={loginIsValid} onValid={setLoginIsValid}/>}
        {(isLoginBuyer || isLoginSeller) && (
          <Card>
            <p>{myID}</p>
            <p>role: {role}</p>
            <p>보유 자산: {asset} </p>
            <p>보유 REC: {rec}</p>
            <p>현재 세율: {tax}</p>
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
        {page === 2 && <MyInformationTable/>}
        {page === 3 && <Buy isLoading={isLoading} onIsLoading={setIsLoading} sellRow={sellRows} myID={myID} onSellRow={setSellRows} myRec={rec} myAsset={asset} onMyRec={setRec} onMyAsset={setAsset}/>}
        {page === 4 && <Sell isLoading={isLoading} onIsLoading={setIsLoading} sellRow={sellRows} myID={myID} onSellRow={setSellRows} myRec={rec} myAsset={asset} onMyRec={setRec} onMyAsset={setAsset}/>}
      </Box>
    </Box>
    <ErrorLogin open={loginIsValid} onValid={setLoginIsValid}></ErrorLogin>
    </React.Fragment>
  );
};

export default HomePage;
