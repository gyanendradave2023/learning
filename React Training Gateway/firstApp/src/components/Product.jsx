import Counter from "./Counter";

const Product = ({name, quantity}) => {
    return (
        <div className="productItem" >
            <span>{name}</span>          
            <Counter initialCount={quantity}/>
        </div>
    );
};

export default Product;