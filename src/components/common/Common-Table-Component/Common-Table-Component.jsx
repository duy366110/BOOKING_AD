import React from 'react';
import { useSelector } from 'react-redux';
import CommonButtonComponent from "../Common-Button-Component/Common-Button-Component";
import classes from "./Common-Table-Component.module.css";

const CommonTableComponent = (props) => {
  const auth = useSelector((state) => state.auth);

    return (
        <div className={classes['table-component']}>
          <table className="table table-hover">
              {/* PHẦN ĐẦU CỦA BẢN */}
              <thead>
                <tr>
                  {props?.head.length > 0 && props?.head.map((head, index) => {
                    return (
                      <>
                        {head === 'Action' && auth.role === 'Admin' && (
                          <th key={index}>{head}</th>
                        )}

                        {head !== 'Action' && (
                          <th key={index}>{head}</th>
                        )}
                      </>
                    )
                  })}
                </tr>
              </thead>

              {/* PHẦN THÂN CỦA BẢNG */}
              <tbody>

                {/* PHẦN NỘI DUNG BẢNG BOOKING */}
                {props?.type === 'booking' && props?.list.length > 0 && props?.list.map((elm, index) => {
                  return (
                    <tr key={elm._id}>
                      <th scope="row">{index}</th>
                      <td>{elm.fullName}</td>
                      <td>{elm.hotel.name}</td>
                      <td>{elm.roomNumbers.join(",")}</td>
                      <td>{new Date(elm.startDate).toLocaleDateString()} - {new Date(elm.endDate).toLocaleDateString()}</td>
                      <td>${elm.price.$numberDecimal}</td>
                      <td>{elm.payment}</td>
                      <td>
                        <span className={`
                          ${classes['tbody-td-booking-status']}
                          ${elm.status == 'Booked'? classes['booked'] : elm.status == 'Checkin'? classes['Checkin'] : elm.status == 'Checkout'? classes['Checkout'] : ''} `}>
                            {elm.status}
                          </span>
                      </td>
                    </tr>
                  )
                })}

                {/* PHẦN NỘI DUNG BẢNG PHÂN QUYỀN */}
                {props?.type === 'role' && props?.list.length > 0 && props?.list.map((elm, index) => {

                  return (
                    <tr key={elm._id}>
                      <th scope="row">{index}</th>
                      <td>{elm.name}</td>
                      <td>{elm.users.length}</td>
                      
                      {auth.role === 'Admin' && (
                        <td>
                          <CommonButtonComponent click={props.edit} kind="contained" title="Edit"  type="button" id={elm._id}/>
                          <CommonButtonComponent click={props.delete} kind="contained" title="Delete"  type="button" id={elm._id}/>
                        </td>
                      )}
                      
                    </tr>
                  )
                })}

                {/* PHẦN NỘI DUNG BẢNG CỦA USERS */}
                {props?.type === 'user' && props?.list.length > 0 && props?.list.map((elm, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{index}</th>
                        <td>{elm.username}</td>
                        <td>{elm.fullname}</td>
                        <td>{elm.email}</td>
                        <td>{elm.phonenumber}</td>

                        {auth.role === 'Admin' && (
                          <td>
                            <CommonButtonComponent click={props.edit} kind="contained" title="Edit"  type="button" id={elm._id}/>
                            <CommonButtonComponent click={props.delete} kind="contained" title="Delete"  type="button" id={elm._id}/>
                          </td>
                        )}
                      </tr>
                    )
                  })}

                  {/* PHẦN NỘI DUNG CỦA LOCATION */}
                  {props?.type === 'location' && props?.list.length > 0 && props?.list.map((elm, index) => {
                    return (
                      <tr key={elm._id}>
                        <th scope="row">{index}</th>
                        <td>{elm.title}</td>

                        {auth.role === 'Admin' && (
                          <td>
                            <CommonButtonComponent click={props.edit} kind="contained" title="Edit"  type="button" id={elm._id}/>
                            <CommonButtonComponent click={props.delete} kind="contained" title="Delete"  type="button" id={elm._id}/>
                          </td>
                        )}
                      </tr>
                    )
                  })}

                  {/* PHẦN NỘI DUNG CỦA CATEGORY */}
                  {props?.type === 'category' && props?.list.length > 0 && props?.list.map((elm, index) => {
                    return (
                      <tr key={elm._id}>
                        <th scope="row">{index}</th>
                        <td>{elm.title}</td>

                        {auth.role === 'Admin' && (
                          <td>
                            <CommonButtonComponent click={props.edit} kind="contained" title="Edit"  type="button" id={elm._id}/>
                            <CommonButtonComponent click={props.delete} kind="contained" title="Delete"  type="button" id={elm._id}/>
                          </td>
                        )}
                      </tr>
                    )
                  })}

                  {/* PHẦN NỘI DUNG BẢNG CỦA HOTELS */}
                  {props?.type === 'hotel' && props?.list.length > 0 && props?.list.map((elm, index) => {
                    return (
                      <tr key={elm._id}>
                        <th scope="row">{index}</th>
                        <td>{elm.name}</td>
                        <td>{elm.city.title}</td>
                        <td>{elm.type.title}</td>
                        <td>{elm.price.$numberDecimal}</td>
                        <td>{elm.rooms.length}</td>

                        {auth.role === 'Admin' && (
                          <td>
                            <CommonButtonComponent click={props.edit} kind="contained" title="Edit"  type="button" id={elm._id}/>
                            <CommonButtonComponent click={props.delete} kind="contained" title="Delete"  type="button" id={elm._id}/>
                          </td>
                        )}
                      </tr>
                    )
                  })}

                  {/* PHẦN NỘI DUNG BẢNG LIÊN KẾT GIỮA ROOM VÀ HOTEL */}
                  {props?.type === 'hotelLink' && props?.list.length > 0 && props?.list.map((elm, index) => {
                    return (
                      <tr key={elm._id}>
                        <th scope="row">{index}</th>
                        <td>{elm.name}</td>

                        {auth.role === 'Admin' && (
                          <td>
                            <CommonButtonComponent click={props.edit} kind="contained" title="Edit"  type="button" id={elm._id}/>
                            <CommonButtonComponent click={props.delete} kind="contained" title="Delete"  type="button" id={elm._id}/>
                          </td>
                        )}
                      </tr>
                    )
                  })}

                  {/* PHẦN NỘI DUNG BẢNG CỦA ROOM */}
                  {props?.type === 'room' && props?.list.length > 0 && props?.list.map((elm, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{index}</th>
                        <td>{elm.title}</td>
                        <td>{elm.price.$numberDecimal}</td>
                        <td>{elm.maxPeople}</td>
                        <td>{elm.hotels.length}</td>
                        
                        {auth.role === 'Admin' && (
                          <td>
                            <CommonButtonComponent click={props.edit} kind="contained" title="Edit"  type="button" id={elm._id}/>
                            <CommonButtonComponent click={props.delete} kind="contained" title="Delete"  type="button" id={elm._id}/>
                          </td>
                        )}
                      </tr>
                    )
                  })}

              </tbody>

          </table>
        </div>
    )
}

export default CommonTableComponent;