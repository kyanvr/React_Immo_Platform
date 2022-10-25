import PropTypes from "prop-types";
import "./Card.css";

const Card = ({ image, type, price, action }) => {
    return (
        <div
            className="card"
            style={{ width: "18rem", height: "350px", marginBottom: "2rem" }}>
            <img src={image} className="card-img-top" alt="house" />
            <div className="card-body">
                <h5 className="card-title">
                    {type} | {action}
                </h5>
                <p className="card-text">{price}</p>
            </div>
        </div>
    );
};

Card.propTypes = {
    image: PropTypes.string,
    type: PropTypes.string.isRequired,
    price: PropTypes.string,
    action: PropTypes.string,
};

export default Card;
