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
        { <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">거래 시기</TableCell>
              <TableCell align="right">rec거래량</TableCell>
              <TableCell align="right">dollar거래량&nbsp;($)</TableCell>
              <TableCell align="right">거래 대상</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.informationRow.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{row.timestamp}</TableCell>
                <TableCell align="right">{row.record.REC}</TableCell>
                <TableCell align="right">{row.record.KRW}</TableCell>
                <TableCell align="right">{row.record.ID}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> }
    </React.Fragment>
  );
};

export default MyInformationTable;
