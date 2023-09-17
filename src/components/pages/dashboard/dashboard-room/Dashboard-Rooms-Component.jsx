import React, { useEffect, useState } from 'react';
import { useNavigate, useLoaderData } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import configEnv from "../../../../configs/config.env";
import { updateElementToTalRoom, updateCurrentPageRoom } from "../../../../store/store-pagination";
import useHttp from '../../../../hook/use-http';
import CommonButtonComponent from '../../../common/Common-Button-Component/Common-Button-Component';
import CommonTableComponent from '../../../common/Common-Table-Component/Common-Table-Component';
import CommonPaginationComponent from '../../../common/Common-Pagination-Component/Common-Pagination-Component';
import classes from "./Dashboard-Rooms-Component.module.css";

const HeadTable = ['STT', 'Title', 'Price', 'Max people', 'Hotel', 'Action'];

const DashboardRoomsComponent = (props) => {
    const navigate = useNavigate();
    const loader = useLoaderData();
    const dispatch = useDispatch();
    const pagination = useSelector(state => state.pagination);

    const { httpMethod } = useHttp();
    const [rooms, setRooms] = useState([]);
    const [reload, setReload] = useState(false);

    // LẤY THÔNG TIN VÀ CẬP NHẬT ROOM
    const getRoom = async () => {
        let { status, message, amount } = loader;

        if(status) {
            dispatch(updateElementToTalRoom({amount}));

            httpMethod({
                url: `${configEnv.URL}/api/admin/room/${pagination.room.elementOfPage}/${(pagination.room.elementOfPage * pagination.room.currentPage)}`,
                method: 'GET',
                author: '',
                payload: null
            }, (infor) => {
                let { status, message, rooms } = infor;
                setRooms(rooms);
            })
        }
    }

    // LOAD THÔNG TIN ROOM
    useEffect(() => {
        getRoom();
    }, [reload, pagination.room.currentPage])

    // CHUYỂN HƯỚNG ĐẾN TRANG THÊM MỚI ROOM
    const navigateNewRoom = (event) => {
        navigate("/new-room");
    }

    // CHUYỂN HƯỚNG ĐẾN TRANG CẬP NHẬT ROOM
    const editRoomHandler = (event) => {
        let { id } = event.target.dataset;
        navigate(`/edit-room/${id}`);
    }

    // SET SỰ KIỆN RENDER INFOR KHI LICK VÀO THANH PAGINATION
    const paginationHandler = (event) => {
        let { pagi } = event.target.closest("#btn-pagi").dataset;
        dispatch(updateCurrentPageRoom({page: pagi}));
    }

    // PHƯƠNG THỨC XOÁ ROOM
    const deleteRoomHandler = async (event) => {
        let { id } = event.target.dataset;

        if(window.confirm('Are you sure delete room!')) {
            httpMethod({
                url: `${configEnv.URL}/api/admin/room`,
                method: 'DELETE',
                author: '',
                payload: JSON.stringify({room: id})
            }, (infor) => {
                let { status, message } = infor;

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
                    <h2 className='header__title'>Rooms list</h2>
                    <CommonButtonComponent click={navigateNewRoom} kind="outline-success" title="New room"  type="button"/>
                </div>

                {rooms.length > 0 && (
                    <CommonTableComponent edit={editRoomHandler} delete={deleteRoomHandler} head={HeadTable} list={rooms} type="room"/>
                )}

                {rooms.length == 0 && (<h2 className="blank">Not found rooms</h2>)}

                <CommonPaginationComponent click={paginationHandler} items={ Array.from({length: pagination.room.elemtItemsPagination}, (elm, index) => index)} />
            </div>
        </div>
    )
}

export default DashboardRoomsComponent;


// PHƯƠNG THỨC LẤY SỐ LƯỢNG ROOM HIỆN CÓ
export const loader = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = await fetch(`${configEnv.URL}/api/admin/room/amount`, {
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