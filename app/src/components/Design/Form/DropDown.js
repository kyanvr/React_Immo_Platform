const DropDown = () => {
    return (
        <select className="rounded">
            <option className="dropdown-item" value="for-sale">
                For sale
            </option>
            <option value="to-rent">To rent</option>
        </select>
    );
};

export default DropDown;
