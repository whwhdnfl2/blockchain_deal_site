import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Button from "@mui/material/Button";
import BuyPage from "./BuyPage";



const Buy = (props) => {
  const [open, setOpen] = useState(false);

  const handleOpen = (t_rec, t_num, t_id) => {
    setNowRec(t_rec);
    setNowAsset(t_num);
    setNowID(t_id);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const [nowrec, setNowRec] = useState(1);
  const [nownum, setNowAsset] = useState(1);
  const [nowID, setNowID] = useState("");


  async function showData() {
    props.onIsLoading(true);
    try{
      const response = await fetch(`/api/Market`);
      if(!response.ok){
        throw new Error('데이터 받아오기 실패')
      }

      const data = await response.json();


      const transformedData = data.map((marketData) => {
        return {
          KRW: marketData.krw,
          REC: marketData.rec,
          seller: marketData.seller,
          id: marketData.id,
          allKRW: marketData.krw * marketData.rec,
        };
      });
      props.onSellRow(transformedData);
      props.onIsLoading(false);
      console.log("buyonshow");
    }catch (error){
      props.onError(error.message);
      console.log(error.message);
    }
  }
  


  return (
    <React.Fragment>
      {!props.isLoading && <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">rec 개당 가격&nbsp;($)</TableCell>
              <TableCell align="right">rec 갯수</TableCell>
              <TableCell align="right">총 가격&nbsp;($)</TableCell>
              <TableCell align="right">판매자</TableCell>
              <TableCell align="right">구매</TableCell>
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
                <TableCell align="right">{row.seller}</TableCell>
                <TableCell align="right">
                  {console.log(row.id)}
                  {props.myAsset >= row.KRW && (
                    <Button onClick={() => handleOpen(row.KRW, row.REC, row.id)}>구매</Button>
                  )}
                  {props.asset < row.allKRW && <Button disabled>구매</Button>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>}
      {props.isLoading && <h2>Loading...</h2>}
      <BuyPage itemID={nowID} open={open} onShow={showData} handleClose={handleClose} myID={props.myID} myRec={props.myRec} myAsset={props.myAsset} onMyRec={props.onMyRec} onMyAsset={props.onMyAsset} buyRec={nowrec} buyNum={nownum}></BuyPage>
    </React.Fragment>
  );
};

export default Buy;
