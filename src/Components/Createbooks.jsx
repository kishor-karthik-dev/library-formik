import React from "react";

import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { setBook } from "../Reducer/Slice";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Step, TextField } from "@mui/material";

const Createbooks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.app);

  const formik = useFormik({
    initialValues: {
      authorname: "",
      authordob: "",
      authorbio: "",
      books: {
        authorname: "",
        title: "",
        isbn: "",
        publishedon: "",
        bookimage: "",
      },
    },
    validate: (values) => {
      let errors = {};
      if (!values.books.title) {
        errors.books = { ...errors.books, title: "* Please enter the title" };
      }
      if(!values.books.bookimage){
        errors.books = {...errors.books,bookimage : "* Please add book image url"}
      }
      if (!values.books.isbn) {
        errors.books = { ...errors.books, isbn: "Please enter the ISBN" };
      } else if (values.books.isbn.length !== 10) {
        errors.books = { ...errors.books, isbn: "The ISBN must be exactly 10 digits" };
      }

      if (!values.books.publishedon) {
        errors.books = { ...errors.books, publishedon: "Please enter the published date" };
      }

      if (!values.authorname) {
        errors = { ...errors, authorname: "Please enter the author name" };
      }

      if (!values.authordob) {
        errors = { ...errors, authordob: "Please enter the author date of birth" };
      }

      if (!values.authorbio) {
        errors = { ...errors, authorbio: "Please enter the author biography" };
      }

      return errors;
    },
    onSubmit: async (values) => {
      values.books.authorname = values.authorname;
      try {
        const response = await axios.post(
          "https://656450eaceac41c0761de102.mockapi.io/author",
          values,
          navigate("/")
        );
        // Check if the response status is 2xx (successful)
        if (response.status >= 200 && response.status < 300) {
          dispatch(setBook(response.data));
        } else {
          console.error("Unsuccessful response status:", response.status);
          console.error("Response data:", response.data);
          // Handle the error appropriately, e.g., show an error message to the user
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });
  return (
    <div>
      <div className="container-fluid">
        <div className="row p-5">
          <h1 className=" text-center m-5">Add Book</h1>
          <form onSubmit={formik.handleSubmit}>
        <div className="col-6">
          <TextField
            id="outlined-basic"
            className=" input-group m-2"
            variant="outlined"
            label="Title"
            name = "books.title"
            type="text"
            value={formik.values.books.title}
            onChange={formik.handleChange}
          />
             <span className="text-danger">
                {formik.touched.books?.title && formik.errors.books?.title}
              </span>
          <TextField
          id="outlined-basic"
          className=" input-group m-2"
          variant="outlined"
          label="Book Image Link"
          name="books.bookimage"
          type="text"
          value={formik.values.books.bookimage}
          onChange={formik.handleChange}
          />
          <span className="text-danger">
                {formik.touched.books?.bookimage && formik.errors.books?.bookimage}
              </span>
    
          <TextField
            id="outlined-basic"
            className="input-group m-2"
            variant="outlined"
            label="Author"
            type="text"
            name="authorname"
            value={formik.values.authorname}
            onChange={formik.handleChange}
          />
              <span className="text-danger">
                {formik.touched?.authorname && formik.errors?.authorname}
              </span>
        </div>
        <div className="col-6">
          <TextField
            id="outlined-basic"
            className=" input-group m-2"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            label="DOB"
            type="date"
            name="authordob"
            value={formik.values.authordob}
            onChange={formik.handleChange}
          />
           <span className="text-danger">
                {formik.touched?.authordob && formik.errors?.authordob}
              </span>
          <TextField
            id="outlined-basic"
            variant="outlined"
            className=" input-group m-2"
            label="Bio"
            type="text"
            name="authorbio"
            value={formik.values.authorbio}
            onChange={formik.handleChange}
          />
           <span className="text-danger">
                {formik.touched?.authorbio && formik.errors?.authorbio}
              </span>

        </div>
        <div className="col-6">
          <TextField
            id="outlined-basic"
            className=" input-group m-2"
            variant="outlined"
            label="ISBN"
            type="text"
            name="books.isbn"
            value={formik.values.books.isbn}
            onChange={formik.handleChange}
          />
            <span className="text-danger">
                {formik.touched.books?.isbn && formik.errors.books?.isbn}
              </span>
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="Publised on"
            className=" input-group m-2"
            InputLabelProps={{ shrink: true }}
            type="text"
            name="books.publishedon"
            value={formik.values.books.publishedon}
            onChange={formik.handleChange}
          />
            <span className="text-danger">
                {formik.touched.books?.publishedon && formik.errors.books?.publishedon}
              </span>
        </div>
        <div className="col-6 p-2">
          <button className="btn btn-primary" value={"Submit"} type="submit">
            Submit
          </button>
          <Link className="btn btn-danger mx-5" to={'/'}>
            Cancel
          </Link>
        </div>
      </form>
        </div>
      </div>
    </div>
  );
};

export default Createbooks;
