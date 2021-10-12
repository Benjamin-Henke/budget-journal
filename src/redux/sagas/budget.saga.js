import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

export default function* budgetSaga() {
    yield takeLatest("FETCH_ACTIVE_BUDGET_DETAILS", fetchActiveBudgetDetails);
    yield takeLatest("UPDATE_EXPENSE", updateExpense);

    function* fetchActiveBudgetDetails(action) {
        try {
            const response = yield axios.get(`/api/budget/details/${action.payload}`);
            console.log(`Budget Details for goal ${action.payload}`, response.data);
            yield put ({
                type: "SET_ACTIVE_BUDGET_DETAILS",
                payload: response.data
            })
        } catch (error) {
            console.error('Failed to fetch budget details', error)
        }
    }

    function* updateExpense(action) {
        if (action.payload.id === undefined) {
           yield axios.post('/api/budget', action.payload);
        } else {
            yield axios.put(`/api/budget/${action.payload.id}`, action.payload);
        }
    }


} // end export default function budgetSaga