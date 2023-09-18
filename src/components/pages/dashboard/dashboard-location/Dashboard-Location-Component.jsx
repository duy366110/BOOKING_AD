import React, { useState, useEffect } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import configEnv from "../../../../configs/config.env";
import { updateElementToTalLocation, updateCurrentPageLocation } from "../../../../store/store-pagination";
import useHttp from "../../../../hook/use-http";
import CommonButtonComponent from "../../../common/Common-Button-Component/Common-Button-Component";
import CommonTableComponent from "../../../common/Common-Table-Component/Common-Table-Component";
import CommonPaginationComponent from "../../../common/Common-Pagination-Component/Common-Pagination-Component";
import classes from "./Dashboard-Location-Component.module.css";

const HeadTable = ['STT', 'Name', 'Hotels', 'Action'];

const DashboardLocationComponent = (props) => {
    const navigate = useNavigate();
    const loader = useLoaderData();
    const dispatch = useDispatch();
    const pagination = useSelector(state => state.pagination);

    const [reload, setReload] = useState(false);
    const [locations, setLocations] = useState([]);
    const { httpMethod } = useHttp();


    // PHƯƠNG THỨC LOAD LOCATION
    const loadLocationHandler = async() => {
        httpMethod({
            url: `${configEnv.URL}/api/admin/location/${pagination.location.elementOfPage}/${(pagination.location.elementOfPage * pagination.location.currentPage)}`,
            method: 'GET',
            author: '',
            payload: null,
            customForm: false
        }, (infor) => {
            let { status, message, locations } = infor;
            setLocations(locations);
        })
    }

    // PHƯƠNG THỨC LOAD VÀ CẬP NHẬT KHI PHÂN TRANG VÀ LẦN ĐẦU LOADER
    useEffect(() => {
        let { status, messahe, amount} = loader;
        dispatch(updateElementToTalLocation({amount}));
        loadLocationHandler();

    }, [reload, pagination.location.currentPage])

    // REDIRECT ĐẾN TRANG THÊM MỚI LOCATION
    const navigateNewLocationHandler = (event) => {
        navigate("/new-location");
    }

    // REDIRECT ĐẾN TRANG CHỈNH SỬA LOCATION
    const editLocationHandler = (event) => {
        let { id } = event.target.dataset;
        navigate(`/edit-location/${id}`);
    }

    // PHƯƠNG THỨC XOÁ LOCATION
    const deleteLocationHandler = (event) => {
        let { id } = event.target.dataset;

        if(id && window.confirm("Are you sure delete location")) {;
            httpMethod({
                url: `${configEnv.URL}/api/admin/location`,
                method: 'DELETE',
                author: '',
                payload: JSON.stringify({location: id}),
                customForm: false
            }, (infor) => {
                let { status, message } = infor;

                if(status) {
                    setReload(!reload);
                }
            })
        }
    }

    // SET SỰ KIỆN RENDER INFOR KHI LICK VÀO THANH PAGINATION
    const paginationHandler = (event) => {
        let { pagi } = event.target.closest("#btn-pagi").dataset;
        dispatch(updateCurrentPageLocation({page: pagi}));
    }

    return (
        <div className="dashboard-container">
            <div className={classes['dashboard-roles-component']}>
                <div className='dashboard-header'>
                    <h2 className='header__title'>Users information</h2>
                    <CommonButtonComponent click={navigateNewLocationHandler} kind="outline-success" title="New location"  type="button"/>
                </div>

                {locations.length > 0 && (
                    <CommonTableComponent edit={editLocationHandler} delete={deleteLocationHandler} head={HeadTable} list={locations} type="location"/>
                )}

                {locations.length == 0 && (<h2 className="blank">Not found hotels</h2>)}

                <CommonPaginationComponent
                    click={paginationHandler}
                    items={ Array.from({length: pagination.location.elemtItemsPagination}, (elm, index) => index)} />
            </div>
        </div>
    )
}

export default DashboardLocationComponent;

export const loader = (request, params) => {
    return new Promise( async(resolve, reject) => {
        try {

            // GỬI REQUEST LẤY SỐ LƯỢNG LOCATION HIỆN CÓ TRONG DB
            let res = await fetch(`${configEnv.URL}/api/admin/location/amount`, {
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
            reject(error.message);
        }
    })
}