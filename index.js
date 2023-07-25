const redux= require('redux')
const createStore = redux.createStore
const bindActionCreators=redux.bindActionCreators
const applyMiddleware = redux.applyMiddleware

const reduxLogger= require('redux-logger')    //Middleware to log the activities and add this to store
const logger=reduxLogger.createLogger()

const CAKE_ORDERED = "CAKE_ORDERED"
const CAKE_RESTOCK = "CAKE_RESTOCK"

const icecream_ORDERED = "icecream_ORDERED"
const icecream_RESTOCK = "icecream_RESTOCK"

function orderCake(){
    return {
        type:CAKE_ORDERED,
        quantity:1,
    }
}

function restockCake(qty){
    return {
        type:CAKE_RESTOCK,
        quantity:qty,
    }
}

function orderIcecream(){
    return {
        type:icecream_ORDERED,
        quantity:1,
    }
}

function restockIcecream(qty){
    return {
        type:icecream_RESTOCK,
        quantity:qty,
    }
}

//state as a single object

const initial_cakeState ={
    numOfCakes : 10,
}

const initial_icecreamState ={
    numOfIcecream : 20,
}

//(prevState, action) => newState

//Multiple reducers will be helpful to manage different types of buisness(cakes , ice cream)

const cakereducer = (state=initial_cakeState, action) => {
    switch(action.type){
     case icecream_ORDERED:
        return {
        ...state,   //create first a copy of state to avoide any change in other states
        numOfCakes: state.numOfCakes-action.quantity,
        }
        case icecream_RESTOCK:
            return{
               ...state,
               numOfCakes: state.numOfCakes+action.quantity,
            }
      default:
        return state  
    }
}

const icecreamreducer = (state=initial_icecreamState, action) => {
    switch(action.type){
     case CAKE_ORDERED:
        return {
        ...state,   //create first a copy of state to avoide any change in other states
        numOfIcecream: state.numOfIcecream-action.quantity,
        }
        case CAKE_RESTOCK:
            return{
               ...state,
               numOfIcecream: state.numOfIcecream+action.quantity,
            }
      default:
        return state  
    }
}

const rootReducer=redux.combineReducers({
    cake:cakereducer,
    icecream:icecreamreducer
})

const store= createStore(rootReducer,applyMiddleware(logger))
console.log("initial State",store.getState());

// const Unsubscribe = store.subscribe(()=>{
//     console.log("update State",store.getState());  ///Middleware will do all these task
// })

// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(restockCake(7));

const actions = bindActionCreators({orderCake,restockCake,orderIcecream,restockIcecream},store.dispatch)
actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restockCake(12)

// Unsubscribe()