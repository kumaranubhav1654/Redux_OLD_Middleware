const redux= require('redux')
const createStore = redux.createStore
const thunk_middleware=require('redux-thunk').default
const applyMiddleware=redux.applyMiddleware
const Axios = require('axios')



const initialState={
    loading:false,
    data:[],
    error:''
}


const fetch_user_requested='fetch_user_requested' 
const fetch_user_success='fetch_user_success'
const fetch_user_failed='fetch_user_failed'

const fetchUserRequested=()=>{
    return{
        type:fetch_user_requested
    }
}

const fetchUserSuccess=(user)=>{
    return{
        type:fetch_user_success,
        payload:user
    }
}

const fetchUserfailed=(error)=>{
    return{
        type:fetch_user_failed,
        payload:error
    }
}

const userReducer=(state=initialState,action)=>{
    switch(action.type){
        case fetch_user_requested:
        return{
            ...state,
            loading:true
        }
        case fetch_user_success:
            return{
                ...state,
                loading:false,
                user:action.payload
            }
        case fetch_user_requested:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
            default:
        return state  
    }
   
}

const fetchUser =()=>{    //actions creator generally returns an action but in thunk it returns a function. allowed to have side effects
 return function (dispatch){
    dispatch(fetchUserRequested())
    Axios.get("https://jsonplaceholder.typicode.com/users").then((res)=>{
        const userData= res.data.map((user)=>user.name)
        dispatch(fetchUserSuccess(userData))
    }).catch((error)=>{
      dispatch(fetchUserfailed(error.message))
    })
 }
}


const store = createStore(userReducer,applyMiddleware(thunk_middleware))

store.subscribe(()=>{
 console.log("update State",store.getState());  
})

store.dispatch(fetchUser())

