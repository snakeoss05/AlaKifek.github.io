import React, { Key } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./profile.css";
import { useNavigate } from "react-router-dom";
import UserAccount from "./UserAcoount";
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
  const [toggler, settoggler] = useState(false);
  const [file, setFile] = useState(null);
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
  const navigate = useNavigate();
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
        `https://alakifekbackend.onrender.com/api/ath/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserProfile(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (!userProfile) getUserById();
  }, []);

  function handleFileInputChange(event: any) {
    const file = event.target.files[0];
    setFile(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setImageUrl(reader.result as string);
    };
  }

  const UpdateProfile = async () => {
    var token = Cookies.get("token");

    let id = userProfile?._id;
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
        .put(
          `https://alakifekbackend.onrender.com/api/ath/user/profile/${id}`,
          formValues,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
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
    <>
      <UserAccount />
      <div className="container">
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
                      alt=""></img>
                  )}
                  {/* Profile picture help block*/}
                  <div className="small font-italic text-muted mb-4">
                    JPG or PNG no larger than 5 MB
                  </div>
                  {/* Profile picture upload button*/}
                  {!imageUrl && (
                    <button className="btn btn-primary " type="button">
                      Upload new image
                      <input
                        type="file"
                        className="form-control"
                        name="profileImage"
                        accept="image/*"
                        onChange={handleFileInputChange}></input>
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="col-xl-8">
              {/* Account details card*/}
              <div className="card mb-4 text-capitalize">
                <button
                  className="btn btn-outline-dark my-3 mx-auto"
                  onClick={() => settoggler(!toggler)}>
                  ADD ACCOUNT DETAILS
                </button>

                <div className="card-body">
                  {toggler ? (
                    <></>
                  ) : (
                    <div>
                      <div className="row gx-3 ">
                        <div className="col-md-6 ">
                          <label className="small mb-1" htmlFor="inputUsername">
                            FirstName
                          </label>
                          <div className="mb-3 d-flex flex-row position-relative">
                            {Profile.FirstName.isEditing ? (
                              <input
                                type="text"
                                name="FirstName"
                                className="form-control  w-100 "
                                placeholder="New FirstName"
                                onChange={(event) =>
                                  handleValueChange(event, "FirstName")
                                }
                              />
                            ) : (
                              <>
                                {userProfile && (
                                  <div>
                                    {userProfile?.FirstName ? (
                                      <h6>{userProfile?.FirstName}</h6>
                                    ) : (
                                      <input
                                        type="text"
                                        name="FirstName"
                                        className="form-control  w-100 "
                                        placeholder="New FirstName"
                                        onChange={(event) =>
                                          handleValueChange(event, "FirstName")
                                        }
                                      />
                                    )}
                                  </div>
                                )}
                              </>
                            )}
                            <button
                              className="btn btn-outline-dark rounded-4  btn-sm position-absolute end-0 me-3"
                              onClick={() => handleIconClick("FirstName")}>
                              {" "}
                              <i className="fa-solid fa-pen "></i>
                            </button>
                          </div>
                        </div>
                        <div className="col-md-6 ">
                          <label
                            className="small mb-1"
                            htmlFor="inputEmailAddress">
                            Email address
                          </label>
                          <div className=" d-flex flex-row position-relative">
                            {Profile.email.isEditing ? (
                              <input
                                type="email"
                                name="email"
                                className="form-control "
                                placeholder="New email"
                                onChange={(event) =>
                                  handleValueChange(event, "email")
                                }
                              />
                            ) : (
                              <>
                                {userProfile && (
                                  <div>
                                    {userProfile?.email ? (
                                      <h6 className="">{userProfile?.email}</h6>
                                    ) : (
                                      <input
                                        type="text"
                                        name="email"
                                        className="form-control  w-100 "
                                        placeholder="New email"
                                        onChange={(event) =>
                                          handleValueChange(event, "email")
                                        }
                                      />
                                    )}
                                  </div>
                                )}
                              </>
                            )}
                            <button
                              className="btn btn-outline-dark rounded-4 btn-sm position-absolute end-0 me-3"
                              onClick={() => handleIconClick("email")}>
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
                          <label
                            className="small mb-1"
                            htmlFor="inputFirstName">
                            LastName
                          </label>
                          <div className="d-flex flex-row position-relative">
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
                              <>
                                {userProfile && (
                                  <div>
                                    {userProfile?.LastName ? (
                                      <h6>{userProfile?.LastName}</h6>
                                    ) : (
                                      <input
                                        type="text"
                                        name="LastName"
                                        className="form-control  w-100 "
                                        placeholder="New LastName"
                                        onChange={(event) =>
                                          handleValueChange(event, "LastName")
                                        }
                                      />
                                    )}
                                  </div>
                                )}
                              </>
                            )}
                            <button
                              className="btn btn-outline-dark rounded-4 btn-sm position-absolute end-0 me-3"
                              onClick={() => handleIconClick("LastName")}>
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
                          <div className="mb-3 d-flex flex-row position-relative">
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
                              <>
                                {userProfile && (
                                  <div>
                                    {userProfile?.PhoneNumber ? (
                                      <h6>{userProfile?.PhoneNumber}</h6>
                                    ) : (
                                      <input
                                        type="text"
                                        name="PhoneNumber"
                                        className="form-control  w-100 "
                                        placeholder="New PhoneNumber"
                                        onChange={(event) =>
                                          handleValueChange(
                                            event,
                                            "PhoneNumber"
                                          )
                                        }
                                      />
                                    )}
                                  </div>
                                )}
                              </>
                            )}
                            <button
                              className="btn btn-outline-dark rounded-4 btn-sm position-absolute end-0 me-3"
                              onClick={() => handleIconClick("PhoneNumber")}>
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
                          <div className=" d-flex flex-row position-relative">
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
                              <>
                                {userProfile && (
                                  <div>
                                    {userProfile?.City ? (
                                      <h6>{userProfile?.City}</h6>
                                    ) : (
                                      <input
                                        type="text"
                                        name="City"
                                        className="form-control  w-100 "
                                        placeholder="City"
                                        onChange={(event) =>
                                          handleValueChange(event, "City")
                                        }
                                      />
                                    )}
                                  </div>
                                )}
                              </>
                            )}
                            <button
                              className="btn btn-outline-dark rounded-4 btn-sm position-absolute end-0 me-3"
                              onClick={() => handleIconClick("City")}>
                              {" "}
                              <i className="fa-solid fa-pen "></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="row gx-3 mb-3">
                        <div className="col-md-6 col-3">
                          <label className="small mb-1" htmlFor="inputLocation">
                            Location
                          </label>
                          <div className=" d-flex flex-row position-relative">
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
                              <>
                                {userProfile && (
                                  <div>
                                    {userProfile?.AddressLine ? (
                                      <h6>{userProfile?.AddressLine}</h6>
                                    ) : (
                                      <input
                                        type="text"
                                        name="AddressLine"
                                        className="form-control  w-100 "
                                        placeholder="AddressLine"
                                        onChange={(event) =>
                                          handleValueChange(
                                            event,
                                            "AddressLine"
                                          )
                                        }
                                      />
                                    )}
                                  </div>
                                )}
                              </>
                            )}
                            <button
                              className="btn btn-outline-dark rounded-4 btn-sm position-absolute end-0 me-3"
                              onClick={() => handleIconClick("AddressLine")}>
                              {" "}
                              <i className="fa-solid fa-pen "></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    className="btn btn-outline-success d-block ms-auto me-2 fw-semibold"
                    onClick={UpdateProfile}>
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
    </>
  );
}
