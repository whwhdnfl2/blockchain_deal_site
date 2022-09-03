import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Button from "@mui/material/Button";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import SellPage from "./SellPage";

function createData(rec, num, allRec, name) {
  return { rec, num, allRec, name };
}

const rows = [
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
  createData(100, 159, 100, "이순재"),
  createData(200, 237, 140, "오재석"),
  createData(300, 262, 300, "김재현"),
];

const Sell = (props) => {
  const [page, setPage] = useState(1);
  const handlePage = (event, value) => {
    setPage(value);
  };

  const temp_lows = rows.slice(page * 10 - 10, page * 10);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <React.Fragment>
        <Button onClick={handleOpen}>매물 등록</Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">rec 개당 가격</TableCell>
              <TableCell align="right">rec 갯수&nbsp;($)</TableCell>
              <TableCell align="right">총 가격</TableCell>
              <TableCell align="right">판매자</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {temp_lows.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="rigFht">{row.rec}</TableCell>
                <TableCell align="right">{row.num}</TableCell>
                <TableCell align="right">{row.allRec}</TableCell>
                <TableCell align="right">{row.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={2}>
        <Pagination
          count={parseInt(rows.length / 10) + 1}
          page={page}
          onChange={handlePage}
        />
      </Stack>
      <SellPage
        open={open}
        handleClose={handleClose}
        rec={props.rec}
        asset={props.asset}
        onRec={props.onRec}
        onAsset={props.onAsset}
      ></SellPage>
    </React.Fragment>
  );
};

export default Sell;
