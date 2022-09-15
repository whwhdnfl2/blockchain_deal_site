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


function createData(rec, num, allRec, name) {
  return { rec, num, allRec, name };
}

const rows = [
  {rec: 100, num:300, allRec: 140, name:"이순재"},
  createData(200, 237, 140, "오재석"),
  createData(300, 262, 300, "김재현"),
  createData(100, 159, 100, "이순재"),
  createData(200, 237, 140, "오재석"),
  createData(300, 262, 300, "김재현"),
  createData(100, 159, 100, "이순재"),
  createData(200, 237, 140, "오재석"),
  createData(300, 262, 300, "김재현"),
  createData(100, 159, 100, "이순재"),
  createData(200, 237, 140, "오재석"),
  createData(300, 262, 300, "김재현"),
  createData(100, 159, 100, "이순재"),
  createData(200, 237, 140, "오재석"),
  createData(300, 262, 300, "김재현"),
  createData(100, 159, 100, "이순재"),
  createData(200, 237, 140, "오재석"),
  createData(300, 262, 300, "김재현"),
  createData(100, 159, 100, "이순재"),
  createData(200, 237, 140, "오재석"),
  createData(300, 262, 300, "김재현"),
  createData(100, 159, 100, "이순재"),
  createData(200, 237, 140, "오재석"),
  createData(300, 262, 300, "김재현"),
  createData(100, 159, 100, "이순재"),
  createData(200, 237, 140, "오재석"),
  createData(300, 262, 300, "김재현"),
  createData(100, 159, 100, "이순재"),
  createData(200, 237, 140, "오재석"),
  createData(300, 262, 300, "김재현"),
];

const Buy = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = (t_rec, t_num, t_name) => {
    setNowRec(t_rec);
    setNowAsset(t_num);
    setNowName(t_name);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const [nowrec, setNowRec] = useState(1);
  const [nownum, setNowAsset] = useState(1);
  const [nowname, setNowName] = useState("");

  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">rec 개당 가격</TableCell>
              <TableCell align="right">rec 갯수&nbsp;($)</TableCell>
              <TableCell align="right">총 가격</TableCell>
              <TableCell align="right">판매자</TableCell>
              <TableCell align="right">구매</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="rigFht">{row.rec}</TableCell>
                <TableCell align="right">{row.num}</TableCell>
                <TableCell align="right">{row.allRec}</TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">
                  {props.asset > row.allRec && (
                    <Button onClick={() => handleOpen(row.rec, row.num, row.name)}>구매</Button>
                  )}
                  {props.asset < row.allRec && <Button disabled>구매</Button>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <BuyPage open={open} handleClose={handleClose} rec={props.rec} asset={props.asset} onRec={props.onRec} onAsset={props.onAsset} buyRec={nowrec} buyNum={nownum} buyName={nowname}></BuyPage>
    </React.Fragment>
  );
};

export default Buy;
