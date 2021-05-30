import { useParams } from "react-router-dom";
import { useProducts } from "../../contexts";
import "./Products.css";
import { addToCart, addToWishlist } from "../../api/index";
import { CardRating, CardPrice, ButtonCart } from "../../components/index";
import { Link } from "react-router-dom";

export default function ProductDetail() {
  const { productId } = useParams();
  const {
    products: { productList },
  } = useProducts();
  const product = productList.find((product) => product._id === productId);
  return (
    product && (
      <div className="Product-Detail page-layout">
        <div className="product__detail flex--column">
          <Link to="/products" class="btn btn--icon--left btn--secondary">
            <span class="btn__icon fa--xs">
              <i class="fas fa-chevron-left"></i>
            </span>
            <p class="btn__text">Go Back</p>
          </Link>
          <section className="product__detail__1 flex--row">
            <img className="detail__image" src={product.bookCoverURL} />
            <div className="flex--column">
              <h1 className="product__title title--sm  title">{`${product.name}`}</h1>
              <p className="text--sm text">{`By ${product.author}`}</p>
              <CardRating rating={product.rating} />
              <CardPrice price={product.price} />
              <div className="detail__icon-features flex--row">
                <div>
                  <span class="fa--sm fa--primary">
                    <i class="fas fa-undo"></i>
                  </span>
                  <p className="text--muted">7 Day Replacement policy</p>
                </div>
                <div>
                  <span class="fa--sm fa--primary">
                    <i class="fas fa-hand-holding-usd"></i>
                  </span>
                  <p className="text--muted">Save with Exciting Offers!</p>
                </div>
                <div>
                  <span class="fa--sm fa--primary">
                    <i class="fas fa-shipping-fast"></i>
                  </span>
                  <p className="text--muted">Fast Delivery</p>
                </div>
                <div>
                  <span class="fa--sm fa--primary">
                    <i class="fas fa-gifts"></i>
                  </span>
                  <p className="text--muted">Win Prizes</p>
                </div>
              </div>
              <ButtonCart productId={product._id} clickHandler={addToCart} />
            </div>
          </section>
          <section className="product__detail__2">
            <div className="detail__specs">
              <h3 className="title--xs">Specifications</h3>
              <div className="detail__specs__table">
                <div>
                  <h4 className="text--muted">Author</h4>
                  <span>{product.author}</span>
                </div>
                <div>
                  <h4 className="text--muted">Language</h4>
                  <span>{product.specs.language}</span>
                </div>
                <div>
                  <h4 className="text--muted">Genre</h4>
                  <span>{product.specs.genre}</span>
                </div>
                <div>
                  <h4 className="text--muted">Publisher</h4>
                  <span>{product.publication.publisher}</span>
                </div>
                <div>
                  <h4 className="text--muted">Pages</h4>
                  <span>{product.specs.pages}</span>
                </div>
                <div>
                  <h4 className="text--muted">Format</h4>
                  <span>{product.specs.format}</span>
                </div>
                <div>
                  <h4 className="text--muted">Weight</h4>
                  <span>{`${product.specs.weight.value} ${product.specs.weight.unit}`}</span>
                </div>
                <div>
                  <h4 className="text--muted">ISBN_13</h4>
                  <span>{product.specs.isbn_13}</span>
                </div>
                <div>
                  <h4 className="text--muted">Dimensions</h4>
                  <span>{`${product.specs.dimensions.width} x ${product.specs.dimensions.height} x ${product.specs.dimensions.length} (${product.specs.dimensions.unit}) `}</span>
                </div>
              </div>
            </div>
          </section>
          <section>
            <details className="detail__description">
              <summary>Summary</summary>
              <p className="text--muted">{product.description}</p>
            </details>
          </section>
        </div>
      </div>
    )
  );
}
