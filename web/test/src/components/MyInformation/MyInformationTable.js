import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

let rows = [{"record":{"docType":"asset","ID":"asset1","owner":"kimcharless","REC":5,"KRW":25000,"Role":"done"},"txId":"6df6d0f12a467ec2323a569b003e736e5a172246083f920b8f03a326db54ffc2","timestamp":"2022-09-19T11:29:56.315120505Z","isDelete":false},{"record":{"docType":"","ID":"asset1","owner":"","REC":0,"KRW":0,"Role":""},"txId":"3fc6f963340e26a51f6bcf081c13433e929c7b9fc99bde1edec6e79155d64efd","timestamp":"2022-09-19T11:29:28.97922553Z","isDelete":true},{"record":{"docType":"asset","ID":"asset1","owner":"kimcharless","REC":100,"KRW":10000,"Role":"done"},"txId":"ea0f2dadba29d2e0d300340e06ff55689ba7fd30c0a79af2892d6d2404300a41","timestamp":"2022-09-19T11:09:17.372171884Z","isDelete":false},{"record":{"docType":"asset","ID":"asset1","owner":"kimcharless","REC":5,"KRW":25000,"Role":"done"},"txId":"e190c546513a901c340e62191874550ef56324709c9f2ce15310074247106ffd","timestamp":"2022-09-18T10:18:46.789872452Z","isDelete":false}]


const MyInformationTable = (props) => {
  console.log(rows);
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
            {rows.map((row, index) => (
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
