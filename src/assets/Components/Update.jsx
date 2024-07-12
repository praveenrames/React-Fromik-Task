import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from "yup";



function Update() {

  const { id } = useParams();
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
        .put(`https://668b92d30b61b8d23b0a2ac6.mockapi.io/books/${id}`, values)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));

      navigate('/');
    }
  })
  useEffect(() => {
    axios.get(`https://668b92d30b61b8d23b0a2ac6.mockapi.io/books/${id}`)
      .then(res => {
        formik.setValues(res.data);
      })
      .catch(err => console.log(err));
  }, [id]);
  return (
      <div className='d-flex W-100 vH-100 justify-content-center align-items-center'>
        <div className='W-50 border bg-white shadow px-5 pt-3 pb-5'>
          <h1>Update a Book</h1>
          <form onSubmit={formik.handleSubmit}>
            <div className='mb-2'>
              <label htmlFor='title'>Title:</label>
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
              <label htmlFor='author'>Author:</label>
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
              <label htmlFor='ISBN'>ISBN:</label>
              <input
                type="number"
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
              <label htmlFor='genre'>Genre:</label>
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
              <label htmlFor='publishedDate'>Published Date:</label>
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
              <label htmlFor='price'>Price:</label>
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
              <label htmlFor='authorbirthDate'>Author Birth Date:</label>
              <input
                type="date"
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
              <label htmlFor='authorbiography'>Author Biography:</label>
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
              /><br/>
              {formik.touched.image && formik.errors.image ? (
                <div className='text-danger'>{formik.errors.image}</div>
              ) : null}
            </div>
            <button type='submit' className='btn btn-success mt-3'>Submit</button>
            <Link to='/' className='btn btn-primary ms-3 mt-3'>Back</Link>
          </form>
        </div>
      </div>
  )
}

export default Update