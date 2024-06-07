import "../styles/createNewsletter.css";
import { useState, FormEvent } from 'react';
import { createNewsArticle } from '../services/authService';
import { useNavigate } from 'react-router-dom';

export const CreateNewsarticle = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState<string>('');
    const [subscriptionid, setCategory] = useState<number>('1');
    const [shortInfo, setShortInfo] = useState<string>('');
    const [longInfo, setLongInfo] = useState<string>('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            // Call the createNewsArticle function with the form data
            await createNewsArticle({ title, subscriptionid, shortInfo, longInfo });
            alert("News article created successfully!");
            navigate('/admin/list-newsarticles');        
        } catch (error) {
            console.error("Error creating news article:", error);
            alert("Error creating news article. Please try again later.");
        }
    };

    return (
        <div className="create-newsletter-container">
            <h2>Create Newsarticle</h2>
            <form className="create-newsletter-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" placeholder="Enter newsarticle title" value={title} onChange={(e) => setTitle(e.target.value)} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select id="subscriptionid" value={subscriptionid} onChange={(e) => setCategory(e.target.value)}>
                        <option value="1">Standard</option>
                        <option value="2">Plus</option>
                        <option value="3">Exclusive</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="shortinfo">Short Info</label>
                    <input type="text" id="shortinfo" placeholder="Enter short info" value={shortInfo} onChange={(e) => setShortInfo(e.target.value)} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="longinfo">Long Info</label>
                    <textarea id="longinfo" placeholder="Enter detailed information" value={longInfo} onChange={(e) => setLongInfo(e.target.value)}></textarea>
                </div>
                <button className="btnsubmitcn" type="submit">Create Newsarticle</button>
            </form>
        </div>
    );
};