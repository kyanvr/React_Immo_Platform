const PageHeader = ({ children }) => {
    return (
        <div className="d-flex justify-content-between align-items-center mt-4 mb-2">
            {children}
        </div>
    );
};

export default PageHeader;
