import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, useLoaderData } from 'react-router-dom';
import useValidation from '../../../../../hook/use-validation';
import useHttp from '../../../../../hook/use-http';
import CommonButtonComponent from '../../../../common/Common-Button-Component/Common-Button-Component';
import CommonInputComponent from '../../../../common/Common-Input-Component/Common-Input-Component';
import CommonSelectComponent from '../../../../common/Common-Select-Component/Common-Select-Component';
import CommonCatalogyImageComponent from '../../../../common/Common-Catalogy-Image-Component/Common-Catalogy-Image-Component';
import classes from "./Dashboard-Edit-Hotel-Component.module.css";

const FEATURES = [
    {_id: 'Yes', name: 'Yes'},
    {_id: 'No', name: 'No'},
]

const DashboardEditHotelComponent = (props) => {
    const params = useParams();
    const loader = useLoaderData();
    const navigate = useNavigate();

    const nameRef = useRef();
    const locationRef = useRef();
    const typeRef = useRef();
    const addressRef = useRef();
    const distanceRef = useRef();
    const descRef = useRef();
    const priceRef = useRef();
    const photosRef = useRef();
    const featureRef = useRef();

    const [hotel, setHotel] = useState(null);
    const [locations, setLocations] = useState([]);
    const [categories, setCategories] = useState([]);

    const { httpMethod } = useHttp();
    const {defaultValue: nameDefaultVal, value: nameValue, valid: nameValid, onBlur: nameBlur, onChange: nameChange } = useValidation(['require']);
    const {defaultValue: locationDefaultVal, value: locationValue, valid: locationValid, onBlur: locationBlur, onChange: locationChange} = useValidation(['require']);
    const { defaultValue: typeDefaultVal, value: typeValue, valid: typeValid, onBlur: typeBlur, onChange: typeChange } = useValidation(['require']);
    const { defaultValue: addressDefaultVal, value: addressValue, valid: addressValid, onBlur: addressBlur, onChange: addressChange } = useValidation(['require']);
    const { defaultValue: distanceDefaultVal, value: distanceValue, valid: distanceValid, onBlur: distanceBlur, onChange: distanceChange } = useValidation([]);
    const { defaultValue: descDefaultVal, value: descValue, valid: descValid, onBlur: descBlur, onChange: descChange } = useValidation([]);
    const { defaultValue: priceDefaultVal, value: priceValue, valid: priceValid, onBlur: priceBlur, onChange: priceChange } = useValidation(['require']);
    const { value: photosValue, valid: photosValid, onBlur: photosBlur, onChange: photosChange } = useValidation([]);
    const { defaultValue: featureDefaultVal, value: featureValue, valid: featureValid, onBlur: featureBlur, onChange: featureChange } = useValidation([]);

    // PHƯƠNG THỨC THỰC HIỆN LOADATA
    const loadInfor = () => {
        let { status, hotel, locations, categories, rooms} = loader;

        if(status) {
            setHotel(hotel);
            setLocations(locations);
            setCategories(categories);

            nameDefaultVal(hotel.name);
            locationDefaultVal(hotel.city);
            typeDefaultVal(hotel.type);
            addressDefaultVal(hotel.address);
            distanceDefaultVal(hotel.distance);
            descDefaultVal(hotel.desc);
            priceDefaultVal(hotel.price.$numberDecimal);
            featureDefaultVal(hotel.featured? "Yes": 'No');
        }
    }

    // LOAD THÔNG TIN HOTEL TRƯỚC KHI CẬP NHẬT
    useEffect(() => {
        loadInfor();

    }, [])

    // PHƯƠNG THỨC THỰC HIỆN CẬP NHẬT THÔNG TIN HOTEL
    const modifiHotelHandler = async (event) => {
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

        let priceInput = priceRef.current.input.current;
        priceInput.focus();
        priceInput.blur();

        let featureSelect = featureRef.current.select.current;
        let photosInput = photosRef.current.input.current;


        if((nameValid.status && typeValid.status) && (locationValid.status && addressValid.status) && priceValid.status) {

            let hotelForm = new FormData();
            hotelForm.append("hotel", params.hotelId);
            hotelForm.append('name', nameValue);
            hotelForm.append('location', locationValue);
            hotelForm.append('type', typeValue);
            hotelForm.append('address', addressValue);
            hotelForm.append('distance', distanceValue);
            hotelForm.append('desc', descValue);
            hotelForm.append('price', priceValue);
            hotelForm.append('feature', featureValue? featureValue === 'Yes'? true : false : false);

            if(photosInput.files.length) {
                for(let file of photosInput.files) {
                    hotelForm.append('photos', file);
                }
            }

            httpMethod({
                url: 'http://localhost:5000/api/admin/hotel',
                method: 'PATCH',
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
                <form onSubmit={modifiHotelHandler}>
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
                                valueDefaultOption={'Choose type...'}
                                blur={typeBlur} change={typeChange}
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
                                ref={distanceRef}
                                blur={distanceBlur} change={distanceChange}
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
                                ref={priceRef} type="number"
                                blur={priceBlur} change={priceChange}
                                label="Price *" value={priceValue} valid={priceValid} />
                        </div>

                        <div className="col-6">
                            <CommonSelectComponent
                                ref={featureRef}
                                label="Feature" options={FEATURES}
                                valueDefaultOption={'Choose feature...'}
                                blur={featureBlur} change={featureChange}
                                value={featureValue} valid={featureValid} />
                        </div>

                        <div className="col-6">
                            <CommonInputComponent
                                ref={photosRef} type="file"
                                blur={photosBlur} change={photosChange}
                                label="Images" valid={photosValid} />

                            {hotel && hotel?.images.length > 0 && (
                                <CommonCatalogyImageComponent images={hotel?.images} endpoint="hotel" id={hotel._id} />
                            )}
                        </div>

                        <div className="col-12 mt-5">
                            <CommonButtonComponent kind="contained" title="Edit hotel"  type="submit"/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default DashboardEditHotelComponent;

// LOADER LOCATION
const loadLocation = async() => {
    return new Promise( async(resolve, reject) => {
        try {
            let res = await fetch("http://localhost:5000/api/admin/location", {
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
            let res = await fetch("http://localhost:5000/api/admin/category", {
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
const loadRoom = async() => {
    return new Promise( async(resolve, reject) => {
        try {
            let res = await fetch("http://localhost:5000/api/admin/room", {
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

// LOADER HOTEL
const loadHotel = async(hotelId) => {
    return new Promise( async(resolve, reject) => {
        try {
            let res = await fetch(`http://localhost:5000/api/admin/hotel/${hotelId}`, {
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
export const loader = (request, params) => {
    return new Promise( async (resolve, reject) => {
        try {
            let { hotelId } = params;
            let data = await Promise.all([loadHotel(hotelId), loadLocation(), loadCategory(), loadRoom()]);
            let [{hotel}, {locations}, {categories}, {rooms}] = data;
            resolve({status: true, hotel, locations, categories, rooms});

        } catch (error) {
            reject(error);
        }
    })
}