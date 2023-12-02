import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { editBook, setBook } from "../Reducer/Slice";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { TextField } from "@mui/material";

const Edit = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      authorname: "",
      authordob: "",
      authorbio: "",
      books: 
        {
          title: "",
          isbn: "",
          publishedon: "",
          bookimage: "",
          authorname: "",
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
        const response = await axios.put(
          `https://656450eaceac41c0761de102.mockapi.io/author/${params.id}`,
          values,
          navigate('/')
        );
          dispatch(setBook(response.data));
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });

  useEffect(() => {
    const getbooks = async () => {
      try {
        if(!params.id){
          console.error("error")
          return
        }
        const bookslist = await axios.get(
          `https://656450eaceac41c0761de102.mockapi.io/author/${params.id}`
        );
        // console.log(bookslist.data)
        // dispatch(editBook(bookslist.data));
        dispatch(editBook({ id: bookslist.data.id, ...bookslist.data }));
        formik.setValues(bookslist.data);
      } catch (error) {
        console.log(error);
      }
    };
    getbooks();
  }, []);
  return (
    <div>
      <div className="container-fluid">
        <div className="row p-5">
          <h1 className=" text-center m-5">Edit Book</h1>
          <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="col-6">
          <TextField
            id="outlined-basic"
            className=" input-group m-2"
            variant="outlined"
            label="Title"
            name = "books.title"
            type="text"
            value={formik.values.books?.title || ""}
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
          value={formik.values.books?.bookimage || ""}
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
            value={formik.values.books?.isbn|| ""}
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
            value={formik.values.books?.publishedon|| ""}
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
    </div>
  );
};

export default Edit;
