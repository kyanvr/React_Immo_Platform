import "./Hero.css";
import heroImage from "../../../assets/image1.jpg";
import PropTypes from "prop-types";

const Hero = ({ quote, children }) => {
    return (
        <div className="overflow-hidden mb-5">
            <div className="container-fluid col-xxl-8 mb-5">
                <div className="row flex-lg-nowrap align-items-center g-5">
                    <div className="order-lg-1 w-100">
                        <img
                            src={heroImage}
                            className="d-block mx-lg-auto img-fluid hero-image"
                            alt="hero"
                            loading="lazy"
                            width="2160"
                            height="768"
                        />
                    </div>
                    <div className="col-lg-6 col-xl-5 text-center text-lg-start pt-lg-5 mt-xl-4">
                        <div className="lc-block mb-5">
                            <div editable="rich">
                                <p className="rfs-8 lead">{quote}</p>
                            </div>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

Hero.propTypes = {
    quote: PropTypes.string,
};

export default Hero;
