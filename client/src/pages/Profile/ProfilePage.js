import React, { useContext } from "react";
import AuthContext from "../../contexts/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const { auth } = useContext(AuthContext);
  console.log(auth);
  const user = auth.user;
  const navigate = useNavigate();

  const handleEditProfileClick = () => {
    navigate("edit-profile")
  }
  return (
    <div className="container py5">
      <div className="row">
        <div className="col-lg-4">
          <div className="card mb-4">
            <div className="card-body text-center">
              <img
                src={user.avatar}
                alt="avatar"
                className="rounded-circle img-fluid"
                style={{ width: "150px" }}
              />
              <h5 className="">{user.fullname}</h5>
              <p className="text-muted mb-1">{user.job ? user.job : "Job"}</p>
              <p className="text-muted mb-4">
                {user.address ? user.address : "Address"}
              </p>
            </div>

            <div className="d-flex justify-content-center mb-2">
              <button onClick={handleEditProfileClick} type="button" className="btn btn-primary">
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="card mb-4">
            <div className="card-body">
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Full Name</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{user.fullname}</p>
                </div>
              </div>
              <hr />

              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Email</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{user.email}</p>
                </div>
              </div>
              <hr />
              
              <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Phone</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{user.phoneNumber ? user.phoneNumber : "Phone-Number"}</p>
              </div>
            </div>
            <hr />

            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Address</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{user.address ? user.address : "Address"}</p>
              </div>
            </div>
            <hr/>

            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">About</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">DKJASDKJSAHDJKHASDKJAHSDJKASHDKJASHDKJSAHDKJSAHDKJASHDKJASHDKJASHDKAJSDHAJKSHDAKSJDHSAKJDHAKJSDHAKSJDHKS</p>
              </div>
            </div>  
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
