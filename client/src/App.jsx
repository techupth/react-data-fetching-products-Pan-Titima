import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {

  const [loadingStatus, setLoadingStatus] = useState(null);
  const[productData, setProductData] = useState([]);

  useEffect(() => {getProductData();},[]);


  const getProductData = async () => {
    try{
      setLoadingStatus("loading");
      const response = await axios.get("http://localhost:4001/products");
      setProductData(response.data.data);
      setLoadingStatus("completed");
    } catch {
      setLoadingStatus("error");
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4001/products/${id}`)
      const newResponse = productData.filter((item) => { return item.id !== id})
      setProductData(newResponse);
    } catch {
      setLoadingStatus("failed");
    }
  }
  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      {loadingStatus === "loading" && <h1>Loading...</h1>}
      {loadingStatus === "error" && <h1>Page Not Found...</h1>}
      {loadingStatus === "failed" && <h1>Fail to load data...</h1>}
      {loadingStatus === "completed" &&
         productData.length &&
      
        productData.map((item)=>{ return (
      <div className="product-list"  key={item.id}>      
        <div className="product">
          <div className="product-preview">
            <img
              src={item.image}
              alt="some product"
              width="350"
              height="350"
            />
          </div>
          <div className="product-detail">
            <h1>Product name: {item.name}</h1>
            <h2>Product price: {item.price} Baht</h2>
            <p>Product description: {item.description}</p>
          </div>

          <button className="delete-button" onClick={() => handleDelete(item.id)}>x</button>
        </div>         
      </div> )
    })}
    {loadingStatus === "completed" && !productData.length && (
        <h1>No Product!</h1>
    )}
    </div>
  );
}


export default App;
