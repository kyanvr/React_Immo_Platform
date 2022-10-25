import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Button = ({
    children,
    onClick,
    color = "primary",
    type = "button",
    size = "md",
    disabled = false,
    href,
}) => {
    const props = {
        className: `btn btn-${color} btn-${size}`,
        disabled: disabled,
    };
    if (href) {
        return (
            <Link to={href} {...props}>
                {children}
            </Link>
        );
    } else {
        return (
            <button type={type} onClick={onClick} {...props}>
                {children}
            </button>
        );
    }
};

Button.propTypes = {
    onClick: PropTypes.func,
    href: PropTypes.string,
    type: PropTypes.oneOf(["button", "reset", "submit"]),
    disabled: PropTypes.bool,
    size: PropTypes.oneOf(["sm", "lg", "md"]),
    color: PropTypes.oneOf([
        "primary",
        "secondary",
        "light",
        "outline-light",
        "outline-primary",
        "outline-secondary",
        "danger",
    ]),
};

export default Button;
