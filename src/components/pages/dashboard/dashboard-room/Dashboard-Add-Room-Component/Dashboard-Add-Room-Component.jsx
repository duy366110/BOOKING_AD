import React, { useRef } from 'react';
import { useNavigate } from "react-router-dom";
import configEnv from "../../../../../configs/config.env";
import useValidation from '../../../../../hook/use-validation';
import useHttp from '../../../../../hook/use-http';
import CommonButtonComponent from '../../../../common/Common-Button-Component/Common-Button-Component';
import CommonInputComponent from '../../../../common/Common-Input-Component/Common-Input-Component';
import CommonTextareaComponent from "../../../../common/Common-Textarea-Component/Common-Textarea-Component";
import classes from "./Dashboard-Add-Room-Component.module.css";

const DashboardAddRoomComponent = (props) => {
    const navigate = useNavigate();

    const titleRef = useRef();
    const descRef = useRef();
    const priceRef = useRef();
    const peopleRef = useRef();
    const roomsRef = useRef();
    const photosRef = useRef();

    const { httpMethod } = useHttp();

    const {value: titleValue, valid: titleValid, onBlur: titleBlur, onChange: titleChange} = useValidation(['require']);
    const {value: descValue, valid: descValid, onBlur: descBlur, onChange: descChange} = useValidation([]);
    const {value: priceValue, valid: priceValid, onBlur: priceBlur, onChange: priceChange} = useValidation(['require']);
    const {value: peopleValue, valid: peopleValid, onBlur: peopleBlur, onChange: peopleChange} = useValidation(['require']);
    const {value: roomsValue, valid: roomsValid, onBlur: roomsBlur, onChange: roomsChange} = useValidation(['require']);
    const {value: photosValue, valid: photosValid, onBlur: photosBlur, onChange: photosChange} = useValidation([]);

    // PHƯƠNG THỨC TẠO MỚI ROOM
    const createRoomHandler = async (event) => {
        event.preventDefault();

        let titleInput = titleRef.current.input.current;
        titleInput.focus();
        titleInput.blur();

        let descInput = descRef.current.textarea.current;
        descInput.focus();
        descInput.blur();

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
        photosInput.focus();
        photosInput.blur();

        if((titleValid.status && roomsValid.status ) && (priceValid.status && peopleValid.status)) {

            let roomForm = new FormData();
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
                url: `${configEnv.URL}/api/admin/room`,
                method: 'POST',
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

    return (
        <div className="dashboard-container">
            <div className={classes['dashboard-add-room-component']}>
                <form onSubmit={createRoomHandler}>
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

                    </div>

                    <div>
                        <CommonButtonComponent kind="contained" title="New room"  type="submit"/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default DashboardAddRoomComponent;
