import * as React from 'react';

import classes from "./good.module.css";
import Card from "./Card"

const InnerPage = (props) => {
    return (
        <React.Fragment>
            <div className={classes.parent}>
                <Card>
                    <h2 className={classes.good} >보유 자산</h2>
                    <div/>
                    {/* <h3>{props.asset}</h3> */}
                    <div className={classes.nice}>
                        <h3>{props.asset}</h3>
                    </div>


                </Card>
                <Card>
                    <h2 className={classes.good} >보유 REC</h2>
                    <div/>
                    {/* <h3>{props.rec}</h3> */}
                    <h3>{props.rec}</h3>
                </Card>
                <Card>
                    <h2 className={classes.good} >최근 거래한 자산 양</h2>
                    <div/>
                    {/* <h3>{props.rKRW}</h3> */}
                    <h3>{props.rec}</h3>
                </Card>
                <Card>
                    <h2 className={classes.good} >최근 거래한 REC 양</h2>
                    <div/>
                    {/* <h3>{props.rREC}</h3> */}
                    <h3>{props.rec}</h3>
                </Card>
            </div>
        </React.Fragment>
      );
    }

export default InnerPage;