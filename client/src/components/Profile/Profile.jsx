import Axios from 'axios'
import React, {useState} from 'react'
import {domain} from '../../env'
import {useGlobalState} from '../../state/provider'
import styles from './Profile.module.css'

const Profile = () => {
    const [{profile}, dispatch] = useGlobalState()
    const [image, setImage] = useState(null)
    const [firstname, setFirstname] = useState(profile?.user.first_name)
    const [lastname, setLastname] = useState(profile?.user.last_name)
    const [email, setEmail] = useState(profile?.user.email)

    const uploadImage = async () => {
        const form_data = new FormData()
        form_data.append('image', image)
        Axios({
            method: "post",
            url: `${domain}/api/updateprofile/`,
            headers: {
                Authorization: `token ${window.localStorage.getItem('token')}`
            },
            data: form_data
        }).then(response => {
            dispatch({
                type: "ADD_RELOAD_PAGE_DATA",
                reloadPage: response.data
            })
            alert(response.data["message"])
        })

    }
    const updateData = async () => {
        Axios({
            method: "post",
            url: `${domain}/api/updateuser/`,
            headers: {
                Authorization: `token ${window.localStorage.getItem('token')}`
            },
            data: {
                "first_name": firstname,
                "last_name": lastname,
                "email": email
            }
        }).then(response => {
            dispatch({
                type: "ADD_RELOAD_PAGE_DATA",
                reloadPage: response.data
            })
            alert(response.data["message"])
        })

    }

    return (
        <div className="container">
            <div className="row m-5 no-gutters shadow-lg">
                <div className="col-md-4 bg-white p-5">
                    <div className={`card ${styles.profileCard3}`}>
                        <div className={styles.backgroundBlock}>
                            <img
                                src="https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                                alt="profile-sample1" className={styles.background}/>
                        </div>
                        <div className="profile-thumb-block">
                            <img src={`${domain}${profile?.image}`} alt="profile"
                                 className={styles.profile}/>
                        </div>
                        <div className={styles.cardContent}>
                            <h2>{profile?.user.first_name + " "} {profile?.user.last_name}
                                <small>{profile?.user.username.toUpperCase()}</small></h2>
                            <h3 className="text-secondary ">{profile?.user.email}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-8 bg-white p-5">
                    <form method="POST" encType="multipart/form-data">
                        <fieldset className="form-group">
                            <legend className="border-bottom mb-4">Profile Update</legend>
                            <div className="form-group">
                                <label>Upload Profile Picture</label>
                                <div className="row">
                                    <div className="col">
                                        <input onChange={(e) => setImage(e.target.files[0])} type="file"
                                               className="form-control"/>
                                    </div>
                                    <div className="col">
                                        <p onClick={uploadImage} className="btn btn-info">Upload</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row form-group pb-3">
                                <div className="col">
                                    <label>First Name</label>
                                    <input type="text" className="form-control"
                                           onChange={(e) => setFirstname(e.target.value)}
                                           value={firstname}/>
                                </div>
                                <div className="col">
                                    <label>Last Name</label>
                                    <input type="text" className="form-control"
                                           onChange={(e) => setLastname(e.target.value)}
                                           value={lastname}/>
                                </div>
                            </div>
                            <div className="form-group pb-3">
                                <label>Email</label>
                                <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)}
                                       value={email}/>
                            </div>
                        </fieldset>
                        <div className="form-group pb-3">
                            <p className="btn btn-outline-danger" onClick={updateData}>Update</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Profile