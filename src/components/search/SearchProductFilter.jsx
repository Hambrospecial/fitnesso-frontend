import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Search.css";


function SearchProductFilter() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      const response = await axios.get("https://fitnesso-app-new.herokuapp.com/product/viewproducts");
      setPosts(response.data);
      console.log(response.data);
      setLoading(false);
    };
    
    loadPosts();
  }, []);
  return (
    <div className="search">
      <input className="search__input"
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearchTitle(e.target.value)}
      />
      {loading ? (
        <h4>loading...</h4>
      ) : (
        
           <div className="search__row">
     
          { 
            posts.filter((value) => {
              if (searchTitle === "") {
                return 
              } else if (value.productName.toUpperCase().includes(searchTitle.toUpperCase()) 
              || value.category.toUpperCase().includes(searchTitle.toUpperCase()) 
              || value.description.toUpperCase().includes(searchTitle.toUpperCase())) {
                return value;
              }
            })
            .map((item) => (
              <div key={item.id} className="search__box">
                <a className="search__container" href={`/product/viewproduct/${item.id}`}>
                  <span className="search__image">
                     {/* <img src={"https://images.unsplash.com/photo-1553979459-d2229ba7433b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=768&q=80"} alt="" />  */}
                    {item.image}
                  </span>
                  <span className="search__name">{item.productName}</span>
                  <span className="search__description">{item.description}</span>
                  <span className="search__price">??? {item.price}</span>
                </a>
              </div>
            )) 
            }
        </div> 

      )
      }
    </div>
  );
}
export default SearchProductFilter;
