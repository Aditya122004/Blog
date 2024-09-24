import { createContext } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth,db,storage } from '../firebase/FirebaseConfig'
import  { collection, addDoc,getDocs,query,where,doc,deleteDoc,getDoc,updateDoc } from "firebase/firestore"; 
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useState,useEffect } from "react";

export const FirebaseContext = createContext();
// eslint-disable-next-line react/prop-types
export const FirebasecontextProvider = ({ children }) => {
  const SignUp = async (email, password) => {
    try {
      const usercred=await createUserWithEmailAndPassword(auth, email, password)
      return usercred.user
    } catch (error) {
      console.log(error.message)
      throw error
    }
  }

  const LogIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      console.log(error.message)
      throw error
    }
  }

  const SignOut = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.log(error.message)
      throw error
    }
  }
  const AddUserName=async(name,id)=>{
    try {
      const docRef = await addDoc(collection(db, "Users"), {
        Name:name,
        id:id
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  const [user, setUser] = useState(null)
  const GetUserName=async(uid)=>{
    try{
      const nameref = collection(db, "Users");
      const q = query(nameref, where("id", "==", uid));
      const querySnapshot = await getDocs(q);
      const doc = querySnapshot.docs[0];
      return doc.data().Name;
    }catch(e){
      console.log("Error in retreiving username",{e})
    }
  }
  const AddBlog=async(title,content,username,time,id,imgID)=>{
    try {
      const docRef = await addDoc(collection(db, "Blog"), {
        user:username,
        title,
        date:time,
        content,
        id,
        imageUrl:imgID
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  const GetBlog=async(id)=>{
    try{
      const docRef = doc(db, "Blog", id);
      const docSnap = await getDoc(docRef);
      return docSnap.data()
    }catch(e){
      console.log("Error in fetching blog",e)
    }
  }
  const GetBlogs=async()=>{
    try{
      const q = query(collection(db, "Blog"));
      const querySnapshot = await getDocs(q);
      return querySnapshot
    }catch(e){
      console.log("Error in Fetching data from Firestore",e)
    }
  }
  const GetUserBlogs=async()=>{
    try{
      const q = query(collection(db, "Blog"),where("id","==",user.uid));
      const querySnapshot = await getDocs(q);
      return querySnapshot
    }catch(e){
      console.log("Error in Fetching data from Firestore",e)
    }
  }
  const UpdateBlog=async(title,content,bid,imgid)=>{
    try{
      const washingtonRef = doc(db, "Blog", bid);
      await updateDoc(washingtonRef, {
        title,
        content,
        imageUrl:imgid
});
    }catch(e){
      console.log("Error in Updation",e)
    }
  }
  const DeleteBlog=async(id)=>{
    try{
      await deleteDoc(doc(db, "Blog", id));
      console.log(id ,"Deleted successfully")
    }catch(e){
      console.log("Error in deletion",e)
    }
  }
  const UploadImage =async(file)=>{
      try {
        const storageRef = ref(storage, 'images/' + file.name);
        await uploadBytes(storageRef, file);
        console.log('Uploaded a blob or file!');
        const downloadURL = await getDownloadURL(storageRef);
        console.log('File available at', downloadURL);
        return downloadURL;
      } catch (error) {
        console.error("Error uploading image: ", error)
      }
}
  

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user)
    })
    return () => unsubscribe()
  }, [])

  return (
    <FirebaseContext.Provider value={{ SignUp, LogIn, SignOut,AddUserName,user,GetUserName,
    AddBlog,GetBlogs,GetUserBlogs,DeleteBlog,GetBlog,UpdateBlog,UploadImage }}>
      {children}
    </FirebaseContext.Provider>
  )
}