import React, { useEffect, useState } from 'react';
import './App.css'; // Import your CSS file

const API_KEY = "ed6b37c2b67c4d39972a4583a2b14c1d";
const url = "https://newsapi.org/v2/everything?q=";

const NewsApp = () => {
    const [articles, setArticles] = useState([]);
    const [currentQuery, setCurrentQuery] = useState("India");
    const [activeNav, setActiveNav] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchNews(currentQuery);
    }, [currentQuery]);

    const fetchNews = async (query) => {
        const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
        const data = await res.json();
        setArticles(data.articles);
    };

    const handleNavItemClick = (id) => {
        setCurrentQuery(id);
        setActiveNav(id);
    };

    const handleSearch = () => {
        if (searchTerm) {
            fetchNews(searchTerm);
            setActiveNav(null);
        }
    };

    return (
        <div>
            <nav>
                <div className="main-nav container flex">
                    <div className="nav-links">
                        <ul className="flex">
                            <li className={`hover-link nav-item ${activeNav === 'ipl' ? 'active' : ''}`} onClick={() => handleNavItemClick('ipl')}>IPL</li>
                            <li className={`hover-link nav-item ${activeNav === 'finance' ? 'active' : ''}`} onClick={() => handleNavItemClick('finance')}>Finance</li>
                            <li className={`hover-link nav-item ${activeNav === 'politics' ? 'active' : ''}`} onClick={() => handleNavItemClick('politics')}>Politics</li>
                        </ul>
                    </div>
                    <div className="search-bar flex">
                        <input
                            type="text"
                            className="news-input"
                            placeholder="e.g. Science"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="search-button" onClick={handleSearch}>Search</button>
                    </div>
                </div>
            </nav>

            <main>
                <div className="cards-container container flex" id="cards-container">
                    {articles.map((article, index) => (
                        article.urlToImage && (
                            <div className="card" key={index} onClick={() => window.open(article.url, "_blank")}>
                                <div className="card-header">
                                    <img src={article.urlToImage} alt="news" />
                                </div>
                                <div className="card-content">
                                    <h3>{article.title}</h3>
                                    <h6 className="news-source">
                                        {`${article.source.name} · ${new Date(article.publishedAt).toLocaleString("en-US", { timeZone: "Asia/Jakarta" })}`}
                                    </h6>
                                    <p className="news-desc">{article.description}</p>
                                </div>
                            </div>
                        )
                    ))}
                </div>
            </main>
        </div>
    );
};

export default NewsApp;
