import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLoaderData, useParams } from "react-router-dom";
import configEnv from "../../../../../configs/config.env";
import useValidation from "../../../../../hook/use-validation";
import useHttp from "../../../../../hook/use-http";
import CommonCatalogyImageComponent from "../../../../common/Common-Catalogy-Image-Component/Common-Catalogy-Image-Component";
import CommonInputComponent from "../../../../common/Common-Input-Component/Common-Input-Component";
import CommonButtonComponent from "../../../../common/Common-Button-Component/Common-Button-Component";
import classes from "./Dashboard-Edit-Location-Component.module.css";

const DashboardEditLocationComponent = (props) => {
    const navigate = useNavigate();
    const loader = useLoaderData();
    const params = useParams();
    const titleRef = useRef();
    const photosRef = useRef();

    const [location, setLocation] = useState(null);

    const { httpMethod } = useHttp();
    const {defaultValue: titleDefaultVal, value: titleValue, valid: titleValid, onBlur: titleBlur, onChange: titleChange} = useValidation(['require']);
    const {value: photosValue, valid: photosValid, onBlur: photosBlur, onChange: photosChange} = useValidation([]);

    // PHƯƠNG THỨC CHẠY LOADER LOCATION
    useEffect(() => {
        // THỰC HIỆN LOAD GIÁ TRỊ HIỆN CÓ CỦA ROLE
        let { status, message, location } = loader;

        if(status) {
            setLocation(location);
            titleDefaultVal(location.title);
        }
    }, [])

    // PHƯƠNG THỨC CẬP NHẬT THÔNG TIN LOCATION
    const editLocationHandler = (event) => {
        event.preventDefault();

        let titleInput = titleRef.current.input.current;
        titleInput.focus();
        titleInput.blur();

        let photosInput = photosRef.current.input.current;

        if(titleValid.status) {

            // TẠO FORM DATA
            let locationForm = new FormData();
            locationForm.append('title', titleValue);
            locationForm.append('location', params.location);

            if(photosInput.files.length) {
                for(let file of photosInput.files) {
                    locationForm.append('photos', file);
                }
            }

            httpMethod({
                url: `${configEnv.URL}/api/admin/location`,
                method: 'PATCH',
                author: '',
                payload: locationForm,
                customForm: true
            },
                (infor) => {
                let { status, message } = infor;

                if(status) {
                    navigate("/locations");
                }
            })
        }

    }

    return (
        <div className="dashboard-container">
            <div className={classes['dashboard-add-location-component']}>
                <form onSubmit={editLocationHandler}>
                    <div className="row">
                        <div className="col-6">
                            <CommonInputComponent
                                ref={titleRef} blur={titleBlur}
                                change={titleChange} label="title location"
                                value={titleValue} valid={titleValid}/>
                        </div>

                        <div className="col-6">
                            <CommonInputComponent
                                ref={photosRef} type="file"
                                blur={photosBlur} change={photosChange}
                                label="Images" valid={photosValid} />
                        </div>

                        {location?.images.length > 0 && (
                            <div className="col-12">
                                <CommonCatalogyImageComponent images={location?.images} endpoint="location" id={location._id} />
                            </div>
                        )}

                        <div className="col-12">
                            <CommonButtonComponent kind="contained" title="New location"  type="submit"/>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default DashboardEditLocationComponent;

// LOAD THÔNG LOCATION TRƯỚC KHI CẬP NHẬT
export const loader = (request, params) => {
    return new Promise(async(resolve, reject) => {
        try {
            let { location } = params;
            let res = await fetch(`${configEnv.URL}/api/admin/location/${location}`, {
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
            reject({status: false, message: error.message});
        }
    })
}