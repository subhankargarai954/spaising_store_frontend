export default function ProductCard({ product, onAddToCart }) {
    return (
        <div className="card">
            <h3>{product.name}</h3>
            <img src={product.image_url} alt={product.name} width={100} />
            <p>{product.description}</p>
            <p>
                <b>₹{product.price}</b>
            </p>
            <button onClick={() => onAddToCart(product)}>Add to Cart</button>
        </div>
    );
}
