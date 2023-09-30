import axios from "../api/axios";

class AuthService {
  login(email, pwd) {
    return axios
    .post(
      "/login",
      {
        email : email,
        password : pwd,
      },
      {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    ).then((response) => {
        if (response.data.acces_token) {
          localStorage.setItem("user", JSON.stringify(response.data));
          return response.data;
        }});
  }

  register(name, email, phone, pwd) {
    return axios
    .post(
      "/register",
      {
        name: name,
        email: email,
        contact: phone,
        password: pwd,
      },
      {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    ).then(response => {
      return response.data;
    })
  }
}

export default new AuthService();