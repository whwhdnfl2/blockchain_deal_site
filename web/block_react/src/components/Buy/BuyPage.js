import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import { useState } from "react";
import ErrorBuyPage from "./ErrorBuyPage";

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

const BuyPage = (props) => {
  const [isValid, setIsValid] = useState(false);
  const [insertRec, setInsertRec] = useState(0);


  const recChangeHandler = (event) =>{
    setInsertRec(event.target.value);
  }

  const submitHandler = (event) =>{
    event.preventDefault();
    if(props.asset < props.buyRec*insertRec){
        setIsValid(true);
    }
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
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <p>rec 개당 가격: {props.buyRec}</p>
            <p>rec 갯수: {props.buyNum}</p>
            <p>판매자: {props.buyName}</p>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form onSubmit={submitHandler}>
              <div>
                <label htmlFor="rec">구매할 rec 갯수</label>
                <input type="number" id="rec" onChange={recChangeHandler}></input>
              </div>
              <p>insetrec{insertRec}</p>
              <p>보유 asset{props.asset}</p>
              <p>곱한거{props.buyRec * insertRec}</p>
              <p>{props.buyNum}</p>
              <Button type="submit" variant="contained">
                submit
              </Button>
            </form>
          </Typography>
        </Box>  
      </Modal>
      <ErrorBuyPage open={isValid} onValid={setIsValid}></ErrorBuyPage>
    </div>
  );
};

export default BuyPage;
