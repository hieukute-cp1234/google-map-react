//lay du lieu r chia cho cac componet  khac sung dung
import firebase from '../firebase/config'

const fetchData = async () => {
  const db = firebase.firestore();
  const data = await db.collection('Farm').get();
  const resultData = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
  return resultData;
}

const email = () => {
  let userEmail = firebase.auth().currentUser;
  if (userEmail != null && userEmail != undefined) {
    return true
  } else {
    return false
  }
}

export default { fetchData, email }