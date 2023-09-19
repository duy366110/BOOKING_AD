import React, { useState, useEffect } from 'react';
import { useNavigate, useLoaderData } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import configEnv from "../../../../configs/config.env";
import useHttp from "../../../../hook/use-http";
import { updateElementToTalHotel, updateCurrentPageHotel } from "../../../../store/store-pagination";
import CommonButtonComponent from '../../../common/Common-Button-Component/Common-Button-Component';
import CommonTableComponent from '../../../common/Common-Table-Component/Common-Table-Component';
import CommonPaginationComponent from '../../../common/Common-Pagination-Component/Common-Pagination-Component';
import classes from "./Dashboard-Hotels-Component.module.css";

const HeadTable = ['STT', 'Name', 'Image', 'City', 'Type', 'rooms', 'Action'];

const DashboardHotelsComponent = (props) => {
    const navigate = useNavigate();
    const loader = useLoaderData();
    const dispatch = useDispatch();
    const pagination = useSelector(state => state.pagination);

    const { httpMethod } = useHttp();

    const [hotels, setHotels] = useState([]);
    const [reload, setReload] = useState(false);

    // PHƯƠNG THỨC LOAD CATEGORY
    const loadHotelHandler = async() => {
        httpMethod({
            url: `${configEnv.URL}/api/admin/hotel/${pagination.hotel.elementOfPage}/${(pagination.hotel.elementOfPage * pagination.hotel.currentPage)}`,
            method: 'GET',
            author: '',
            payload: null,
            customForm: false
        }, (infor) => {
            let { status, message, hotels } = infor;
            setHotels(hotels);
        })
    }

    // PHƯƠNG THỨC THỰC HIỆN GỌI LẦN ĐẦU KÍCH HOẠT LẤY THÔNG TIN
    useEffect(() => {
        let { status, message, amount} = loader;
        if(status) {
            dispatch(updateElementToTalHotel({amount}));
            loadHotelHandler();
        }

    }, [reload])

    // REDIRECT ĐẾN TRANG THÊM MỚI HOTEL
    const navigateAddHotel = (event) => {
        navigate("/new-hotel");
    }

    // REDIẺCT ĐẾN TRANG CẬP NHẬT
    const editHotelsHandler = (event) => {
        let { id } = event.target.dataset;
        navigate(`/edit-hotel/${id}`);
    }

    // PHƯƠNG THỨC THỰC HIỆN XOÁ HOTEL
    const deleteHotelsHandler = async (event) => {
        let { id } = event.target.dataset;

        if(id && window.confirm("Are you sure delete hotel")) {;
            httpMethod({
                url: `${configEnv.URL}/api/admin/hotel`,
                method: 'DELETE',
                author: '',
                payload: JSON.stringify({hotel: id}),
                customForm: false
            }, (infor) => {
                let { status, message } = infor;

                console.log(status);
                if(status) {
                    setReload(!reload);
                }
            })
        }
    }

    // SET SỰ KIỆN RENDER INFOR KHI LICK VÀO THANH PAGINATION
    const paginationHandler = (event) => {
        let { pagi } = event.target.closest("#btn-pagi").dataset;
        dispatch(updateCurrentPageHotel({page: pagi}));
    }

    return (
        <div className="dashboard-container">
            <div className={classes['dashboard-hotel-component']}>
                <div className='dashboard-header'>
                    <h2 className='header__title'>Lastest transactions</h2>
                    <CommonButtonComponent click={navigateAddHotel} kind="outline-success" title="New hotel"  type="button"/>
                </div>

                {hotels.length > 0 && (
                    <CommonTableComponent edit={editHotelsHandler} delete={deleteHotelsHandler} head={HeadTable} list={hotels} type="hotel"/>
                )}

                {hotels.length == 0 && (<h2 className="blank">Not found hotels</h2>)}

                <CommonPaginationComponent
                    click={paginationHandler}
                    items={ Array.from({length: pagination.hotel.elemtItemsPagination}, (elm, index) => index)} />
            </div>
        </div>
    )
}

export default DashboardHotelsComponent;

// THỰC HIỆN LẤY DANH SÁCH HOTEL
export const loader = () => {
    return new Promise(async (resolve, reject) => {
        try {

            let res = await fetch(`${configEnv.URL}/api/admin/hotel/amount`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": ''
                }
            })

            if(!res.ok) {
                let infor = await res.json();
                throw Error(infor.message);
            }

            resolve(await res.json());

        } catch (error) {
            reject(error);
        }
    })
}