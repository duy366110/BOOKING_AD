import { createSlice } from "@reduxjs/toolkit"

const initState = {
    // BOOKINNG
    booking: {
        elementOfPage: 5,
        elemtItemsPagination: 0,
        currentPage: 0,
    },
    // LOCATION
    location: {
        elementOfPage: 5,
        elemtItemsPagination: 0,
        currentPage: 0,
    },
    // CATEGORY
    category: {
        elementOfPage: 5,
        elemtItemsPagination: 0,
        currentPage: 0,
    },
    // HOTEL
    hotel: {
        elementOfPage: 5,
        elemtItemsPagination: 0,
        currentPage: 0,
    },
    // ROOM
    room: {
        elementOfPage: 5,
        elemtItemsPagination: 0,
        currentPage: 0,
    },
    // ROLE
    role: {
        elementOfPage: 3,
        elemtItemsPagination: 0,
        currentPage: 0,
    },
    // USER
    user: {
        elementOfPage: 5,
        elemtItemsPagination: 0,
        currentPage: 0,
    }
}

const paginationslice = createSlice({
    name: 'pagination slice',
    initialState: initState,
    reducers: {
        // BOOKING
            // CẬP NHẬT SỐ LƯỢNG NỘI DUNG HIỆN CÓ CỦA TRANG BOOKING
            updateElementToTalBooking: (state, action) => {
                let { amount } = action.payload;
                state.booking.elemtItemsPagination = Math.ceil(Number(amount) / state.booking.elementOfPage);
            },

            // PAGINATION CẬP NHẬT TRANG HIỆN TẠI CỦA TRANG BOOKING
            updateCurrentPageBooking: (state, action) => {
                let { page } = action.payload;

                switch(page) {
                    case 'next':
                        if(state.booking.currentPage === (state.booking.elemtItemsPagination - 1)) {
                            state.booking.currentPage = 0;

                        } else {
                            state.booking.currentPage += 1;
                        }

                        break

                    case 'previous':
                        if(state.booking.currentPage === 0) {
                            state.booking.currentPage = (state.booking.elemtItemsPagination - 1);

                        } else {
                            state.booking.currentPage -= 1;
                        }
                        break

                    default:
                        state.booking.currentPage = Number(page);
                        break
                }
            },


        // LOCATION
            // CẬP NHẬT SỐ LƯỢNG NỘI DUNG HIỆN CÓ CỦA TRANG LOCATION
            updateElementToTalLocation: (state, action) => {
                let { amount } = action.payload;
                state.location.elemtItemsPagination = Math.ceil(Number(amount) / state.location.elementOfPage);
            },

            // PAGINATION CẬP NHẬT TRANG HIỆN TẠI CỦA TRANG LOCATION
            updateCurrentPageLocation: (state, action) => {
                let { page } = action.payload;

                switch(page) {
                    case 'next':
                        if(state.location.currentPage === (state.location.elemtItemsPagination - 1)) {
                            state.location.currentPage = 0;

                        } else {
                            state.location.currentPage += 1;
                        }

                        break

                    case 'previous':
                        if(state.location.currentPage === 0) {
                            state.location.currentPage = (state.location.elemtItemsPagination - 1);

                        } else {
                            state.location.currentPage -= 1;
                        }
                        break

                    default:
                        state.location.currentPage = Number(page);
                        break
                }
            },

        // CATEGORY
            // CẬP NHẬT SỐ LƯỢNG NỘI DUNG HIỆN CÓ CỦA TRANG CATEGORY
            updateElementToTalCategory: (state, action) => {
                let { amount } = action.payload;
                state.category.elemtItemsPagination = Math.ceil(Number(amount) / state.category.elementOfPage);
            },

            // PAGINATION CẬP NHẬT TRANG HIỆN TẠI CỦA TRANG CATEGORY
            updateCurrentPageCategory: (state, action) => {
                let { page } = action.payload;

                switch(page) {
                    case 'next':
                        if(state.category.currentPage === (state.category.elemtItemsPagination - 1)) {
                            state.category.currentPage = 0;

                        } else {
                            state.category.currentPage += 1;
                        }

                        break

                    case 'previous':
                        if(state.category.currentPage === 0) {
                            state.category.currentPage = (state.category.elemtItemsPagination - 1);

                        } else {
                            state.category.currentPage -= 1;
                        }
                        break

                    default:
                        state.category.currentPage = Number(page);
                        break
                }
            },

        // HOTEL
            // CẬP NHẬT SỐ LƯỢNG NỘI DUNG HIỆN CÓ CỦA TRANG HOTEL
            updateElementToTalHotel: (state, action) => {
                let { amount } = action.payload;
                state.hotel.elemtItemsPagination = Math.ceil(Number(amount) / state.hotel.elementOfPage);
            },

            // PAGINATION CẬP NHẬT TRANG HIỆN TẠI CỦA TRANG HOTEL
            updateCurrentPageHotel: (state, action) => {
                let { page } = action.payload;

                switch(page) {
                    case 'next':
                        if(state.hotel.currentPage === (state.hotel.elemtItemsPagination - 1)) {
                            state.hotel.currentPage = 0;

                        } else {
                            state.hotel.currentPage += 1;
                        }

                        break

                    case 'previous':
                        if(state.hotel.currentPage === 0) {
                            state.hotel.currentPage = (state.hotel.elemtItemsPagination - 1);

                        } else {
                            state.hotel.currentPage -= 1;
                        }
                        break

                    default:
                        state.hotel.currentPage = Number(page);
                        break
                }
            },

        // ROOM
            // CẬP NHẬT SỐ LƯỢNG NỘI DUNG HIỆN CÓ CỦA TRANG ROOM
            updateElementToTalRoom: (state, action) => {
                let { amount } = action.payload;
                state.room.elemtItemsPagination = Math.ceil(Number(amount) / state.room.elementOfPage);
            },

            // PAGINATION CẬP NHẬT TRANG HIỆN TẠI CỦA TRANG ROOM
            updateCurrentPageRoom: (state, action) => {
                let { page } = action.payload;

                switch(page) {
                    case 'next':
                        if(state.room.currentPage === (state.room.elemtItemsPagination - 1)) {
                            state.room.currentPage = 0;

                        } else {
                            state.room.currentPage += 1;
                        }

                        break

                    case 'previous':
                        if(state.room.currentPage === 0) {
                            state.room.currentPage = (state.room.elemtItemsPagination - 1);

                        } else {
                            state.room.currentPage -= 1;
                        }
                        break

                    default:
                        state.room.currentPage = Number(page);
                        break
                }
            },

        // ROLE
            // CẬP NHẬT SỐ LƯỢNG NỘI DUNG HIỆN CÓ CỦA TRANG ROLE
            updateElementToTalRole: (state, action) => {
                let { amount } = action.payload;
                state.role.elemtItemsPagination = Math.ceil(Number(amount) / state.role.elementOfPage);
            },

            // PAGINATION CẬP NHẬT TRANG HIỆN TẠI CỦA TRANG ROLE
            updateCurrentPageRole: (state, action) => {
                let { page } = action.payload;

                switch(page) {
                    case 'next':
                        if(state.role.currentPage === (state.role.elemtItemsPagination - 1)) {
                            state.role.currentPage = 0;

                        } else {
                            state.role.currentPage += 1;
                        }

                        break

                    case 'previous':
                        if(state.role.currentPage === 0) {
                            state.role.currentPage = (state.role.elemtItemsPagination - 1);

                        } else {
                            state.role.currentPage -= 1;
                        }
                        break

                    default:
                        state.role.currentPage = Number(page);
                        break
                }
            },

        // USER
            // CẬP NHẬT SỐ LƯỢNG NỘI DUNG HIỆN CÓ CỦA TRANG USER
            updateElementToTalUser: (state, action) => {
                let { amount } = action.payload;
                state.user.elemtItemsPagination = Math.ceil(Number(amount) / state.user.elementOfPage);
            },

            // PAGINATION CẬP NHẬT TRANG HIỆN TẠI CỦA TRANG USER
            updateCurrentPageUser: (state, action) => {
                let { page } = action.payload;
                console.log(page);

                switch(page) {
                    case 'next':
                        if(state.user.currentPage === (state.user.elemtItemsPagination - 1)) {
                            state.user.currentPage = 0;

                        } else {
                            state.user.currentPage += 1;
                        }

                        break

                    case 'previous':
                        if(state.user.currentPage === 0) {
                            state.user.currentPage = (state.user.elemtItemsPagination - 1);

                        } else {
                            state.user.currentPage -= 1;
                        }
                        break

                    default:
                        state.user.currentPage = Number(page);
                        break
                }
            },
    }
})

export const {
    // BOOKING
    updateElementToTalBooking,
    updateCurrentPageBooking,

    // LOCATION
    updateElementToTalLocation,
    updateCurrentPageLocation,

    // CATEGORY
    updateElementToTalCategory,
    updateCurrentPageCategory,

    // HOTEL
    updateElementToTalHotel,
    updateCurrentPageHotel,

    // ROOM
    updateElementToTalRoom,
    updateCurrentPageRoom,

    // ROLE
    updateElementToTalRole,
    updateCurrentPageRole,

    // USER
    updateElementToTalUser,
    updateCurrentPageUser
} = paginationslice.actions;

export default paginationslice.reducer