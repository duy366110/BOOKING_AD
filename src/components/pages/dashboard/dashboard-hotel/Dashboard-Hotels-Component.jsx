import React, { useState, useEffect } from 'react';
import { useNavigate, useLoaderData } from "react-router-dom";
import useHttp from "../../../../hook/use-http";
import CommonButtonComponent from '../../../common/Common-Button-Component/Common-Button-Component';
import CommonTableComponent from '../../../common/Common-Table-Component/Common-Table-Component';
import classes from "./Dashboard-Hotels-Component.module.css";

const HeadTable = ['STT', 'Name', 'City', 'Type', 'Price', 'rooms', 'Action'];

const DashboardHotelsComponent = (props) => {
    const navigate = useNavigate();
    const loader = useLoaderData();

    const { httpMethod } = useHttp();

    const [hotels, setHotels] = useState([]);
    const [reload, setReload] = useState(false);

    // PHƯƠNG THỨC LẤY THÔNG TIN HOTEL
    const getHotels = async () => {
        try {
            let { status, message, hotels } = loader;
            setHotels(hotels);

        } catch (error) {
            throw error;

        }
    }

    // PHƯƠNG THỨC THỰC HIỆN GỌI LẦN ĐẦU KÍCH HOẠT LẤY THÔNG TIN
    useEffect(() => {
        getHotels();
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
                url: `http://localhost:5000/api/admin/hotel`,
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
            </div>
        </div>
    )
}

export default DashboardHotelsComponent;

// THỰC HIỆN LẤY DANH SÁCH HOTEL
export const loader = () => {
    return new Promise(async (resolve, reject) => {
        try {

            let res = await fetch("http://localhost:5000/api/admin/hotel", {
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