
import csrfFetch from "./csrf";

const RECEIVE_USER_RESERVS = "reservs/receiveUserReservs"
const RECEIVE_RESTAURANT_RESERVS = "reviews/receiveRestaurantReservs"
const ADD_NEW_RESERV ="reservs/addNewReserv"
const UPDATE_RESERV ="reservs/updateReserv"
const DELETE_RESERV = "reservs/removeReservs"


const receiveUserReservs = (reservs) => ({
    type: RECEIVE_USER_RESERVS,
    reservs
})

const addNewReserv = (reserv) => ({
    type: ADD_NEW_RESERV,
    reserv
})

const updateReserv = (reserv) => ({
    type: UPDATE_RESERV,
    reserv
})

const receiveRestaurantReservs = (reservs) => ({
    type: RECEIVE_RESTAURANT_RESERVS,
    reservs
})

const deleteReserv = (reservId) => ({
    type: DELETE_RESERV,
    reservId
});

export const getRestaurantReservs = (restaurantId) => async dispatch => {
    const res = await csrfFetch(`/api/restaurants/${restaurantId}/reservs`)
    if (res.ok) {
    const data = await res.json()
    dispatch(receiveRestaurantReservs(data))
    return data;
    }
}

export const getUserReservs = (userId) => async dispatch => {
    const res = await csrfFetch(`/api/users/${userId}/reservs`)
    // debugger
    if (res.ok) {
      const data = await res.json();
    //   debugger
      dispatch(receiveUserReservs(data))
    }
};

export const editReserv = (reservId, reserv) => async (dispatch) => {
    console.log(reservId)
    console.log( "-------------------------")
    const response = await csrfFetch(`/api/reservs/${reservId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reserv)
    })

    if (response.ok) {
        const reserv = await response.json();
        dispatch(updateReserv(reserv));
        return reserv;
    }
}

export const composeReserv = (reservData, restaurantId) => async (dispatch) => {
    const response = await csrfFetch(`/api/restaurants/${restaurantId}/reservs`, {
        method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reservData)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(addNewReserv(data));
        // return data;
    }
    return response;
}



export const removeReserv = (reservId) => async (dispatch) => {
    await csrfFetch(`/api/reservs/${reservId}`, {
        method: 'DELETE'
    });

    dispatch(deleteReserv(reservId)); 
}


const reservsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_RESTAURANT_RESERVS:
      return {
        ...state,
        ...action.reservs.reduce((accumulator, reserv) => {
          accumulator[reserv.id] = reserv;
          return accumulator;
        }, {})
      };
    case RECEIVE_USER_RESERVS:
      return {
        ...state,
        ...action.reservs.reduce((accumulator, reserv) => {
          accumulator[reserv.id] = reserv;
          return accumulator;
        }, {})
      };
    case ADD_NEW_RESERV:
      return {
        ...state,
        [action.reserv.id]: action.reserv
      };
    case UPDATE_RESERV:
      return {
        ...state,
        [action.reserv.id]: action.reserv
      };
    case DELETE_RESERV:
      const newState = { ...state };
      delete newState[action.reservId];
      return newState;
    default:
      return state;
  }
};


export default reservsReducer
