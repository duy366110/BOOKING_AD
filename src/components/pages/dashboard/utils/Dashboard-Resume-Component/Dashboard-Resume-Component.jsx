import React from "react";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import CommonCardResumeComponent from "../../../../common/Common-Card-Resume-Component/Common-Card-Resume-Component";
import classes from "./Dashboard-Resume-Component.module.css";

const DashboardResumeComponent = (props) => {

    return (
        <div className={classes['dashboard-resume-component']}>
            <div className="row">
                <div className="col-3">
                    <CommonCardResumeComponent title='Users' value="100">
                        <span className={`${classes['icons']} ${classes['icon-users']}`}>
                            <PersonOutlineIcon />
                        </span>
                    </CommonCardResumeComponent>
                </div>
                <div className="col-3">
                    <CommonCardResumeComponent title='Orders' value="100">
                        <span className={`${classes['icons']} ${classes['icon-orders']}`}>
                            <ShoppingCartOutlinedIcon />
                        </span>
                    </CommonCardResumeComponent>
                </div>
                <div className="col-3">
                    <CommonCardResumeComponent title='Earnings' value="$100">
                        <span className={`${classes['icons']} ${classes['icon-earnings']}`}>
                            <MonetizationOnOutlinedIcon />
                        </span>
                    </CommonCardResumeComponent>
                </div>
                <div className="col-3">
                    <CommonCardResumeComponent title='Blance' value="$100">
                        <span className={`${classes['icons']} ${classes['icon-blance']}`}>
                            <AccountBalanceWalletOutlinedIcon />
                        </span>
                    </CommonCardResumeComponent>
                </div>
            </div>
        </div>
    )
}

export default DashboardResumeComponent;