import React, { useEffect, useState, useRef } from "react";
import { useLoaderData, useParams, useNavigate } from "react-router-dom";
import configEnv from "../../../../../configs/config.env";
import useValidation from "../../../../../hook/use-validation";
import useHttp from "../../../../../hook/use-http";
import CommonSelectComponent from "../../../../common/Common-Select-Component/Common-Select-Component";
import CommonButtonComponent from "../../../../common/Common-Button-Component/Common-Button-Component";
import CommonTableComponent from "../../../../common/Common-Table-Component/Common-Table-Component";
import classes from "./Dashboard-Link-Room-Hotel-Component.module.css";

const HeadTable = ['STT', 'Name', 'Action'];

const DashboardLinkRoomHotelComponent = (props) => {
    const loader = useLoaderData();
    const param = useParams();
    const navigate = useNavigate();

    const hotelRef = useRef();

    const [room, setRoom] = useState(null);
    const [hotels, setHotels] = useState([]);
    const [hotelsLink, setHotelsLink] = useState([]);

    const { httpMethod } = useHttp();
    const {value: hotelValue, valid: hotelValid, onBlur: hotelBlur, onChange: hotelChange} = useValidation(['require']);

    // PHƯƠNG THỨC LOAD THÔNG TIN TẠO LIÊN KẾT GIỮA ROOM VÀ HOTEL
    useEffect(() => {

        console.log(loader);
        let { status, message, room, hotels} = loader;

        if(status) {
            setRoom(room);
            setHotels(hotels);
            setHotelsLink(room.hotels);
        }
    }, [])


    // PHƯƠNG THỨC TAO LIÊN KẾT GIỮA ROOM VÀ HOTEL
    const createLinkRoomtoHotelHandler = (event) => {
        event.preventDefault();

        if(window.confirm("Are you sure create link room to hotel!")) {
            let hotelSelect = hotelRef.current.select.current;
            hotelSelect.focus();
            hotelSelect.blur();

            if(hotelValid.status) {
                httpMethod({
                    url: `${configEnv.URL}/api/admin/room/link`,
                    method: 'PATCH',
                    author: '',
                    payload: JSON.stringify({room: param.room, hotel: hotelValue}),
                    customForm: false
                },
                    (infor) => {
                    let { status, message } = infor;

                    if(status) {
                        navigate("/rooms");
                    }
                })
            }
        }
    }

    // PHƯƠNG THỨC THỰC HIỆN XOÁ LIÊN KẾT HOTEL VÀ ROOM
    const deleteLinkRoomtoHotelHandler = (event) => {
        let { id } = event.target.dataset;

        if(param.room && id) {
            httpMethod({
                url: `${configEnv.URL}/api/admin/hotel/hotel-link-room`,
                method: 'DELETE',
                author: '',
                payload: JSON.stringify({room: param.room, hotel: id}),
                customForm: false
            },
                (infor) => {
                let { status, message } = infor;

                if(status) {
                    navigate("/rooms");
                }
            })
        }
    }

    return (
        <div className="dashboard-container">
            <div className={classes['dashboard-link-room-hotel-component']}>
                {room && (<h2 className={classes['room-title']}>{room.title}</h2>)}

                <form onSubmit={createLinkRoomtoHotelHandler} className="mb-5">
                    <div className="row">
                        <div className="col-6">
                                <CommonSelectComponent
                                    label="Hotels *" options={hotels} ref={hotelRef}
                                    blur={hotelBlur} change={hotelChange}
                                    valueDefaultOption={'Choose hotel link room..'}
                                    value={hotelValue} valid={hotelValid} />
                        </div>
                    </div>

                    <div className="d-flex">
                        <CommonButtonComponent kind="contained" title="Link"  type="submit"/>
                    </div>
                </form>

                {/* DANH SÁCH CÁC HOTEL ĐÃ LINK VỚI ROOM */}                
                {hotelsLink.length > 0 && (
                    <CommonTableComponent delete={deleteLinkRoomtoHotelHandler} head={HeadTable} list={hotelsLink} type="hotelLink"/>
                )}

                {hotelsLink.length == 0 && (<h2 className="blank">Not found rooms</h2>)}

            </div>
        </div>
    )
}

export default DashboardLinkRoomHotelComponent;

// THỰC HIỆN LOAD THÔNG TIN TẠO LIÊN KẾT
export const loader = (request, params) => {
    return new Promise( async(resolve, reject) => {
        try {
            let { room } = params;
            let res = await fetch(`${configEnv.URL}/api/admin/room/link/${room}`, {
                method: "GET",
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": ''
                }
            });

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