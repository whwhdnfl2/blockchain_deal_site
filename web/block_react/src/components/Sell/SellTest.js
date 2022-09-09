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



const SellTest = (props) => {
  const [page, setPage] = useState(1);
  const handlePage = (event, value) => {
    setPage(value);
  };


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const [rows, setRows] = useState([]);

    fetch("https://swapi.dev/api/films").then(response => {
        return response.json()
    }).then(data => {
        const transformedData = data.results.map(movieData => {
            return {
                rec: movieData.episode_id,
                num: movieData.director,
                allRec: movieData.title,
                name: movieData.release_date,
            }
        })
        setRows(transformedData);
    })
    const temp_lows = rows.slice(page * 10 - 10, page * 10);


  return (
    <React.Fragment>
        <Button onClick={handleOpen} variant="contained">매물 등록</Button>
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
                <TableCell align="right">{row.rec}</TableCell>
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

export default SellTest;
