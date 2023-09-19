import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import configEnv from "../../../../../configs/config.env";
import useValidation from "../../../../../hook/use-validation";
import useHttp from "../../../../../hook/use-http";
import CommonButtonComponent from "../../../../common/Common-Button-Component/Common-Button-Component";
import CommonInputComponent from "../../../../common/Common-Input-Component/Common-Input-Component";
import CommonSelectComponent from "../../../../common/Common-Select-Component/Common-Select-Component";
import classes from "./Dashboard-Add-Hotel-Component.module.css";

const FEATURES = [
    {_id: 'Yes', name: 'Yes'},
    {_id: 'No', name: 'No'},
]

const DashboardAddHotelComponent = (props) => {
    const navigate = useNavigate();
    const loader = useLoaderData();

    const nameRef = useRef();
    const locationRef = useRef();
    const typeRef = useRef();
    const addressRef = useRef();
    const distanceRef = useRef();
    const descRef = useRef();
    const photosRef = useRef();
    const featureRef = useRef();

    const [locations, setLocations] = useState([]);
    const [categories, setCategories] = useState([]);

    const { httpMethod } = useHttp();
    const {value: nameValue, valid: nameValid, onBlur: nameBlur, onChange: nameChange} = useValidation(['require']);
    const {value: locationValue, valid: locationValid, onBlur: locationBlur, onChange: locationChange} = useValidation(['require']);
    const {value: typeValue, valid: typeValid, onBlur: typeBlur, onChange: typeChange} = useValidation(['require']);
    const {value: addressValue, valid: addressValid, onBlur: addressBlur, onChange: addressChange} = useValidation(['require']);
    const {value: distanceValue, valid: distanceValid, onBlur: distanceBlur, onChange: distanceChange} = useValidation([]);
    const {value: descValue, valid: descValid, onBlur: descBlur, onChange: descChange} = useValidation([]);
    const {value: photosValue, valid: photosValid, onBlur: photosBlur, onChange: photosChange} = useValidation([]);
    const {value: featureValue, valid: featureValid, onBlur: featureBlur, onChange: featureChange} = useValidation([]);

    // SETUP THÔNG TIN PHỤ CẦN THIẾT CHO VIỆC TẠO MỚI HOTEL
    const setUpInformation = () => {
        let { status, locations, categories, error } = loader;

        if(status) {
            setLocations(locations);
            setCategories(categories);
        }
    }

    // PHƯƠNG THỨC LOAD THÔNG TIN BAN ĐẦU CHO TRANG
    useEffect(() => {
        setUpInformation();
    }, [])

    // PHƯƠNG THỨC TẠO MỚI HOTEL
    const createHotelHandler = async (event) => {
        event.preventDefault();

        let nameInput = nameRef.current.input.current;
        nameInput.focus();
        nameInput.blur();

        let locationSelect = locationRef.current.select.current;
        locationSelect.focus();
        locationSelect.blur();

        let typeSelect = typeRef.current.select.current;
        typeSelect.focus();
        typeSelect.blur();

        let addressInput = addressRef.current.input.current;
        addressInput.focus();
        addressInput.blur();

        let distanceInput = distanceRef.current.input.current;
        distanceInput.focus();
        distanceInput.blur();

        let descInput = descRef.current.input.current;
        descInput.focus();
        descInput.blur();

        let photosInput = photosRef.current.input.current;

        // KIỂM TRA VALIDATION TRƯỚC KHI SUBMIT TẠO MỚI
        if((nameValid.status && typeValid.status) && (locationValid.status && addressValid.status)) {

            // TẠO FORM DATA
            let hotelForm = new FormData();
            hotelForm.append('name', nameValue);
            hotelForm.append('location', locationValue);
            hotelForm.append('type', typeValue);
            hotelForm.append('address', addressValue);
            hotelForm.append('distance', distanceValue);
            hotelForm.append('desc', descValue);
            hotelForm.append('feature', featureValue? featureValue === 'Yes'? true : false : false);

            if(photosInput.files.length) {
                for(let file of photosInput.files) {
                    hotelForm.append('photos', file);
                }
            }

            httpMethod({
                url: `${configEnv.URL}/api/admin/hotel`,
                method: 'POST',
                author: '',
                payload: hotelForm,
                customForm: true
            },
                (infor) => {
                let { status, message } = infor;

                if(status) {
                    navigate("/hotels");
                }
            })
        }
    }

    return (
        <div className="dashboard-container">
            <div className={classes['dashboard-hotel-add-component']}>
                <form onSubmit={createHotelHandler}>
                    <div className="row">
                        <div className="col-6">
                            <CommonInputComponent
                                ref={nameRef}
                                blur={nameBlur} change={nameChange}
                                label="Name *" value={nameValue} valid={nameValid} />
                        </div>

                        <div className="col-6">
                            <CommonSelectComponent
                                label="City *" options={locations} ref={locationRef}
                                blur={locationBlur} change={locationChange}
                                valueDefaultOption={'Choose location...'}
                                value={locationValue} valid={locationValid} />
                        </div>

                        <div className="col-6">
                            <CommonSelectComponent
                                label="Type *" options={categories} ref={typeRef}
                                blur={typeBlur} change={typeChange}
                                valueDefaultOption={'Choose category...'}
                                value={typeValue} valid={typeValid} />
                        </div>

                        <div className="col-6">
                            <CommonInputComponent
                                ref={addressRef}
                                blur={addressBlur} change={addressChange}
                                label="Address *" value={addressValue} valid={addressValid} />
                        </div>

                        <div className="col-6">
                            <CommonInputComponent
                                ref={distanceRef} blur={distanceBlur} change={distanceChange}
                                label="Distance from city center" value={distanceValue} valid={distanceValid} />
                        </div>

                        <div className="col-6">
                            <CommonInputComponent
                                ref={descRef}
                                blur={descBlur} change={descChange}
                                label="Description" value={descValue} valid={descValid} />
                        </div>


                        <div className="col-6">
                            <CommonInputComponent
                                ref={photosRef} type="file"
                                blur={photosBlur} change={photosChange}
                                label="Images" valid={photosValid} />
                        </div>

                        <div className="col-6">
                            <CommonSelectComponent
                                ref={featureRef}
                                label="Feature" options={FEATURES}
                                valueDefaultOption={'Choose feature...'}
                                blur={featureBlur} change={featureChange}
                                value={featureValue} valid={featureValid} />
                        </div>

                        <div className="col-12">
                            <CommonButtonComponent kind="contained" title="New hotel"  type="submit"/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default DashboardAddHotelComponent;

// LOADER LOCATION
const loadLocation = async() => {
    return new Promise( async(resolve, reject) => {
        try {
            let res = await fetch(`${configEnv.URL}/api/admin/location`, {
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


// LOADER CATEGORY
const loadCategory = async() => {
    return new Promise( async(resolve, reject) => {
        try {
            let res = await fetch(`${configEnv.URL}/api/admin/category`, {
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


// LOADER THÔNG TIN CẦN THIẾT TRƯỚC KHI THÊM MỚI HOTEL
export const loader = () => {
    return new Promise( async (resolve, reject) => {
        try {
            let data = await Promise.all([loadLocation(), loadCategory()]);
            let [{locations}, {categories}] = data;
            resolve({status: true, locations, categories });

        } catch (error) {
            reject(error);
        }
    })
}