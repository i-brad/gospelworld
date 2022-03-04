import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyD4-0T0zaStEjt104Q_e0xgtieobR4Sz2M",
	authDomain: "gospelworld-e7ad5.firebaseapp.com",
	projectId: "gospelworld-e7ad5",
	storageBucket: "gospelworld-e7ad5.appspot.com",
	messagingSenderId: "287174329679",
	appId: "1:287174329679:web:57e2610a44da2c276ff13a",
	measurementId: "G-C86SBQHC26",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
