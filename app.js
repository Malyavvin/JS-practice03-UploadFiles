import { uploud } from "./upload";
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"


const firebaseConfig = {
    apiKey: "AIzaSyBs9eFgP_HjWWGLjUSvD-waHZdGXDAGxQo",
    authDomain: "js-test2-97e2c.firebaseapp.com",
    projectId: "js-test2-97e2c",
    storageBucket: "js-test2-97e2c.appspot.com",
    messagingSenderId: "460465967040",
    appId: "1:460465967040:web:58b149ab5dcb3935fe4225"
}
const app = initializeApp(firebaseConfig)
const storage = getStorage(app)


uploud('#file', {
    multi: true,
    accept : ['.jpg','.png','.jpeg','.gif'],

    onUpload(files, blocks){
        files.forEach((file,index) => {
            const storageRef = ref(storage, `images/${file.name}`);
            
            const uploadTask = uploadBytesResumable(storageRef, file);
            
            uploadTask.on('state_changed', 
              (snapshot) => {
                const progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0) + '%'
                const block = blocks[index].querySelector('.preview-info-progress')
                block.textContent = progress
                block.style.width = progress
              }, 
              (error) => {
                console.log('Error:', error)
              }, 
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  console.log('File available at', downloadURL);
                });
              })            
        })
    }
})
