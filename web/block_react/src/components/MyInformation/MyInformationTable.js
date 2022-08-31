import React, {useState} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";


import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function createData(date, rec, dollar, name) {
  return { date, rec, dollar, name };
}

const rows = [
  createData("2022-05-11", 159, 6.0, "이순재"),
  createData("2022-01-11", 237, 9.0, "오재석"),
  createData("2022-03-12", 262, 16.0, "김재현"),
  createData("2021-08-11", 305, 3.7, "차민준"),
  createData("2022-05-11", 159, 6.0, "이순재"),
  createData("2022-01-11", 237, 9.0, "오재석"),
  createData("2022-03-12", 262, 16.0, "김재현"),
  createData("2021-08-11", 305, 3.7, "차민준"),
  createData("2022-05-11", 159, 6.0, "이순재"),
  createData("2022-01-11", 237, 9.0, "오재석"),
  createData("2022-03-12", 262, 16.0, "김재현"),
  createData("2021-08-11", 305, 3.7, "차민준"),
  createData("2022-05-11", 159, 6.0, "이순재"),
  createData("2022-01-11", 237, 9.0, "오재석"),
  createData("2022-03-12", 262, 16.0, "김재현"),
  createData("2021-08-11", 305, 3.7, "차민준"),
  createData("2022-05-11", 159, 6.0, "이순재"),
  createData("2022-01-11", 237, 9.0, "오재석"),
  createData("2022-03-12", 262, 16.0, "김재현"),
  createData("2021-08-11", 305, 3.7, "차민준"),
  createData("2022-05-11", 159, 6.0, "이순재"),
  createData("2022-01-11", 237, 9.0, "오재석"),
  createData("2022-03-12", 262, 16.0, "김재현"),
  createData("2021-08-11", 305, 3.7, "차민준"),
  createData("2022-05-11", 159, 6.0, "이순재"),
  createData("2022-01-11", 237, 9.0, "오재석"),
  createData("2022-03-12", 262, 16.0, "김재현"),
  createData("2021-08-11", 305, 3.7, "차민준"),
  createData("2022-05-11", 159, 6.0, "이순재"),
  createData("2022-01-11", 237, 9.0, "오재석"),
  createData("2022-03-12", 262, 16.0, "김재현"),
  createData("2021-08-11", 305, 3.7, "차민준"),
  createData("2022-05-11", 159, 6.0, "이순재"),
  createData("2022-01-11", 237, 9.0, "오재석"),
  createData("2022-03-12", 262, 16.0, "김재현"),
  createData("2021-08-11", 305, 3.7, "차민준"),
];

const MyInformationTable = (props) => {

    const [page, setPage] = useState(1);
    const handlePage = (event, value) => {
      setPage(value);
    };

    const temp_lows = rows.slice((page * 10 - 10), page * 10);


  return (
    <React.Fragment>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">거래 시기</TableCell>
              <TableCell align="right">rec거래량</TableCell>
              <TableCell align="right">dollar거래량&nbsp;($)</TableCell>
              <TableCell align="right">거래 대상</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {temp_lows.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="rigFht">{row.date}</TableCell>
                <TableCell align="right">{row.rec}</TableCell>
                <TableCell align="right">{row.dollar}</TableCell>
                <TableCell align="right">{row.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={2}>
        <Pagination count={parseInt(rows.length / 10) + 1} page={page} onChange={handlePage}/>
      </Stack>
    </React.Fragment>
  );
};

export default MyInformationTable;
