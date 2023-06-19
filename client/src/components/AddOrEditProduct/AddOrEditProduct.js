import React from 'react'
import "./AddOrEditProduct.css"
import { GET_OR_DELETE_OR_EDIT_PRODUCT_BY_ID } from '../../constants/api'

const AddOrEditProduct = ({ edit, id, title, fetchProducts }) => {

    return (
        <div className="editDiv hide" style={edit ? { backgroundColor: "#ffa372" } : { backgroundColor: "#9befd7" }}>
            <p className='pEdit'>{edit ? "You can edit any and all of the following fields for product" : "To add a new product, please fill ALL the following fields"}</p>
            {edit && <p className='pEdit'>{title}</p>}
            <div className="inputFields">
                {!edit && <div className="inputDiv" >
                    <label>Title:</label>
                    <input type="text" className='editTitle' placeholder="Example: Teddy Bear" required />
                </div>}
                {!edit && <div className="inputDiv">
                    <label>Category:</label>
                    <input type="text" className='editCategory' placeholder="Example: Toys" required />
                </div>}
                <div className="inputDiv">
                    <label>Description:</label>
                    <input type="text" className='editDescription' placeholder="Example: A soft, light-brown teddy bear" required={!edit} />
                </div>
                <div className="inputDiv">
                    <label>Price:</label>
                    <input type="number" className='editPrice' placeholder="Example: 100" required={!edit} />
                </div>
                <div className="inputDiv">
                    <label>Image URL:</label>
                    <input type="text" className='editImageUrl' placeholder="Example: https://m.media-amazon.com/images/I/71qtAiNUCpL.jpg" required={!edit} />
                </div>
            </div>
            <div className='buttons'>
                <button onClick={async () => {
                    const data = {}
                    const inputTitle = document.querySelector('.editTitle');
                    const inputCategory = document.querySelector('.editCategory');
                    const inputDescription = document.querySelector('.editDescription');
                    const inputPrice = document.querySelector('.editPrice');
                    const inputImageUrl = document.querySelector('.editImageUrl');
                    if (inputTitle && inputTitle.value !== "") {
                        data["title"] = inputTitle.value;
                    }
                    if (inputCategory && inputCategory.value !== "") {
                        data["category"] = inputCategory.value;
                    }
                    if (inputDescription.value !== "") {
                        data["description"] = inputDescription.value;
                    }
                    if (inputPrice.value !== "") {
                        data["price"] = inputPrice.value;
                    }
                    if (inputImageUrl.value !== "") {
                        data["image"] = inputImageUrl.value;
                    }
                    if (Object.keys(data).length > 0) {
                        console.log(`data to ${edit ? "edit" : "add"}: `, data);
                        const response = await fetch(GET_OR_DELETE_OR_EDIT_PRODUCT_BY_ID + (edit ? `${id}` : ""), {
                            method: edit ? "PUT" : "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(data), // body data type must match "Content-Type" header
                        });
                        const responseData = await response.json();
                        console.log("responseData: ", responseData);
                        fetchProducts();
                    }
                    document.querySelector(".editDiv").classList.add("hide");
                    if (inputTitle) {
                        inputTitle.value = "";
                    }
                    if (inputCategory) {
                        inputCategory.value = "";
                    }
                    inputDescription.value = "";
                    inputPrice.value = "";
                    inputImageUrl.value = "";
                }}>{edit ? "Apply changes" : "Add product"}</button>
                <button onClick={() => {
                    document.querySelector(".editDiv").classList.add("hide");
                }}>
                    Discard and close
                </button>
            </div>
        </div >
    )
}

export default AddOrEditProduct