import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  deleteCategoryAction,
  getAllCategoryAction,
  getByIdCategoryAction,
  updateRefCategory,
} from "../redux/CategoryReducer";
import { CategoryModal } from "./CategoryModal";

export function CategoryList() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  console.log(state);

  const [successOperation, setSuccessOperation] = useState(false);

  // Used to Initialize :: READ THE DATA FROM API
  useEffect(() => {
    dispatch(getAllCategoryAction());
  }, []);

  const deleteCategory = (item, index) => {
    dispatch(deleteCategoryAction(item));

    setSuccessOperation(true);
    setTimeout(() => setSuccessOperation(false), 2000);
  };

  const updateCategory = (item) => {
    // we are doing this so that we can access this objec in the form page
    dispatch(updateRefCategory(item));

    // form page
    history.push("/create-category");
  };

  const getCategoryById = (item) => {
    dispatch(getByIdCategoryAction(item));
  };

  return (
    <>
      <div className="row">
        <div className="col-3 col-md-2 d-none d-md-block"></div>
        <div className="col-12 col-md-8">
          <h3 className="alert alert-secondary">Category List</h3>

          {successOperation && (
            <div className="alert alert-success">Opeation Success</div>
          )}

          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#ID</th>
                <th scope="col">CATEGORYNAME</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...state.category.list].map((item, index) => (
                <tr key={index}>
                  <th scope="row">{item.id}</th>
                  <td>{item.categoryName}</td>
                  <td>
                    <input
                      type="button"
                      onClick={() => getCategoryById(item)}
                      value="Detail"
                      className="btn btn-link"
                    />
                    /
                    <input
                      type="button"
                      onClick={() => updateCategory(item)}
                      value="Edit"
                      className="btn btn-link"
                    />
                    /
                    <input
                      type="button"
                      value="Delete"
                      onClick={() => deleteCategory(item, index)}
                      className="btn btn-link text-danger"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-3 col-md-2 d-none d-md-block"></div>
      </div>

      {/** EMPLOYEE MODAL */}
      <CategoryModal />
    </>
  );
}
