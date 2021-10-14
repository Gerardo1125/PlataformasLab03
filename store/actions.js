export const GET_USER = 'GET_USER';
export const ADD_USER = 'ADD_USER';
export const REMOVE_USER = 'REMOVE_USER';

export const getUser = () => {
    try {
        return async dispatch => {
            //const response = await axios.get(`${BASE_URL}`);
            // console.log('DATA ========>', response.data);
            /*dispatch({
                type: GET_USER,
                user: data
            });*/
        };
    } catch (error) {
        // Add custom logic to handle errors
        console.log(error);
    }
};

export const addUser = user => dispatch => {
    console.log("addUser")
    //console.log(user)
    dispatch({
        type: ADD_USER,
        user: user
    });
};

export const removeUser = user => dispatch => {
    dispatch({
        type: REMOVE_USER,
        user: user
    });
};