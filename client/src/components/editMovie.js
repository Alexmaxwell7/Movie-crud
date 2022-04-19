import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate,useParams } from 'react-router-dom';
const EditMovie = () => {
const navigate = useNavigate();
const { id } = useParams();  
  
 
  const [user, setUser] = useState({
    moviename: "",
    rating: "",
    gener: "",
    releasedate: "",
  });
 
 
  const { moviename, rating, gener,releasedate} = user;
 
  const onInputChange = e => {
    setUser({ ...user,[e.target.name]: e.target.value });
  };
 
  useEffect(() => {
    loadUser();
  }, []);
 
   
  const updateEmployee = async e => {
      console.log("updatedata was",user);
    e.preventDefault();
    await axios.put(`http://localhost:5000/updateMovie/${id}`, user);
    setUser({
        moviename: "",
        rating: "",
        gener: "",
        releasedate: "",
    });
    navigate("/dashboard", { replace: true });
  };
  const loadUser =  () => {
    fetch(`http://localhost:5000/getMoviebyid/${id}`,{
            method: "GET",
          })
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
            setUser(result);
            })
            .catch((error) => console.log("error", error));
  };
 
  return (
    <div className="container">
     <div className="row mt-4"> 
      <div className="col-sm-5 col-offset-3 mx-auto shadow p-5">
        <h4 className="text-center mb-4">Edit A Movie</h4>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Product Name"
              name="moviename"
              value={moviename}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="Enter Product Price"
              name="rating"
              value={rating}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Product Description"
              name="gener"
              value={gener}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Product Description"
              name="releasedate"
              value={releasedate}
              onChange={e => onInputChange(e)}
            />
          </div>
          <button onClick={updateEmployee} className="btn btn-secondary btn-block">Update Movie</button>
       
       </div>
      </div> 
    </div>
  );
};
 
export default EditMovie;