
var el = document.getElementById("login-avatar");
fetch("auth/me")
  .then((res) =>
    res.json().then((res) => {
      res.passport ? setLogin(res.passport.user.name.givenName) : null;
    })
  )
  .catch((err) => console.log(err));

const setLogin = (name) => {
  let el = document.getElementById("login");
  el.firstElementChild.innerHTML = `Welcome, ${name}!`;
  el.firstElementChild.setAttribute("href", "profile")
};
