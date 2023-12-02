import React from "react";
import { Link } from "react-router-dom";

const Viewuser = ({ item,index, handleDelete }) => {
  return (
    <div>
      <div
        className="modal fade"
        id={`exampleModal${index}`} 
        tabIndex="-1"
        aria-labelledby={`exampleModalLabel${index}`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <div className="container">
                <div className="row d-flex justify-content-center">
                  <div className="col-6">
                    <h5 className="modal-title" id={`exampleModalLabel${index}`}>
                      {item.authorname}
                    </h5>
                    <p>
                      <small>{item.authordob}</small>
                    </p>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="btn-close btn btn-danger"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body bg-danger-subtle">{item.authorbio}</div>
            <div className="modal-footer">
              <div className="container-fluid">
                <div className="row d-flex justify-content-end bg-gradient">
                  <h5 className="text bg-body-secondary p-2 text-uppercase g-0">
                    <small>{item.books.title}</small>
                  </h5>
                  <p className=" text-start g-0">
                    Published on : <small>{item.books.publishedon}</small>
                  </p>
                  <p className="text-start g-0">
                    ISBN no : <small>{item.books.isbn}</small>
                  </p>

                  <Link
                    to={`/edit/${item.id}`}
                    className="btn btn-outline-primary col-3 m-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="btn btn-outline-danger col-3 m-2"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Viewuser;
