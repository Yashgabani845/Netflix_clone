import React, { useState, useEffect } from "react";
import "./category.css";
import Card from "../sub-section/card/card";
import CircularProgress from '@mui/material/CircularProgress';

const Category = ({ title ,titleToShow }) => {
  const [seriesData, setSeriesData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      let plan = JSON.parse(localStorage.getItem('user')).plan;
      const params = new URLSearchParams({ plan });
      try {
        const response = await fetch(`/api/maincontent/${title}?${params}`);
        const data = await response.json();
        console.log(data);
        setSeriesData(data);
        setLoading(false); 
      } catch (error) {
        console.error("Error fetching series data:", error);
        setLoading(false); 
      }
    };

    fetchData();
  }, [title]);
 
  return (
    <div className="category-main">
      <h1 className="title">{titleToShow}</h1>
      {loading ? (
        <div className="loader">
        <CircularProgress color="primary" />
        </div>
      ) : (
        <div className="category-container">
          {seriesData &&
            seriesData.subContent &&
            seriesData.subContent.map((content, index) => (
              <Card info={content} title={title} key={index} />
            ))}
        </div>
      )}
    </div>
  );
};

export default Category;
