import React,{useState} from "react";
import "./App.css";

const PRODUCTS = [
  {id:1,name:"Laptop",price:500},
  {id:2,name:"Smartphone",price:300},
  {id:3,name:"Headphones",price:100},
  {id:4,name:"Smartwatch",price:150}
];

const FREE_GIFT={id:99,name:"Wireless Mouse",price:0};
const THRESHOLD = 1000;

const App =()=>{
  const [cart,setCart]=useState([])
  const addToCart =(product)=>{
    setCart((prevCart)=>{
      const existingItem = prevCart.find((item)=>item.id===product.id);
      let updatedCart;
      if(existingItem){
        updatedCart=prevCart.map((item)=>
        item.id===product.id ? {...item,quantity:item.quantity+1}:item)
      }
      else{
        updatedCart=[...prevCart,{...product,quantity:1}]
      }
      return updateCart(updatedCart);
    })
   
  }
  const incrementQuantity = (id) => {
    setCart((prevCart)=>{
      const updatedCart = prevCart.map((item)=>
      item.id===id ? {...item,quantity:item.quantity+1}:item
    )
    return updateCart(updatedCart)
    });
  };
  const decrementQuantity = (id) => {
    setCart((prevCart)=>{
      const updatedCart = prevCart.map((item)=>
      item.id===id ? {...item,quantity:item.quantity-1}:item
    ).filter((item)=>item.quantity>0);
    return updateCart(updatedCart)
    });
  };
  const updateCart = (updatedCart)=>{
    const subtotal = updatedCart.reduce((total,item)=>total+item.price*item.quantity,0)
    if(subtotal>=THRESHOLD){
      if(!updatedCart.find((item)=>item.id===FREE_GIFT.id)){
        updatedCart.push({...FREE_GIFT,quantity:1});
      }
    }
    else{
      updatedCart = updatedCart.filter((item)=>item.id!==FREE_GIFT.id)
    }
    return updatedCart
  };
  const subtotal = cart.reduce((total,item)=>total+item.price*item.quantity,0);
return (
  <div className="container">
    <h2>Shopping Cart</h2>
      <div className="products">
           {PRODUCTS.map((product)=>(
            <div key={product.id} className="product-card">
              <h3>{product.name}</h3>
              <p>{product.price}</p>
              <button onClick={()=>addToCart(product)}>Add to Cart</button>
            </div>
           ))}
      </div>
      <div className="cart-summary">
         <h3>Cart Summary</h3>
         <div className="summary-box">
              <p className="subtotal">
                <strong>subtotal</strong> ${subtotal}
              </p>
              <hr/>
              {subtotal>=THRESHOLD ? (
                <p className="free-gift-msg">You got a free Wireless Mouse!</p>
              ):(<div className="progress-box">
                   <p>Add $ {THRESHOLD-subtotal} more to get a Free Wireless Mouse!</p>
                   <div className="progress-bar">
                       <div className="progress-fill" style={{width:`${(subtotal/THRESHOLD)*100}%`}}>
                      </div>
                  </div>
                </div>
              )}
         </div>
      </div>
      <div className="cart-items">
      <h1>Cart Items</h1>
      {cart.map((item)=>(
        <div key={item.id} className="cart-item">
          <div>
             <p>
              <strong>{item.name}</strong>
             </p>
             <p>{item.price} x {item.quantity} = {item.price*item.quantity}</p>
          </div>
          {item.id===FREE_GIFT.id ? (
            <span className="free-gift-tag">FREE GIFT</span>
          ):(
            <div className="quantity-controls">
              <button onClick={()=>decrementQuantity(item.id)} className="decrease">
                -
              </button>
              <span>{item.quantity}</span>
              <button onClick={()=>incrementQuantity(item.id)} className="increase">
                +
              </button>
            </div> 
          )}
        </div>
      ))}
      </div>
  </div>
)
};

export default App;