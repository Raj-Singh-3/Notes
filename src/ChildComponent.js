import React, { useState } from "react";
import {
  FaDownload,
  FaEye,
  FaStar,
  FaRegStar,
  FaStarHalfAlt,
  FaUser,
} from "react-icons/fa";
import data from "./data.json";
import "./ChildComponent.css";

const ChildComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const matchingItems = data.filter((item) =>
    item.pdfDetails.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const calculateTimeSinceUpload = (uploadDate) => {
    const uploadDateObj = new Date(uploadDate);
    const now = new Date();
    const timeDiff = now - uploadDateObj;

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    if (days < 30) return `${days} day${days === 1 ? "" : "s"} ago`;

    const months = Math.floor(days / 30);
    if (months < 12) return `${months} month${months === 1 ? "" : "s"} ago`;

    const years = Math.floor(months / 12);
    return `${years} year${years === 1 ? "" : "s"} ago`;
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - Math.ceil(rating);

    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="star-icon" />);
    }
    if (halfStar) {
      stars.push(<FaStarHalfAlt key="half" className="star-icon" />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="star-icon" />);
    }
    return stars;
  };

  const downloadPdf = (pdfLink) => {
    const confirmDownload = window.confirm(
      "Are you sure you want to download the PDF?"
    );
    if (confirmDownload) {
      window.open(pdfLink, "_blank");
    }
  };

  return (
    <div>
      <div className="search">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={handleSearchInputChange}
          className="search-bar"
        />
      </div>
      {matchingItems.map((item, index) => (
        <div className="box" key={index}>
          <div className="pdf-details">
            <div className="Head">
              <div className="profile-section">
                <FaUser
                  onClick={() => window.open(item.generalLink, "_blank")}
                  className="profile-icon"
                  title="View Profile"
                />
                <div
                  onClick={() => window.open(item.generalLink, "_blank")}
                  className="username"
                  style={{ cursor: "pointer" }}
                >
                  {item.pdfDetails.username}
                </div>
              </div>
              <div className="text-section">
                <div className="title">Title: {item.pdfDetails.title}</div>
                <div className="description">
                  Description: {item.pdfDetails.description}
                </div>
              </div>
            </div>
            <div className="visitors-section">
              <div className="visitors">
                Visitors: {item.pdfDetails.visitors}
              </div>
              <div className="uploaded">
                {calculateTimeSinceUpload(item.pdfDetails.uploadDate)}
              </div>
            </div>
            <div className="rating">
              <div className="icon-container">
                <p>Rating: {item.pdfDetails.rating} </p>
                <FaDownload
                  onClick={() => downloadPdf(item.pdfLink)}
                  className="download-icon"
                  title="Download PDF"
                />
                <FaEye
                  onClick={() => window.open(item.pdfLink, "_blank")}
                  className="eye-icon"
                  title="View PDF"
                />
              </div>
              <div className="stars">{renderStars(item.pdfDetails.rating)}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChildComponent;
