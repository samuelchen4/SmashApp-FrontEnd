//getting up redux store and thunk middleware

import { configureStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

export default configureStore(rootReducer, applyMiddleware(thunk));
