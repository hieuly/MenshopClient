import { CalendarToday, LocationSearching, MailOutline, PermIdentity, PhoneAndroid, Publish } from "@material-ui/icons";
import { useLocation  } from "react-router-dom";
import "./user.css";
import { useDispatch, useSelector  } from "react-redux"
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { updateUser } from"../redux/apiCalls";
import { useState} from "react";
// import { publicRequest } from "../requestMethods";
import styled from "styled-components";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
  } from "firebase/storage";
  import app from "../firebase";

const Container=styled.div`

`;

export default function User() {
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    // const [user, setUser] = useState({});
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState({});
    const [file, setFile] = useState(null);
  
    // useEffect(() => {
    //   const getUser = async () => {
    //     try {
    //       const res = await publicRequest.get(`/users/find/`+id);
    //       setUser(res.data);
    //     } catch {}
    //   };
    //   getUser();
    // }, [id]);

    const user = useSelector((state) => state.user.users.find((user) => user._id === id));
    const handleChange = (e) => {
        setInputs((prev) => {
          return { ...prev, [e.target.name]: e.target.value };
        });
      };
      const handleClick = (e) => {
        e.preventDefault();
        const fileName = new Date().getTime() + file.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
    
        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
            }
          },
          (error) => {
            // Handle unsuccessful uploads
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              const user = { ...inputs, img: downloadURL };
              updateUser( id,user,dispatch);
            });
          }
        );
      };

  return (
    <Container>
    <Navbar />
    <div className="user">
        <div className="userTitleContainer">
            <h1 className="userTitle">Edit User</h1>
        </div>
        <div className="userContainer">
            <div className="userShow">
                <div className="userShowTop">
                    <img src={user.img}
                         alt="" 
                         className="userShowImg" 
                    />
                    <div className="userShowTopTitle">
                        <span className='userShowUsername'>{user.username}</span>
                        <span className="userShowUserTitle">Software Engineer</span>
                    </div>
                </div>
                
                <div className="userShowBottom">
                    <span className="userShowTitle">Account Details</span>
                    <div className="userShowInfo">
                        <PermIdentity className="userShowIcon"/>
                        <span className='userShowInfoTitle'>{user.username}</span>
                    </div>
                    <div className="userShowInfo">
                        <CalendarToday className="userShowIcon"/>
                        <span className="userShowInforTitle">08.04.1999</span>
                    </div>
                    <span className="userShowTitle">Contact Details</span>
                    <div className="userShowInfo">
                        <PhoneAndroid className="userShowIcon"/>
                        <span className="userShowInforTitle">0123456789</span>
                    </div>
                    <div className="userShowInfo">
                        <MailOutline className="userShowIcon"/>
                        <span className='userShowInfoTitle'>{user.email}</span>
                    </div>
                    <div className="userShowInfo">
                        <LocationSearching className="userShowIcon"/>
                        <span className="userShowInforTitle">TP.HCM | VN</span>
                    </div>
                </div>
            </div>
            <div className="userUpdate">
                <span className="userUpdateTitle">Edit</span>
                <form action="" className="userUpdateForm">
                    <div className="userUpdateLeft">
                        <div className="userUpdateItem">
                            <label>Username</label>
                            <input 
                                  name="username"
                                  onChange={handleChange}
                                    type="text" 
                                   placeholder={user.username}
                                   className="userUpdateInput"/>
                        </div>
                        <div className="userUpdateItem">
                            <label>Email</label>
                            <input name="email" onChange={handleChange} className='userUpdateInput' placeholder={user.email} type="text"></input>
                        </div>
                        <div className="userUpdateItem">
                            <label>Phone</label>
                            <input type="text" 
                                   placeholder="0123456789" 
                                   className="userUpdateInput"/>
                        </div>
                        <div className="userUpdateItem">
                            <label>Address</label>
                            <input type="text" 
                                   placeholder="TP.HCM | VN" 
                                   className="userUpdateInput"/>
                        </div>
                    </div>
                    <div className="userUpdateRight">
                        <div className="userUpdateUpload">
                            <img src={user.img} 
                                 alt="" 
                                 className="userUpdateImg" />
                            <label htmlFor="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }}  onChange={(e) => setFile(e.target.files[0])}/>
            </div>
                        <button className="userUpdateButton" onClick={handleClick}>Update</button>
                    </div>
                </form> 
            </div>
        </div>
    </div>
    <Footer />
      </Container>
  )
}