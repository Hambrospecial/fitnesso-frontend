import React, { useCallback, useEffect, useState } from "react";
// import "./Favorites.css";
import ReactPaginate from "react-paginate";

const AllProduct = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoaing] = useState(false);
    const [offset, setOffset] = useState(0);
    const [total, setTotal] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [pageLimit] = useState(5);
    const [pageNumber, setPageNumber] = useState(1);

    const productUrl = "https://fitnesso-app-new.herokuapp.com/product/viewproducts/"
    console.log(pageNumber);

  
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(productUrl + `${pageNumber}`)
            const faveData = await response.json();
            console.log("Products from the DB : " + faveData)
            setTotal(faveData.totalElements);
            setPageCount(Math.ceil(faveData.totalPages));
            setProducts(faveData.content)
            setIsLoaing(true);
        }
      fetchData();
    }, [pageNumber, pageLimit]);
  
    const handlePageClick = (e) => {
      const selectedPage = e.selected; 

      console.log(selectedPage)
      setPageNumber(pageCount != selectedPage +1 ? selectedPage + 1 : selectedPage) ;
      console.log(pageNumber);
    }
  
    return (
      <div>
        <div className="fave-container">
          <div></div>
          <header className="db-component-header">
            <h1>All Products ({total}) </h1>
          </header>
          {isLoading ? (
            <div className="faves-container">
              {products.map((data, key) => {
                return (
                  <div className="fave-holder">
                    <div className="fave-details" key={key}>
                      
                      <img src={`${data.image}`} alt="Image loading" />
                      <div className="fave-info">
                        <h5>Product Name: {`${data.productName}`}</h5>
                        <p>Category: {`${data.category}`.toUpperCase()}</p>
                        <p>Description: {`${data.description}`}</p>
                        <p>Product Cost: {`$${data.price}`}</p>
                        {/* <p>Description: {`${data.description}`}</p> */}
                      </div>
                      <div className="fave-to-cart">
                        <div className="fave-btn">
                          <a href="#">To Cart</a>
                        </div>
                        <div className="btn-rmv-fave">
                          <i className="fa-thin fa-trash-can"></i>
                          <a href="#">Remove</a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>Pending...</div>
          )}
        </div>
        <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}/>
      </div>
    );
}
export default AllProduct;
