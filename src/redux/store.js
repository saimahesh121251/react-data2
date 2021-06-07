import { combineReducers } from "redux";
import { applyMiddleware } from "redux";
import { createStore } from "redux";
import thunk from "redux-thunk";

import { EmployeeReducer } from "./EmpoyeeReducer";
import { CategoryReducer } from "./CategoryReducer";

const rootReducer = combineReducers({
  employee: EmployeeReducer,
  category: CategoryReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));
export { store };
