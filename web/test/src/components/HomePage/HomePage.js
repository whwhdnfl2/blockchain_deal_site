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
import Tax from "../Tax/Tax";


const drawerWidth = 240;

const HomePage = () => {
  console.log("홈페이지");
  const [page, setPage] = useState(1);
  const [myID, setMyID] = useState("");
  const [isLoginBuyer, setIsLoginBuyer] = useState(false);
  const [isLoginSeller, setIsLoginSeller] = useState(false);
  const [isLoginAdmin, setIsLoginAdmin] = useState(false);
  const [isLoginAdminTax, setIsLoginAdminTax] = useState(false);
  const [tax, setTax] = useState(0);

  const [taxOpen, setTaxOpen] = useState(false);

  const handleTaxOpen = () => {
    setTaxOpen(true);
  };
  const handleTaxClose = () => setTaxOpen(false);

  const [asset, setAsset] = useState(0);
  const [rec, setRec] = useState(0);

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

  const AdminLoginHandler = () => {
    setIsLoginAdmin(true);
  }

  const TaxAdminLoginHandler = () => {
    setIsLoginAdminTax(true);
  }

  const LogoutHandler = () => {
    setIsLoginBuyer(false);
    setIsLoginSeller(false);
    setIsLoginAdmin(false);
    setIsLoginAdminTax(false);
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

  const PageHandlerFive =() =>{
    setPage(5);
    handleTaxOpen();
  }

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
          {(isLoginBuyer || isLoginSeller) && (["홈페이지", "내 거래내역", "REC 구매", "REC 판매"].map(
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
          ))}
          {isLoginAdmin && (["홈페이지", "모든 거래내역", "REC 구매", "REC 판매"].map(
            (text, index) => (
              <ListItem key={text} disablePadding>
                {index === 0 && (
                  <ListItemButton disabled={false} onClick={PageHanderOne}>
                    <ListItemIcon>{<Home />}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                )}
                {index === 1 && (
                  <ListItemButton disabled={false} onClick={PageHanderTwo}>
                    <ListItemIcon>{<PermIdentity />}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                )}
                {index === 2 && (
                  <ListItemButton disabled={true} onClick={PageHanderThree}>
                    <ListItemIcon>{<Store />}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                )}
                {index === 3 && (
                  <ListItemButton disabled={true} onClick={PageHanderFour}>
                    <ListItemIcon>{<Store />}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                )}
              </ListItem>
            )
          ))}
          {isLoginAdminTax && (["홈페이지", "Tax 수정", "REC 구매", "REC 판매"].map(
            (text, index) => (
              <ListItem key={text} disablePadding>
                {index === 0 && (
                  <ListItemButton disabled={false} onClick={PageHanderOne}>
                    <ListItemIcon>{<Home />}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                )}
                {index === 1 && (
                  <ListItemButton disabled={false} onClick={PageHandlerFive}>
                    <ListItemIcon>{<PermIdentity />}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                )}
                {index === 2 && (
                  <ListItemButton disabled={true} onClick={PageHanderThree}>
                    <ListItemIcon>{<Store />}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                )}
                {index === 3 && (
                  <ListItemButton disabled={true} onClick={PageHanderFour}>
                    <ListItemIcon>{<Store />}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                )}
              </ListItem>
            )
          ))}          
        </List>
        <Divider />
        {!(isLoginBuyer || isLoginSeller || isLoginAdmin || isLoginAdminTax) && <Login rec={rec} onRec={setRec} onAsset={setAsset} asset={asset} onRole={setRole} onSellerLogin={SellerLoginHandler} onBuyerLogin={BuyerLoginHandler} onAdminLogin={AdminLoginHandler} onTaxAdminLogin={TaxAdminLoginHandler} onID={MyIDHander} onTax={setTax} isValid={loginIsValid} onValid={setLoginIsValid}/>}
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
        {isLoginAdmin && (
          <Card>
            <p>{myID}</p>
            <p>role: {role}</p>
            <p>현재 세율: {tax}</p>
            <Button onClick={LogoutHandler}>Logout</Button>
          </Card>
        )}
        {isLoginAdminTax && (
          <Card>
            <p>{myID}</p>
            <p>role: {role}</p>
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
        {page === 5 && <Tax open={taxOpen} onTaxOpen={handleTaxOpen} onTaxClose={handleTaxClose} tax={tax} onTax={setTax}></Tax>}
      </Box>
    </Box>
    <ErrorLogin open={loginIsValid} onValid={setLoginIsValid}></ErrorLogin>
    </React.Fragment>
  );
};

export default HomePage;