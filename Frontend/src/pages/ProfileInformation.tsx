import React, { Key } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./profile.css";
import { ObjectId } from "bson";
import { Params } from "react-router-dom";
interface ServerData {
  FirstName: string;
  LastName: string;
  City: string;

  email: string;
  PhoneNumber: string;
  AddressLine: string;
  _id: any;
}
type ProfileProperty =
  | "email"
  | "FirstName"
  | "City"
  | "LastName"
  | "AddressLine"
  | "PhoneNumber";
export default function ProfileInformation() {
  const [userProfile, setUserProfile] = useState<ServerData>();
  const [imageUrl, setImageUrl] = useState<string | null>();
  const [id, setid] = useState<ServerData>();
  const [Profile, setProfile] = useState({
    email: {
      value: "",
      isEditing: false,
    },

    FirstName: {
      value: "",
      isEditing: false,
    },
    City: {
      value: "",
      isEditing: false,
    },
    LastName: {
      value: "",
      isEditing: false,
    },
    AddressLine: {
      value: "",
      isEditing: false,
    },
    PhoneNumber: {
      value: "",
      isEditing: false,
    },
  });

  const handleIconClick = (property: ProfileProperty) => {
    setProfile((prevProduct) => ({
      ...prevProduct,
      [property]: {
        ...prevProduct[property],
        isEditing: !prevProduct[property].isEditing,
      },
    }));
  };
  const handleValueChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    property: any
  ) => {
    const value = event.target.value;
    setProfile((prevProduct: any) => ({
      ...prevProduct,
      [property]: {
        ...prevProduct[property],
        value: value,
      },
    }));
  };
  const getUserById = async () => {
    var token = Cookies.get("token");
    try {
      const response = await axios.get<ServerData>(
        `http://localhost:5000/api/ath/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUserProfile(response.data);
      setid(response.data._id);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (!userProfile) getUserById();
  }, []);

  function handleFileInputChange(event: any) {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setImageUrl(reader.result as string);
    };
  }
  function Logout() {
    Cookies.remove("token");
    window.location.replace("/login");
    localStorage.clear();
  }

  const UpdateProfile = async () => {
    var token = Cookies.get("token");

    const formValues = {
      email: Profile.email.value,
      AddressLine: Profile.AddressLine.value,
      PhoneNumber: Profile.PhoneNumber.value,
      FirstName: Profile.FirstName.value,
      LastName: Profile.LastName.value,
      City: Profile.City.value,
    };
    try {
      await axios
        .put(`http://localhost:5000/api/ath/user/profile/${id}`, formValues, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setProfile({
            email: {
              value: "",
              isEditing: false,
            },

            FirstName: {
              value: "",
              isEditing: false,
            },
            City: {
              value: "ahmed",
              isEditing: false,
            },
            LastName: {
              value: "",
              isEditing: false,
            },
            AddressLine: {
              value: "",
              isEditing: false,
            },
            PhoneNumber: {
              value: "",
              isEditing: false,
            },
          });
          setUserProfile({
            email:
              formValues.email === ""
                ? userProfile?.email || ""
                : formValues.email,
            AddressLine:
              formValues.AddressLine === ""
                ? userProfile?.AddressLine || ""
                : formValues.AddressLine,
            PhoneNumber:
              formValues.PhoneNumber === ""
                ? userProfile?.PhoneNumber || ""
                : formValues.PhoneNumber,
            FirstName:
              formValues.FirstName === ""
                ? userProfile?.FirstName || ""
                : formValues.FirstName,
            LastName:
              formValues.LastName === ""
                ? userProfile?.LastName || ""
                : formValues.LastName,
            City:
              formValues.City === ""
                ? userProfile?.City || ""
                : formValues.City,
            _id: userProfile?._id,
          });
        });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    localStorage.setItem("userProfile", JSON.stringify(userProfile));
  }, [userProfile]);

  return (
    <div className="container">
      <div className="d-flex ">
        <div className="ms-auto">
          <span className="text-muted  me-1">Signout :</span>{" "}
          <button className="btn btn-dark  ms-auto" onClick={Logout}>
            <i className="fa-solid fa-right-from-bracket"></i>
          </button>
        </div>
      </div>
      <div className=" px-4 mt-4 profile">
        {/* Account page navigation*/}

        <hr className="mt-0 mb-4" />
        <div className="row">
          <div className="col-xl-4">
            {/* Profile picture card*/}
            <div className="card mb-4 mb-xl-0">
              <div className="card-header">Profile Picture</div>
              <div className="card-body text-center">
                {/* Profile picture image*/}
                {imageUrl ? (
                  <img
                    className="img-account-profile"
                    src={imageUrl}
                    alt="Uploaded "
                  />
                ) : (
                  <img
                    className="img-account-profile rounded-circle mb-2"
                    src="http://bootdey.com/img/Content/avatar/avatar1.png"
                    alt=""
                  ></img>
                )}
                {/* Profile picture help block*/}
                <div className="small font-italic text-muted mb-4">
                  JPG or PNG no larger than 5 MB
                </div>
                {/* Profile picture upload button*/}
                {!imageUrl && (
                  <button className="btn btn-primary" type="button">
                    Upload new image
                    <input
                      type="file"
                      className="btn"
                      onChange={handleFileInputChange}
                    ></input>
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="col-xl-8">
            {/* Account details card*/}
            <div className="card mb-4 text-capitalize">
              <div className="card-header">Account Details</div>

              <div className="card-body">
                <div>
                  {/* Form Group (username)*/}
                  <div className="row gx-3 ">
                    <div className="col-md-6 ">
                      <label className="small mb-1" htmlFor="inputUsername">
                        FirstName
                      </label>
                      <div className="mb-3 d-flex flex-row ">
                        {Profile.FirstName.isEditing ? (
                          <input
                            type="text"
                            name="FirstName"
                            className="form-control  w-25 "
                            placeholder="New FirstName"
                            onChange={(event) =>
                              handleValueChange(event, "FirstName")
                            }
                          />
                        ) : (
                          <h5>{userProfile?.FirstName}</h5>
                        )}
                        <button
                          className="btn btn-outline-dark rounded-4 ms-2 btn-sm "
                          onClick={() => handleIconClick("FirstName")}
                        >
                          {" "}
                          <i className="fa-solid fa-pen "></i>
                        </button>
                      </div>
                    </div>
                    <div className="col-md-6 ">
                      <label className="small mb-1" htmlFor="inputEmailAddress">
                        Email address
                      </label>
                      <div className=" d-flex flex-row ">
                        {Profile.email.isEditing ? (
                          <input
                            type="email"
                            name="email"
                            className="form-control  w-75 "
                            placeholder="New email"
                            onChange={(event) =>
                              handleValueChange(event, "email")
                            }
                          />
                        ) : (
                          <h5>{userProfile?.email}</h5>
                        )}
                        <button
                          className="btn btn-outline-dark rounded-4 ms-2 btn-sm"
                          onClick={() => handleIconClick("email")}
                        >
                          {" "}
                          <i className="fa-solid fa-pen "></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Form Row*/}
                  <div className="row gx-3">
                    {/* Form Group (first name)*/}
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputFirstName">
                        LastName
                      </label>
                      <div className="d-flex flex-row">
                        {Profile.LastName.isEditing ? (
                          <input
                            type="text"
                            name="LastName"
                            className="form-control  w-50"
                            placeholder="LastName"
                            onChange={(event) =>
                              handleValueChange(event, "LastName")
                            }
                          />
                        ) : (
                          <h5>{userProfile?.LastName}</h5>
                        )}
                        <button
                          className="btn btn-outline-dark rounded-4 ms-2 btn-sm"
                          onClick={() => handleIconClick("LastName")}
                        >
                          {" "}
                          <i className="fa-solid fa-pen "></i>
                        </button>
                      </div>
                    </div>
                    {/* Form Group (last name)*/}
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputLastName">
                        PhoneNumber
                      </label>
                      <div className="mb-3 d-flex flex-row">
                        {Profile.PhoneNumber.isEditing ? (
                          <input
                            type="number"
                            name="PhoneNumber"
                            className="form-control  w-50"
                            placeholder="PhoneNumber"
                            onChange={(event) =>
                              handleValueChange(event, "PhoneNumber")
                            }
                          />
                        ) : (
                          <h5>{userProfile?.PhoneNumber}</h5>
                        )}
                        <button
                          className="btn btn-outline-dark rounded-4 ms-2 btn-sm"
                          onClick={() => handleIconClick("PhoneNumber")}
                        >
                          {" "}
                          <i className="fa-solid fa-pen "></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputLocation">
                        City
                      </label>
                      <div className=" d-flex flex-row">
                        {Profile.City.isEditing ? (
                          <input
                            type="text"
                            name="City"
                            className="form-control  w-75"
                            placeholder="New City"
                            onChange={(event) =>
                              handleValueChange(event, "City")
                            }
                          />
                        ) : (
                          <h5>{userProfile?.City}</h5>
                        )}
                        <button
                          className="btn btn-outline-dark rounded-4 ms-2 btn-sm"
                          onClick={() => handleIconClick("City")}
                        >
                          {" "}
                          <i className="fa-solid fa-pen "></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputLocation">
                        Location
                      </label>
                      <div className=" d-flex flex-row">
                        {Profile.AddressLine.isEditing ? (
                          <input
                            type="text"
                            name="AddressLine"
                            className="form-control  w-75"
                            placeholder="New Location"
                            onChange={(event) =>
                              handleValueChange(event, "AddressLine")
                            }
                          />
                        ) : (
                          <h5>{userProfile?.AddressLine}</h5>
                        )}
                        <button
                          className="btn btn-outline-dark rounded-4 ms-2 btn-sm"
                          onClick={() => handleIconClick("AddressLine")}
                        >
                          {" "}
                          <i className="fa-solid fa-pen "></i>
                        </button>
                      </div>
                    </div>
                    <div className="col-6 mt-3 d-flex">
                      <button
                        className="btn btn-outline-success ms-auto me-2 fw-semibold"
                        onClick={UpdateProfile}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  );
}
