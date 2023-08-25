const app = firebase.initializeApp(firebaseConfig);
console.log(app);
// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = firebase.storage();

// Create a storage reference from our storage service
const storageRef = storage.ref();
// initialize  database
const database = firebase.database();
const addProduct = () => {
    let fileInput = document.getElementById('file').value;
    let file = fileInput.files[0];
    uploadFile(file);

}
const uploadFile = (file) => {
    let product = {
        productName: document.getElementById('itemName').value,
        productDscrptn: document.getElementById('itemDcp').value,
        productUnit: document.getElementById('itemQuantity').value,
        productPrice: document.getElementById('itemPrice').value,
        productImage:''
    }
    if (file) {
        const uploadFolder = storageRef.child('uploaded_Images');
        const imageRef = uploadFolder.child(file.name);
        imageRef.put(file).then((snapshot) => {
            console.log("file uploaded succesfully")

        })
        imageRef.getDownloadURL().then((url)=>{
            console.log("download URL of Product :",url);
            product.productImage=url;
            console.log(product)
        } )
    }

}
