// db.js – replaces the BSD database ($BSD.db) using Firebase Firestore
const firebaseConfig = {
    apiKey: "AIzaSyBYFJyyI8QGrBtFa6m-cufwgMaYnlclwwk",
    authDomain: "ecommerce-7c479.firebaseapp.com",
    projectId: "ecommerce-7c479",
    storageBucket: "ecommerce-7c479.firebasestorage.app",
    messagingSenderId: "902531355020",
    appId: "1:902531355020:web:e046b3cd02bbeb748a06a9"
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

const $BSD = {
    db: {
        open: async function (dbName) {
            const collection = firestore.collection(dbName);
            return {
                set: function (key, value) {
                    return collection.doc(key).set({ value: value });
                },
                get: function (key) {
                    return collection.doc(key).get().then(function (doc) {
                        return doc.exists ? doc.data().value : null;
                    });
                },
                listKeys: function (prefix) {
                    return collection.get().then(function (snapshot) {
                        let keys = [];
                        snapshot.forEach(function (doc) {
                            if (doc.id.startsWith(prefix)) keys.push(doc.id);
                        });
                        return keys;
                    });
                }
            };
        }
    }
};
