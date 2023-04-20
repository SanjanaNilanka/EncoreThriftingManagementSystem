import React, { Component } from 'react';
import axios from 'axios';
import '../stock.css'
import {useParams} from 'react-router-dom'

export default function EditItem() {
    const {id} = useParams()
  return (
    <div>
        {id}
      <EditItemBody id = {id}/>
    </div>
  )
}

class EditItemBody extends Component {

    constructor(props){
        super(props);
        this.state={
            pId:"IT1005",
            pName:"",
            pCategory:"",
            pQuantity:"",
            pPrice:"",
            pImageURL:"",
            pDescription:"",
            id:props.id,
        }
    }

    handleInputChange=(e)=>{
        const {name,value} = e.target;

        this.setState({
            ...this.state,
            [name]:value
        })
    }

    onSubmit=(e)=>{
         

        e.preventDefault();

        const{pId,pName,pCategory,pQuantity,pPrice,pPlacedDate,pImageURL,pDescription}=this.state;

        
        const data ={
            pId: pId,
            pName:pName,
            pCategory:pCategory,
            pQuantity:pQuantity,
            pPrice:pPrice,
            pPlacedDate:pPlacedDate,
            pImageURL:pImageURL,
            pDescription:pDescription,
        }

        console.log(data)

        axios.put(`http://localhost:8000/subcategory/update/${this.state.id}`,data).then((res)=>{
            if(res.data.success){
                alert("Post Updated")
                this.setState(
                    {
                        pId:"",
                        pName:"",
                        pCategory:"",
                        pQuantity:"",
                        pPrice:"",
                        pPlacedDate:"",
                        pImageURL:"",
                        pDescription:""
                    }
                )
            }
        })

    }

    componentDidMount(){
        
        axios.get(`http://localhost:8000/subcategory/get/${this.state.id}`).then(res=>{
            if(res.data.success){
                this.setState({

                    specificItemView:res.data.existingDetails
                });
                console.log(this.state.specificItemView)
            }
        });
    }
    render() {
        
        return (
            <div className='stock'>
                <div style={{marginTop:"80px"}}>
                <div className='head-add-item'> 
                  <h2>Add Item</h2>
                  <div className='back-buttn-item-view'>
                  <a href={`/stock/sub-category`}><button className='btn-back'><i class="fa-solid fa-arrow-left"></i> Back</button></a>
                  
                  </div>

                </div>
                  <form className='form-in'>
                  <div className='inline-form' >
                    <div style={{width:"100%"}}> 
                      <label>Edit Product Name:</label>
                      <input type='text' className='form-input' name='pName' placeholder='Enter Name' value={this.state.pName} onChange={this.handleInputChange}/><br/>
                      <label>Edit Category:</label>
                      <select className='form-select' name='pCategory' value={this.state.pCategory} onChange={this.handleInputChange}>
                        <option>Select One</option>
                        <option>Electronics</option>
                        <option>Books</option>
                        <option>Clothes</option>
                      </select><br/>
                      <label>Edit Product Quantity:</label>
                      <input type='number' className='form-input' name='pQuantity' placeholder='0' value={this.state.pQuantity} onChange={this.handleInputChange}/><br/>
                      <label>Edit Unit Price:</label>
                      <input type='number' className='form-input' name='pPrice' placeholder='0' value={this.state.pPrice} onChange={this.handleInputChange}/><br/>
                      <label>Edit Date:</label><br/>
                      <input type='date' className='form-input' name='pPlacedDate' placeholder='' value={this.state.pPlacedDate} onChange={this.handleInputChange}/><br/>
                      <label>Edit Product Image URL:</label>
                      <input type='text' className='form-input' name='pImageURL' placeholder='http://www.abc.com' value={this.state.pImageURL} onChange={this.handleInputChange}/><br/>
                      <label>Edit Product Description:</label><br></br>
                      <textarea className='form-input' rows={8} cols={34} type="text" name='pDescription' placeholder='Enter Item Details' value={this.state.pDescription} onChange={this.handleInputChange}></textarea>
                      <div className='buttn-success-1'>
                      <button className="btn btn-success" type='submit' style={{marginTop:"15px"}} onClick={this.onSubmit}><i class="fa-regular fa-square-check" style={{marginRight:"10px"}}></i>Save</button>
                      </div>
                      
                    </div>
                    
                  </div>
                  
                  </form>
                </div>
      </div>
        );
    }
}

