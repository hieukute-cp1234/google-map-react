import firebase from '../../firebase/config'

let userEmail = firebase.auth().currentUser;
if(userEmail){
  console.log(userEmail.email);
}else {
  console.log('not user')
}

export const checkLogin = () =>{
  if(userEmail){
    return true;
  }
}

export const CheckUser = (email, password) => {

  const user = firebase.auth()
    .signInWithEmailAndPassword(email, password)
    .then(function () {
      console.log('đăng nhập thành công!');
      return true;
    })
    .catch(function (error) {
      if (error) {
        console.log(error.code, 'Email hoặc PassWord không hợp lệ!');
        return false;
      }
    })
  return user;
}