import React, {useState} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Button from "@mui/material/Button";
import SellPage from "./SellPage";

const Sell = (props) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const showData = () => {
    props.onIsLoading(true);
    fetch("http://local:8080/api/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const transformedData = data.map((marketData) => {
          return {
            KRW: marketData.KRW,
            REC: marketData.REC,
            allKRW: marketData.KRW * marketData.REC,
            id: marketData.seller,
          };
        });
        props.onSellRow(transformedData)
        props.onIsLoading(false);
        console.log("onshowSell")
      });
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen} variant="contained">
        매물 등록
      </Button>
      {!props.isLoading && <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">rec 개당 가격&nbsp;($)</TableCell>
              <TableCell align="right">rec 갯수($)</TableCell>
              <TableCell align="right">총 가격&nbsp;($)</TableCell>
              <TableCell align="right">판매자</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.sellRow.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">{row.KRW}</TableCell>
                <TableCell align="right">{row.REC}</TableCell>
                <TableCell align="right">{row.allKRW}</TableCell>
                <TableCell align="right">{row.id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>}
      {props.isLoading && <h2>Loading...</h2>}
      <SellPage
        open={open}
        handleClose={handleClose}
        myID={props.myID}
        myRec={props.myRec}
        myAsset={props.myAsset}
        onMyRec={props.onMyRec}
        onMyAsset={props.onMyAsset}
        onShow={showData}
      ></SellPage>
    </React.Fragment>
  );
};

export default Sell;
