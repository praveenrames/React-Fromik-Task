import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';


function Home() {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get('https://668b92d30b61b8d23b0a2ac6.mockapi.io/books')
        .then((res) => {
            setData(res.data)
        })
        .catch(err => console.log(err))
    }, [])
    
    const deleteBook = (id) => {
        axios.delete(`https://668b92d30b61b8d23b0a2ac6.mockapi.io/books/${id}`)
        .then(() => {
          setData(data.filter(book => book.id !== id)); 
        })
        .catch(err => console.log(err))
    };
  return (
      <>
        <div className='d-flex detail-header detail-header'>
            <div className='container' style={{ backgroundColor: "#455", height:"10rem"}}>
                <div className='col-12 text-center m-5'>
                    <h1><b style={{color : "white"}}>Book Labrary</b></h1>
                </div>
            </div>
        </div>
        <div className='container justify-content-space-between' id='button'>
            <div className='float: right'>
                <Link to='/Added' className='btn btn-primary m-3'><h1>Add book</h1></Link>
            </div>
        </div>
        <div className='main'>
        <div className='container'>
            <div className='row' style={{gap: "0px"}}>
               {
                 data.map((data, i) => (
                  <div className='col-lg-4 p-1' key={i}>
                  <div className="card" style={{width:"25rem", backgroundColor:"rgb(14, 193, 69)"}}>
                  <img src={data.image} className="card-img-top" alt="card image cap"/>
                  <div className="card-body">
                    <h5 className="card-title">{data.title}</h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item"><b>Author :</b>{data.author}</li>
                    <li className="list-group-item"><b>ISBN   :</b>{data.ISBN}</li>
                    <li className="list-group-item"><b>Price  :</b>{data.price}</li>
                  </ul>
                  <div className="card-body">
                    <Link to={`/Author/${data.id}`} className='btn btn-success ms-3 mt-4'>Author</Link>
                    <Link to={`/Update/${data.id}`} className='btn btn-warning ms-3 mt-4'>UPDATE</Link>
                    <button onClick={() => deleteBook(data.id)}
                      type='button' className='btn btn-danger ms-3 mt-4'>Delete</button>
                  </div>
                </div>
              </div>
              ))}
          </div>
        </div>
      </div>
      </>
  )
}

export default Home
