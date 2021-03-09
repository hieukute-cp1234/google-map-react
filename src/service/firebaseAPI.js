import firebase from '../firebase/config'

const fetchData = async()=>{
  const db = firebase.firestore();
  const data = await db.collection('Farm').get();
  const resultData = data.docs.map(doc => ({...doc.data(),id:doc.id}));
  return resultData;
}

const Email = ()=>{
  let userEmail = firebase.auth().currentUser;
  console.log(userEmail.email)
  return userEmail.email;
}

export default {fetchData,Email}