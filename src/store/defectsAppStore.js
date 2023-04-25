import { applyMiddleware, createStore } from 'redux';
import { defectsAppReducer } from '../reducers/defectsAppReducer';

export let defectsAppStore = createStore(defectsAppReducer, applyMiddleware(thunk));