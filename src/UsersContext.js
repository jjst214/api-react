//3가지 컨텍스트 내보내기
//State를 조회할 수 있는 함수 내보내기
//Dispatch를 쉽게 사용할 수 있는 함수 내보내기
//2가지들의 Provider로 감싸는 컴포넌트 내보내기
import axios from "axios";
import { createContext, useContext, useReducer } from "react";

//기본상태
const initialState = {
    loading: false,
    data: null,
    error: null
}

//리듀서 작성
function reducer(state, action){
    switch(action.type){
        case "LOADING":
            return{
                loading: true,
                data: null,
                error: null
            };
        case "SUCCESS":
            return{
                loading: false,
                data: action.data,
                error: null
            };
        case "ERROR":
            return{
                loading: false,
                data: null,
                error: action.error
            };
        default:
            return state;
    }
}
export async function getUsers(dispatch){
    dispatch({type:"LOADING"});
    try{
        const response = await axios.get("http://localhost:8010/cars");
        console.log(response);
        dispatch({type:"SUCCESS", data: response.data});
    }catch(e){
        dispatch({type:"ERROR", error: e});
    }
}

// State context, Dispatch context
const UsersStateContext = createContext(null);
const UsersDispatchContext = createContext(null);

// 위에서 선언한 context들의 provider로 감싸는 컴포넌트
export function UsersProvider({children}){
    const [state, dispatch] = useReducer(reducer, initialState);

    return(
        <UsersStateContext.Provider value={state}>
            <UsersDispatchContext.Provider value={dispatch}>
                {children}
            </UsersDispatchContext.Provider>
        </UsersStateContext.Provider>
    )
}

//State 조회하기
export function useUsersState(){
    const state = useContext(UsersStateContext);
    if(!state){
        return;
    }
    return state;
}
//Dispatch를 쉽게 사용할 수 있도록 내보내기
export function useUsersDispatch(){
    const dispatch = useContext(UsersDispatchContext);
    if(!dispatch){
        return;
    }
    return dispatch;
}