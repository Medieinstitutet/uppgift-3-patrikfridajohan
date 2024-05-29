import "../styles/createNewsletter.css";

export const CreateNewsletter = () => {
    return (
        <div className="create-newsletter-container">
            <h2>Create Newsletter</h2>
            <form className="create-newsletter-form">
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" placeholder="Enter newsletter title" />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select id="category">
                        <option value="" disabled selected>Select a category</option>
                        <option value="Standard">Standard</option>
                        <option value="Plus">Plus</option>
                        <option value="Exclusive">Exclusive</option>
                        
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="shortinfo">Short Info</label>
                    <input type="text" id="shortinfo" placeholder="Enter short info" />
                </div>
                <div className="form-group">
                    <label htmlFor="longinfo">Long Info</label>
                    <textarea id="longinfo" placeholder="Enter detailed information"></textarea>
                </div>
                <button type="submit">Create Newsletter</button>
            </form>
        </div>
    );
};
