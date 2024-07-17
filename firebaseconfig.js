import { initializeApp } from 'firebase/app';
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import CryptoJS from 'crypto-js';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDoDYSQaRSrjWG7Oz_S0nuSbXgd0_4RwtI",
    authDomain: "desafio-c2903.firebaseapp.com",
    projectId: "desafio-c2903",
    storageBucket: "desafio-c2903.appspot.com",
    messagingSenderId: "149603066064",
    appId: "1:149603066064:web:78bbe32bb3b4dc304efed5"
};


const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);


const hashPassword = (password) => {
    const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    return hashedPassword;
};


const addUserToFirestore = async (email, password) => {
    try {

        const hashedPassword = hashPassword(password);


        const docRef = await addDoc(collection(firestore, 'users'), {
            email: email,
            password: hashedPassword,
        });
      //  console.log('Documento adicionado com ID:', docRef.id);
      
    } catch (error) {
        console.error('Erro ao adicionar usuário: ', error);
    }
};


//addUserToFirestore('teste2@teste.com', '12345abc');
export { firestore }; 