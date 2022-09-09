import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import { useState } from "react";
import ErrorSellPage from "./ErrorSellPage";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const SellPage = (props) => {
  const [isValid, setIsValid] = useState(false);
  const [insertRec, setInsertRec] = useState(0);
  const [insertPrice, setInsertPrice] = useState(0);


  const recChangeHandler = (event) =>{
    setInsertRec(event.target.value);
  }

  const priceChangeHandler = (event) =>{
    setInsertPrice(event.target.value);
  }
  const submitHandler = (event) => {
    event.preventDefault();
    if(props.asset < insertRec*insertPrice){
        setIsValid(true);
        return;
    }
    fetchMoviesHandler();
  };

  const fetchMoviesHandler =() =>{
    fetch("https://swapi.dev/api/people").then(response => {
      console.log(response.json());
    })
  }

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <p>보유 rec: {props.asset}</p>
            <form onSubmit={submitHandler}>
              <div>
                <label htmlFor="rec">판매할 rec 갯수</label>
                <input type="number" id="rec" value={insertRec} onChange={recChangeHandler}></input>
              </div>
              <div>
                <label htmlFor="price">rec 개당 가격</label>
                <input type="number" id="price" value={insertPrice} onChange={priceChangeHandler}></input>
              </div>
              <p>총 가격: {insertPrice * insertRec}</p>
              <Button type="submit" variant="contained">
                submit
              </Button>
            </form>
          </Typography>
        </Box>  
      </Modal>
      <ErrorSellPage open={isValid} onValid={setIsValid}></ErrorSellPage>
    </div>
  );
};

export default SellPage;
