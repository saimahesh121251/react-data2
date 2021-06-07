import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  createCategoryAction,
  updateCategoryAction,
} from "../redux/CategoryReducer";

export function CategoryUpsert() {
  const dispatch = useDispatch();
  const history = useHistory();
  const state = useSelector((state) => state);
  console.log(state);

  const [categoryName, setCategoryName] = useState(
    state.category.refcat.categoryName
  );
  const [successOperation, setSuccessOperation] = useState(false);
  const [errorOperation, setErrorOperation] = useState(false);

  const updateCategoryName = (c) => setCategoryName(c.target.value);

  const addCategory = (c) => {
    c.preventDefault();
    console.log(categoryName);

    // THIS IS REDUX ACTION CALLING
    dispatch(
      createCategoryAction({
        categoryName,
      })
    );

    // A1 sucess
    setSuccessOperation(true);
    setTimeout(() => setSuccessOperation(false), 5000);

    // A2: navigate to another page
    // history.push("/list-employee");

    // reset the form
    setCategoryName("");
  };

  const updateCategory = () => {
    dispatch(
      updateCategoryAction({
        id: state.category.refcat.id,
        categoryName,
      })
    );

    // reset the form
    setCategoryName("");
  };

  return (
    <div className="row">
      <div className="col-3 col-md-3 d-none d-md-block"></div>
      <div className="col-12 col-md-6">
        <h3 className="alert alert-secondary">
          {state.category.refcat.id ? "Update Category" : "Create Category"}
        </h3>

        {/** BELOW THESE TWO TAGS MUST BE CONDITIOANL */}
        {successOperation && (
          <div className="alert alert-success">Operation Success</div>
        )}

        <div className="mb-1">
          <input
            type="text"
            value={categoryName}
            onChange={(c) => updateCategoryName(c)}
            className="form-control"
            placeholder="Category name"
          />
        </div>

        <div className="mb-1">
          {state.category.refcat.id ? (
            <input
              type="button"
              className="btn btn-secondary w-100"
              value="Update Category"
              onClick={() => updateCategory()}
            />
          ) : (
            <input
              type="button"
              className="btn btn-secondary w-100"
              value="Add Category"
              onClick={(c) => addCategory(c)}
            />
          )}
        </div>
      </div>
      <div className="col-3 col-md-3  d-none d-md-block"></div>
    </div>
  );
}
