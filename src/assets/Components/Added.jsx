import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";


const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

function Added () {
  const [values, setValues] = useState({
    title: '',
    author: '',
    ISBN: '',
    genre: '',
    publishedDate: '',
    price: '',
    authorbirthDate: '',
    authorbiography: '',
    image: ''
  })
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    title: Yup.string().min(3).required("Please Enter Title"),
    author: Yup.string().required("Please Enter Author"),
    ISBN: Yup.string().required("Please Enter ISBN"),
    genre: Yup.string().required("Please Enter Genre"),
    publishedDate: Yup.string().required("Please Enter PublishedDate"),
    price: Yup.string().required("Please Enter Price"),
    authorbirthDate: Yup.string().required("Please Enter AuthorbirthDate"),
    authorbiography: Yup.string().required("Please Enter Authorbiography"),
    image: Yup.mixed()
      .required('Add your image')
      .test(
        'fileFormat',
        'Unsupported Format',
        value => value && SUPPORTED_FORMATS.includes(value.type)
      )
  })

  const formik = useFormik({
    initialValues: {
      title: '',
      author: '',
      ISBN: '',
      genre: '',
      publishedDate: '',
      price: '',
      authorbirthDate: '',
      authorbiography: '',
      image: null
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await axios
        .post(`https://668b92d30b61b8d23b0a2ac6.mockapi.io/books`, values)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));

      navigate('/');
    }
  })
  
  return (
    <>
     <div className='d-flex W-100 vH-100 justify-content-center align-items-center'>
        <div className='W-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
          <h1>Add a Book</h1>
          <form onSubmit={formik.handleSubmit}>
            <div className='mb-2'>
              <label htmlFor='title'><b>Title:</b></label>
              <input
                type="text"
                name='title'
                className='form-control'
                placeholder='Enter title'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
              />
              {formik.touched.title && formik.errors.title ? (
                <div className='text-danger'>{formik.errors.title}</div>
              ) : null}
            </div>
            <div className='mb-2'>
              <label htmlFor='author'><b>Author:</b></label>
              <input
                type="text"
                name='author'
                className='form-control'
                placeholder='Enter Author Name'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.author}
              />
              {formik.touched.author && formik.errors.author ? (
                <div className='text-danger'>{formik.errors.author}</div>
              ) : null}
            </div>
            <div className='mb-2'>
              <label htmlFor='ISBN'><b>ISBN:</b></label>
              <input
                type="text"
                name='ISBN'
                className='form-control'
                placeholder='Enter ISBN'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.ISBN}
              />
              {formik.touched.ISBN && formik.errors.ISBN ? (
                <div className='text-danger'>{formik.errors.ISBN}</div>
              ) : null}
            </div>
            <div className='mb-2'>
              <label htmlFor='genre'><b>Genre:</b></label>
              <input
                type="text"
                name='genre'
                className='form-control'
                placeholder='Enter Genre'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.genre}
              />
              {formik.touched.genre && formik.errors.genre ? (
                <div className='text-danger'>{formik.errors.genre}</div>
              ) : null}
            </div>
            <div className='mb-2'>
              <label htmlFor='publishedDate'><b>Published Date:</b></label>
              <input
                type="date"
                name='publishedDate'
                className='form-control'
                placeholder='Enter Published Date'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.publishedDate}
              />
              {formik.touched.publishedDate && formik.errors.publishedDate ? (
                <div className='text-danger'>{formik.errors.publishedDate}</div>
              ) : null}
            </div>
            <div className='mb-2'>
              <label htmlFor='price'><b>Price:</b></label>
              <input
                type="number"
                name='price'
                className='form-control'
                placeholder='Enter Price'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.price}
              />
              {formik.touched.price && formik.errors.price ? (
                <div className='text-danger'>{formik.errors.price}</div>
              ) : null}
            </div>
            <div className='mb-2'>
              <label htmlFor='authorbirthDate'><b>Author Birth Date:</b></label>
              <input
                type='date'
                name='authorbirthDate'
                className='form-control'
                placeholder='Enter Author Birth Date'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.authorbirthDate}
              />
              {formik.touched.authorbirthDate && formik.errors.authorbirthDate ? (
                <div className='text-danger'>{formik.errors.authorbirthDate}</div>
              ) : null}
            </div>
            <div className='mb-2'>
              <label htmlFor='authorbiography'><b>Author Biography:</b></label>
              <input
                type="text"
                name='authorbiography'
                className='form-control'
                placeholder='Enter Author Biography'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.authorbiography}
              />
              {formik.touched.authorbiography && formik.errors.authorbiography ? (
                <div className='text-danger'>{formik.errors.authorbiography}</div>
              ) : null}
            </div>
            <div>
              <label htmlFor="profile_pic">Choose file to upload</label>
              <input
                type="file"
                id="profile_pic"
                name="image"
                accept=".jpg, .jpeg, .png"
                onChange={(event) => {
                  formik.setFieldValue("image", event.currentTarget.files[0]);
                }}
              />
              {formik.touched.image && formik.errors.image ? (
                <div className='text-danger'>{formik.errors.image}</div>
              ) : null}
            </div>
            <button type='submit' className='btn btn-success mt-3'>Submit</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Added