const initState = {
  list: [],

  refcat: {},
  sampleList: ["Delhi", "Kolkata", "Chennai", "Mumbai"],
};

// ACTION TYPES
const CATEGORY_CREATE = "CATEGORY_CREATE";
const CATEGORY_UPDATE = "CATEGORY_UPDATE";
const CATEGORY_DELETE = "CATEGORY_DELETE";
const CATEGORY_GET_ALL = "CATEGORY_GET_ALL";
const CATEGORY_GET_BY_ID = "CATEGORY_GET_BY_ID";

const REF_CATEGORY = "REF_CATEGORY";

// ACTIONS :: COmponents are interacting with this action
export function createCategoryAction(payload) {
  // return { type: CATEGORY_CREATE, payload: payload };

  // MAKE SURE redux-thunk is installed.
  return async (dispatch) => {
    // WE HV TO CALL THE SPRINT1 / SPRING BOOT
    const url = "http://localhost:8080/api/category/";

    // HTTP Client
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    // UPDATE THE UI
    dispatch({ type: CATEGORY_CREATE, payload: payload });
  };
}

export function updateCategoryAction(payload) {
  // return { type: Category_UPDATE, payload: payload };
  return async (dispatch) => {
    // WE HV TO CALL THE SPRINT1 / SPRING BOOT
    const url = `http://localhost:8080/api/category/${payload.id}`;

    await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });

    // update the ui.
    dispatch(updateRefCategory({}));
  };
}

export function deleteCategoryAction(payload) {
  // return { type: CATEGORY_DELETE, payload: payload };

  // redux thunk
  return async (dispatch) => {
    const url = `http://localhost:8080/api/category/${payload.id}`;
    await fetch(url, { method: "DELETE" });

    // update the ui.
    dispatch(getAllCategoryAction());
  };
}

export function getAllCategoryAction(payload) {
  // return { type: EMPLOYEE_GET_ALL, payload: payload };

  // API CALL/BACKEND CALL / REDUX-THUNK IS THERE
  return async (dispatch) => {
    // WE HV TO CALL THE SPRINT1 / SPRING BOOT
    const url = "http://localhost:8080/api/category/";

    // HTTP Client / POSTMAN / SWAGGER
    const response = await fetch(url);
    const categorList = await response.json();
    console.log(categorList);

    // Update the UI
    dispatch({ type: CATEGORY_GET_ALL, payload: categorList });
  };
}

export function getByIdCategoryAction(payload) {
  // return { type: EMPLOYEE_GET_BY_ID, payload: payload };
  return async (dispatch) => {
    const url = `http://localhost:8080/api/category/${payload.id}`;
    const response = await fetch(url);
    const categoryObj = await response.json();

    // this wil update the refemp
    dispatch(updateRefCategory(categoryObj));
  };
}

export function updateRefCategory(payload) {
  return { type: REF_CATEGORY, payload: payload };
}

// REDUCER LOGIC
export function CategoryReducer(state = initState, action) {
  switch (action.type) {
    case CATEGORY_CREATE:
      return { ...state, list: [action.payload, ...state.list] };
    case CATEGORY_UPDATE:
      // TODO
      return state;
    case CATEGORY_DELETE:
      // TODO
      const oldList = state.list;
      oldList.splice(action.payload, 1);
      console.log("OL", oldList);

      return { ...state, list: [...oldList] };
    case CATEGORY_GET_ALL:
      // Update the list
      return { ...state, list: action.payload };
    case CATEGORY_GET_BY_ID:
      // TODO
      return state;

    case REF_CATEGORY:
      return { ...state, refemp: action.payload };

    default:
      return state;
  }
}
