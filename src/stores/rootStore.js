import { createStore, applyMiddleware} from "redux";
import rootReducer from "./rootReducer";
import ReduxThunk from 'redux-thunk';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'auths',
    storage,
    whitelist: ['auths'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(ReduxThunk))

export default store
