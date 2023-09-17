import React, { useEffect , useState, useRef } from 'react';
import { useParams, useNavigate, useLoaderData } from "react-router-dom";
import useValidation from '../../../../../hook/use-validation';
import useHttp from '../../../../../hook/use-http';
import CommonButtonComponent from '../../../../common/Common-Button-Component/Common-Button-Component';
import CommonInputComponent from '../../../../common/Common-Input-Component/Common-Input-Component';
import CommonTextareaComponent from "../../../../common/Common-Textarea-Component/Common-Textarea-Component";
import CommonCatalogyImageComponent from "../../../../common/Common-Catalogy-Image-Component/Common-Catalogy-Image-Component";
import classes from "./Dashboard-Edit-Room-Component.module.css";

const DashboardEditRoomComponent = (props) => {
    const navigate = useNavigate();
    const loader = useLoaderData();
    const params = useParams();

    const titleRef = useRef();
    const priceRef = useRef();
    const peopleRef = useRef();
    const roomsRef = useRef();
    const descRef = useRef();
    const photosRef = useRef();

    const { httpMethod } = useHttp();
    const {defaultValue: titleDefaultVal, value: titleValue, valid: titleValid, onBlur: titleBlur, onChange: titleChange} = useValidation(['require']);
    const {defaultValue: priceDefaultVal, value: priceValue, valid: priceValid, onBlur: priceBlur, onChange: priceChange} = useValidation(['require']);
    const {defaultValue: peopleDefaultVal, value: peopleValue, valid: peopleValid, onBlur: peopleBlur, onChange: peopleChange} = useValidation(['require']);
    const {value: photosValue, valid: photosValid, onBlur: photosBlur, onChange: photosChange} = useValidation([]);
    const {defaultValue: roomsDefaultVal, value: roomsValue, valid: roomsValid, onBlur: roomsBlur, onChange: roomsChange} = useValidation(['require']);
    const {defaultValue: descDefaultVal, value: descValue, valid: descValid, onBlur: descBlur, onChange: descChange} = useValidation([]);

    const [room, setRoom] = useState(null);

    // THỰC HIỆN LOAD THÔNG TIN RÔM
    useEffect(() => {
        let { status, room, message } = loader;

        if(status) {
            setRoom(room);
            titleDefaultVal(room.title);
            priceDefaultVal(room.price.$numberDecimal);
            peopleDefaultVal(room.maxPeople);
            roomsDefaultVal(room.roomNumbers.join(","));
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

            let roomsTextarea = roomsRef.current.textarea.current;
            roomsTextarea.focus();
            roomsTextarea.blur();

            let photosInput = photosRef.current.input.current;

            if((titleValid.status && roomsValid.status ) && (priceValid.status && peopleValid.status)) {

                let roomForm = new FormData();
                roomForm.append('room', params.room);
                roomForm.append('title', titleValue);
                roomForm.append('price', priceValue);
                roomForm.append('desc', descValue);
                roomForm.append('maxPeople', peopleValue);
                roomForm.append('roomNumber', roomsValue);

                if(photosInput.files.length) {
                    for(let file of photosInput.files) {
                        roomForm.append('photos', file);
                    }
                }

                httpMethod({
                    url: 'http://localhost:5000/api/admin/room',
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

    return (
        <div className="dashboard-container">
            <div className={classes['dashboard-add-room-component']}>
                <form onSubmit={modifiRoomHandler}>
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
                                ref={roomsRef} blur={roomsBlur}
                                change={roomsChange} label="Room number *"
                                value={roomsValue} valid={roomsValid} />
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
                        <div className="mr-3">
                            <CommonButtonComponent click={navigateLinkRoomHotelHandler} kind="contained" title="Link to hotel"  type="button"/>
                        </div>
                        <CommonButtonComponent kind="contained" title="Edit room"  type="submit"/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default DashboardEditRoomComponent;


// PHƯƠNG THỨC LOAD THÔNG TIN TRƯỚC KHI CẬP NHẬT
export const loader = (request, params) => {
    return new Promise( async (resolve, reject) => {
        try {
            let { room } = params;
            let res = await fetch(`http://localhost:5000/api/admin/room/${room}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': ''
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