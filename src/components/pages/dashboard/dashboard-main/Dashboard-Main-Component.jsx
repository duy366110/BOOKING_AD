import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLoaderData } from "react-router-dom";
import useHttp from "../../../../hook/use-http";
import { updateElementToTalBooking, updateCurrentPageBooking } from "../../../../store/store-pagination";
import DashboardResumeComponent from "../utils/Dashboard-Resume-Component/Dashboard-Resume-Component";
import CommonTableComponent from "../../../common/Common-Table-Component/Common-Table-Component";
import CommonPaginationComponent from "../../../common/Common-Pagination-Component/Common-Pagination-Component";
import classes from "./Dashboard-Main-Component.module.css";

const HeadTable = ['STT', 'User', 'Hotel', 'Room', 'Date', 'Price', 'Payment method', 'Status'];

const DashboardMainComponent = (props) => {
    const loader = useLoaderData();
    const dispatch = useDispatch();
    const pagination = useSelector(state => state.pagination);


    const [reload, setReload] = useState(false);
    const [bookings, setBookings] = useState([]);
    const { httpMethod } = useHttp();

    // PHƯƠNG THỨC LOAD BOOKING
    const loadBookingHandler = async() => {
        httpMethod({
            url: `http://localhost:5000/api/admin/booking/${pagination.booking.elementOfPage}/${(pagination.booking.elementOfPage * pagination.booking.currentPage)}`,
            method: 'GET',
            author: '',
            payload: null,
            customForm: false
        }, (infor) => {
            let { status, message, bookings } = infor;
            setBookings(bookings);
        })
    }

    // PHƯƠNG THỨC LOAD VÀ CẬP NHẬT KHI PHÂN TRANG VÀ LẦN ĐẦU LOADER
    useEffect(() => {
        let { status, messahe, amount} = loader;
        dispatch(updateElementToTalBooking({amount}));
        loadBookingHandler();

    }, [reload, pagination.booking.currentPage])

    // SET SỰ KIỆN RENDER INFOR KHI LICK VÀO THANH PAGINATION
    const paginationHandler = (event) => {
        let { pagi } = event.target.closest("#btn-pagi").dataset;
        dispatch(updateCurrentPageBooking({page: pagi}));
    }

    return (
        <div className="dashboard-container">
            <div className={classes['dashboard-main-component']}>
                <DashboardResumeComponent />

                {bookings.length > 0 && (
                    <CommonTableComponent head={HeadTable} list={bookings} type="booking"/>
                )}

                {bookings.length == 0 && (<h2 className="blank">Not found Bookings</h2>)}

                <CommonPaginationComponent
                    click={paginationHandler}
                    items={ Array.from({length: pagination.booking.elemtItemsPagination}, (elm, index) => index)} />
            </div>
        </div>
    )
}

export default DashboardMainComponent;

// GỬI REQUEST LẤY DANH SÁCH GIAO DỊCH BÔKING HIỆN CÓ TRONG DB
export const loader = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = await fetch("http://localhost:5000/api/admin/booking/amount", {
                method: 'GET',
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": ""
                }
            })

            if(!res.ok) {
                let infor = await res.json();
                throw Error(infor.message);
            }

            resolve(await res.json());

        } catch (error) {
            reject({status: false, error});
        }
    })
}