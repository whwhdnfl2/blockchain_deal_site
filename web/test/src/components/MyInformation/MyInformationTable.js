import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";



const MyInformationTable = (props) => {

  return (
    <React.Fragment>
        { props.informationRow.length !== 0 &&<TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">거래 시기</TableCell>
              <TableCell align="right">rec거래량</TableCell>
              <TableCell align="right">dollar거래량&nbsp;($)</TableCell>
              <TableCell align="right">판매자</TableCell>
              <TableCell align="right">구매자</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.informationRow.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{row.time}</TableCell>
                <TableCell align="right">{row.rec}</TableCell>
                <TableCell align="right">{row.krw}</TableCell>
                <TableCell align="right">{row.seller}</TableCell>
                <TableCell align="right">{row.buyer}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> }
      {props.informationRow.length === 0 && <h2>No data!!</h2>}
    </React.Fragment>
  );
};

export default MyInformationTable;
