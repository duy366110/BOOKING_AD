import React, { useEffect , useState, useRef } from 'react';
import { useParams, useNavigate, useLoaderData } from "react-router-dom";
import configEnv from "../../../../../configs/config.env";
import useValidation from '../../../../../hook/use-validation';
import useHttp from '../../../../../hook/use-http';
import CommonButtonComponent from '../../../../common/Common-Button-Component/Common-Button-Component';
import CommonInputComponent from '../../../../common/Common-Input-Component/Common-Input-Component';
import CommonTextareaComponent from "../../../../common/Common-Textarea-Component/Common-Textarea-Component";
import CommonCatalogyImageComponent from "../../../../common/Common-Catalogy-Image-Component/Common-Catalogy-Image-Component";
import CommonSelectComponent from '../../../../common/Common-Select-Component/Common-Select-Component';
import CommonTableComponent from '../../../../common/Common-Table-Component/Common-Table-Component';
import classes from "./Dashboard-Edit-Room-Component.module.css";

const HeadTable = ['STT', 'Title', 'Action'];

const DashboardEditRoomComponent = (props) => {
    const navigate = useNavigate();
    const loader = useLoaderData();
    const params = useParams();

    const titleRef = useRef();
    const priceRef = useRef();
    const peopleRef = useRef();
    const roomNumberRef = useRef();
    const descRef = useRef();
    const photosRef = useRef();

    const hotelRef = useRef();

    const { httpMethod } = useHttp();
    const {defaultValue: titleDefaultVal, value: titleValue, valid: titleValid, onBlur: titleBlur, onChange: titleChange} = useValidation(['require']);
    const {defaultValue: priceDefaultVal, value: priceValue, valid: priceValid, onBlur: priceBlur, onChange: priceChange} = useValidation(['require']);
    const {defaultValue: peopleDefaultVal, value: peopleValue, valid: peopleValid, onBlur: peopleBlur, onChange: peopleChange} = useValidation(['require']);
    const {value: photosValue, valid: photosValid, onBlur: photosBlur, onChange: photosChange} = useValidation([]);
    const {defaultValue: roomNumberDefaultVal, value: roomNumberValue, valid: roomNumberValid, onBlur: roomNumberBlur, onChange: roomNumberChange} = useValidation(['require']);
    const {defaultValue: descDefaultVal, value: descValue, valid: descValid, onBlur: descBlur, onChange: descChange} = useValidation([]);

    const {defaultValue: hotelDefaultVal, value: hotelValue, valid: hotelValid, onBlur: hotelBlur, onChange: hotelChange} = useValidation(['require']);

    const [room, setRoom] = useState(null);
    const [hotels, setHotels] = useState([]);

    // THỰC HIỆN LOAD THÔNG TIN RÔM
    useEffect(() => {
        let { status, room, hotels } = loader;
        console.log(room);
        console.log(hotels);

        if(status) {
            setHotels(hotels);
            setRoom(room);
            titleDefaultVal(room.title);
            priceDefaultVal(room.price.$numberDecimal);
            peopleDefaultVal(room.maxPeople);
            roomNumberDefaultVal(room.roomNumbers.join(","));
            descDefaultVal(room.desc);
        }

    }, [])

    // CHUYỂN ĐẾN TRANG LIÊN KẾT ROOM VỚI HOTEL
    const navigateLinkRoomHotelHandler = (event) => {
        navigate(`/link-room-hotel/${params.room}`);
    }

    // PHƯƠNG THỨC THỰC HIỆN CẬP NHẬT
    const modifiRoomHandler = async (event) => {
        event.preventDefault();

        if(window.confirm("Are you sure modifi room!")) {
            let titleInput = titleRef.current.input.current;
            titleInput.focus();
            titleInput.blur();

            let priceInput = priceRef.current.input.current;
            priceInput.focus();
            priceInput.blur();

            let peopleInput = peopleRef.current.input.current;
            peopleInput.focus();
            peopleInput.blur();

            let roomNumberTextarea = roomNumberRef.current.textarea.current;
            roomNumberTextarea.focus();
            roomNumberTextarea.blur();

            let photosInput = photosRef.current.input.current;

            if((titleValid.status && roomNumberValid.status ) && (priceValid.status && peopleValid.status)) {

                let roomForm = new FormData();
                roomForm.append('room', params.room);
                roomForm.append('title', titleValue);
                roomForm.append('price', priceValue);
                roomForm.append('desc', descValue);
                roomForm.append('maxPeople', peopleValue);
                roomForm.append('roomNumber', roomNumberValue);

                if(photosInput.files.length) {
                    for(let file of photosInput.files) {
                        roomForm.append('photos', file);
                    }
                }

                httpMethod({
                    url: `${configEnv.URL}/api/admin/room`,
                    method: 'PATCH',
                    author: '',
                    payload: roomForm,
                    customForm: true
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

    // TẠO LIÊN KẾT ROOM ĐẾN HOTEL
    const joinRoomToHotelHandler = (event) => {
        event.preventDefault();

        let hotelSelect = hotelRef.current.select.current;
        hotelSelect.focus();
        hotelSelect.blur();

        if(hotelValid.status && room._id) {
            httpMethod({
                url: `${configEnv.URL}/api/admin/room/join`,
                method: 'PATCH',
                author: '',
                payload: JSON.stringify({hotel: hotelValue, room: room._id}),
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

    // HUỶ LIÊN KẾT GIỮA RÔM VÀ HOTEL
    const destroyRoomToHotelHandler = (event) => {
        console.log(event.target.dataset);
        let { id: hotel } = event.target.dataset;

        if(hotel && room._id) {
            httpMethod({
                url: `${configEnv.URL}/api/admin/room/destroy`,
                method: 'PATCH',
                author: '',
                payload: JSON.stringify({hotel: hotel, room: room._id}),
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
            <div className={classes['dashboard-add-room-component']}>
                <form className={classes['form-information']} onSubmit={modifiRoomHandler}>
                    <h2 className={classes['container-title']}>Room information</h2>
                    <div className="row">
                        <div className="col-6">
                            <CommonInputComponent
                                ref={titleRef} blur={titleBlur}
                                change={titleChange} label="Title *"
                                value={titleValue} valid={titleValid}/>
                        </div>

                        <div className="col-6">
                            <CommonInputComponent
                                type="number"
                                ref={priceRef} blur={priceBlur}
                                change={priceChange} label="Price *"
                                value={priceValue} valid={priceValid}/>
                        </div>

                        <div className="col-6">
                            <CommonInputComponent
                                type="number"
                                ref={peopleRef} blur={peopleBlur}
                                change={peopleChange} label="Max people *"
                                value={peopleValue} valid={peopleValid}/>
                        </div>

                        <div className="col-6">
                            <CommonInputComponent
                                ref={photosRef} type="file"
                                blur={photosBlur} change={photosChange}
                                label="Images" valid={photosValid} />
                        </div>

                        <div className="col-6">
                            <CommonTextareaComponent
                                ref={roomNumberRef} blur={roomNumberBlur}
                                change={roomNumberChange} label="Room number *"
                                value={roomNumberValue} valid={roomNumberValid} />
                        </div>

                        <div className="col-6">
                            <CommonTextareaComponent
                                ref={descRef} blur={descBlur}
                                change={descChange} label="Description"
                                value={descValue} valid={descValid}/>
                        </div>

                        {room && room?.images.length > 0 && (
                            <div className="col-12">
                                <CommonCatalogyImageComponent images={room?.images} endpoint="room" id={room._id} />
                            </div>
                        )}
                    </div>

                    <div className="d-flex">
                        <CommonButtonComponent kind="contained" title="Edit room"  type="submit"/>
                    </div>
                </form>

                <form className={classes['form-information']} onSubmit={joinRoomToHotelHandler}>
                    <h2 className={classes['container-title']}>Room of hotel</h2>
                    <div className="row">
                        {!room?.hotel && (
                            <div className="col-6">
                                <CommonSelectComponent
                                    label="Hotels *" options={hotels} ref={hotelRef}
                                    blur={hotelBlur} change={hotelChange}
                                    valueDefaultOption={'Choose hotel link room..'}
                                    value={hotelValue} valid={hotelValid} />
                            </div>
                        )}

                        {room?.hotel && (
                            <div className="col-12">
                                <CommonTableComponent destroy={destroyRoomToHotelHandler} head={HeadTable} body={room.hotel} type="hotelLink"/>
                            </div>
                        )}
                    </div>

                    {!room?.hotel && (
                        <div className="d-flex">
                            <CommonButtonComponent kind="contained" title="Join room tohotel"  type="submit"/>
                        </div>
                    )}

                </form>
            </div>
        </div>
    )
}

export default DashboardEditRoomComponent;

// LOADER HOTEL
const loadHotel = async () => {
    return new Promise( async(resolve, reject) => {
        try {
            let res = await fetch(`${configEnv.URL}/api/admin/hotel/all`, {
                method: 'GET',
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": ''
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

// LOADER ROOM
const loadRoom = async (room) => {
    return new Promise( async(resolve, reject) => {
        try {
            let res = await fetch(`${configEnv.URL}/api/admin/room/${room}`, {
                method: 'GET',
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": ''
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

// THỰC HIỆN LOADER THÔNG TIN TRANG CHỦ
export const loader = (request, params) => {
    return new Promise( async(resolve, reject) => {
        try {
            let { room } = params;
            let data = await Promise.all([loadRoom(room), loadHotel()]);
            let [{room: roomInfor}, {hotels}] = data;
            resolve({status: true , room: roomInfor, hotels});

        } catch (error) {
            reject({status: false, error});
        }
    })
}