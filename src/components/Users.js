import axios from 'axios';
import React, { useEffect, useReducer } from 'react';

function reducer(state, action){
    switch(action.type){
        case 'LOADING':
            return {
                loading: true,
                users: null,
                error: null
            };
        case 'SUCCESS':
            return {
                loading: false,
                users: action.data,
                error: null
            };
        case 'ERROR':
            return {
                loading: false,
                users: null,
                error: action.error
            };
        default: 
            return state;
    }
}
function Users(props) {
    //상태를 생성 users, loading, error
    const [state,dispatch] = useReducer(reducer, {
        loading: false,
        users: null,
        error: null
    })
    //axios요청
    const fetchUsers = async () => {
        try {
            //요청시작 error와 users는 null로초기화, 
            //loading은 true 
            dispatch({type:'LOADING'});
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            //response.data안에 데이터가 있음
            //요청성공 받아온 데이터를 users에 담기
            dispatch({type:'SUCCESS', data: response.data});
            
        }
        catch(e){
           dispatch({type:'ERROR', error: e})
        }
       
    }
    useEffect(() => {
        //함수호출
        fetchUsers();
    },[])
    const {loading, error, users } = state;
    if(loading) return <div>로딩중.....</div>;
    if(error) return <div>에러가 발생했습니다.</div>
    if(!users) return <div>데이터가 없습니다.</div>
    return (
        <div>
            <ul>
                {users.map(user=> (
                    <li key={user.id}>
                        {user.username} ({user.name})
                    </li>
                ))}
            </ul>
            <button onClick={fetchUsers}>다시 불러오기</button>
        </div>
    );
}

export default Users;