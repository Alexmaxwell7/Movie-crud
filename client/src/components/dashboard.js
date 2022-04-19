import { useState, useEffect } from "react";
// import jwt from 'jsonwebtoken';
import "./register.css";
import axios from "axios";
import { useNavigate,Link } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const [record,setRecord] = useState([]);
    const [user, setUser] = useState({
      moviename: "",
      rating: "",
      gener: "",
      releasedate: "",
      cast:[]
    });
      const { moviename, rating, gener,releasedate,cast} = user;
      const onInputChange = e => {
        setUser({ ...user,[e.target.name]: e.target.value });
      };

      const loadEmployeeDetail = async () =>  
      {
        var response = fetch('http://localhost:5000/getMovieList')
           .then(function(response){
              return response.json();
            })
           .then(function(myJson) {
              setRecord(myJson);
            });
      }
      useEffect(() => {
        loadEmployeeDetail();
      }, []);

      const submitMovie = async (e) => {
        console.log("formdatawas",user);
          e.preventDefault();
          e.target.reset();
          await axios.post("http://localhost:5000/createMovie",user);
          alert('Data Inserted');
          loadEmployeeDetail();
          setUser([]);
      };
      const deleteRecord = (id) =>
      {
        axios.delete(`http://localhost:5000/deleteMovie/${id}`)
        .then((result)=>{
          loadEmployeeDetail();
        })
        .catch(()=>{
          alert('Error in the Code');
        });
      };
  return (
    <div class="container">  
    <h4 className="mb-3 text-center mt-4">Movie Application</h4>
      <div class="row mt-3">
       <div class="col-sm-4">
          <div className="box p-3 mb-3 mt-5" style={{border:"1px solid #d0d0d0"}}>
            <form onSubmit={submitMovie}> 
            <h5 className="mb-3 ">Add New Movie</h5>
                <div class="form-group">
                   <input type="text" class="form-control  mb-4" name="moviename"   value={moviename} onChange={e => onInputChange(e)} placeholder="Movie Name" required="true"/>
                </div>
                  
                <div class="form-group">
                   <input type="number" class="form-control  mb-4" name="rating" value={rating} onChange={e => onInputChange(e)}  placeholder="Rating" required="true"/>
                </div>
     
                <div class="form-group">
                   <input type="text" class="form-control mb-4" name="gener" value={gener} onChange={e => onInputChange(e)}  placeholder="Gener" required="true"/>
                </div>
                <div class="form-group">
                   <input type="text" class="form-control mb-4" name="cast" value={cast} onChange={e => onInputChange(e)}  placeholder="director | hero | composer" required="true"/>
                </div>
               
                <div class="form-group">
                   <input type="date" defaultValue="2017-05-24" class="form-control mb-4" name="releasedate" value={releasedate} onChange={e => onInputChange(e)}  placeholder="Date" required="true"/>
                </div>
                <button type="submit" class="btn btn-primary btn-block mt-4">Add Movie</button>
             </form>
        </div>
      </div>
      <div class="col-sm-8">
        <h5 class="text-center  ml-4 mt-4  mb-5">Movie List</h5>
        <table class="table table-hover  table-striped table-bordered ml-4 ">
            <thead>
            <tr>
                <th>Movie Name</th>
                <th>Rating</th>
                <th>Genre</th>
                <th>Cast</th>
                <th>Release Date</th>
                <th>Action</th>
            </tr>
            </thead>
              <tbody>
              {record.map((name)=>(
                 <tr key={name._id}>
                 <td>{name.moviename}</td>
                 <td>{name.rating}</td>
                 <td>{name.gener}</td>
                 <td>{name.cast}</td>
                 <td>{name.releasedate}</td> 
                 <td>
                       <a  className="text-danger mr-2"
                         onClick={() => {
                           const confirmBox = window.confirm(
                             "Do you really want to delete "+ name.moviename
                           )
                           if (confirmBox === true) {
                             deleteRecord(name._id)
                           }
                         }}> <i class="far fa-trash-alt" style={{fontSize:"18px",marginRight:"5px"}}></i>delete </a>                 
                       <Link  to={`/edit/${name._id}`}>
                         <i class="fa fa-edit" aria-hidden="true">edit</i> 
                       </Link>
                 </td> 
                  </tr>
              ))}
            </tbody>
        </table>
      </div>
      </div>
    </div>
  );
};

export default Dashboard;
