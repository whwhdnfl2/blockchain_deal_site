import React from "react";
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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const showData = () => {
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
            name: movieData.release_date,
          };
        });
        props.onSellRow(transformedData)
        console.log(transformedData)
      });
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen} variant="contained">
        매물 등록
      </Button>
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
            {props.sellRow.map((row, index) => (
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
      <SellPage
        open={open}
        handleClose={handleClose}
        rec={props.rec}
        asset={props.asset}
        onRec={props.onRec}
        onAsset={props.onAsset}
        onShow={showData}
      ></SellPage>
    </React.Fragment>
  );
};

export default Sell;
