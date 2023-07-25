const redux= require('redux')
const Street_Update="Street_Update"
const createStore = redux.createStore
const produce=require('immer').produce


const initialState= {
    Name:'Kumar Anubhav',
    Address:{
      Street:'AG colony',
      City:'Ranchi',
      State:'Jharkhand',
    },
}

const changeStreet =(street)=>{
return {
  type:Street_Update,
  payload: street //'Old AG colony'
}
}



const streetreducer = (state=initialState, action) => {
    switch(action.type){
     case Street_Update:
        // return {
        // ...state,   //instead of this we can use Immer
        // Address:{
        //     ...state.Address,
        //     street:action.payload
        //   },
        // }
        return produce(state, (draft)=>{
         draft.Address.Street=action.payload
        })
      default:
        return state  
    }
}

const store= createStore(streetreducer)
console.log("initial State",store.getState());

const Unsubscribe = store.subscribe(()=>{
    console.log("update State",store.getState());  
})

store.dispatch(changeStreet('Old AG colony'))

Unsubscribe()