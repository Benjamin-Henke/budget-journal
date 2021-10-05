import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

/* 
    Handles fetchCards
    Handles creating a new goal
    Handles modifying a goal
    Handles completing a goal
*/

function* fetchGoals() {
    try{
        const goals = yield axios.get ("api/goal")
        console.log("get goals", goals.data);
        yield put({ 
            type: 'SET_GOALS', 
            payload: goals.data
        });
    }catch(error){
        console.log('fetchGoals Error at goal.saga', error)
    }
};
function* postGoals(action) {

    try{
        yield axios.post('/api/goal', action.payload)
        yield put({ type: 'FETCH_GOALS'}) 
    }
    catch(error) {
        console.log('Post Goals has an error', error)
    }
};


export default function* goalSaga(){
    yield takeLatest('FETCH_GOALS', fetchGoals);
    yield takeLatest('POST_GOALS', postGoals);

}