import React, { useState, createContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import queryString from "query-string";

export const Context = createContext();

export const Provider = ({ children }) => {
  const title = "Posts";
  const navigate = useNavigate();
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // Number of items per page
  const [totalItems, setTotalItems] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const handlePageChange = (page) => {
    setCurrentPage(page);
    console.log(currentPage && selectedTags.length === 0);
    updateURLParams({ page });
  };
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setCurrentPage(1);
    // Reset to first page when searching
    if (!value) {
      updateURLParams({});
    } else updateURLParams({ page: 1, q: e.target.value });
  };

  const updateURLParams = (params) => {
    const newParams = params.q
      ? {
          ...queryString.parse(location.search),
          ...params,
        }
      : params;
    const newQueryString = queryString.stringify(newParams);
    navigate(`${location.pathname}?${newQueryString}`);
  };
  const handleTagFilter = (selectedTags) => {
    setSelectedTags(selectedTags);
    if (selectedTags.length <= 0) {
      updateURLParams({});
    } else {
      updateURLParams({ page: 1, tags: selectedTags.join(",") });
    }
  };
  const totalData = async () => {
    fetch("https://dummyjson.com/posts")
      .then((res) => res.json())
      .then((data) => {
        if (searchQuery) {
          const filterData = data.posts.filter((post) =>
            post.body.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setPosts(filterData);
          setTotalItems(filterData.length);
          setCurrentPage(1);
        } else {
          setTotalItems(data.total);
        }
      });
  };
  const checkTag = (tags) => {
    for (let i = 0; i < selectedTags.length; i++) {
      if (tags.includes(selectedTags[i])) return true;
    }
    return false;
  };
  const totalDataTag = async () => {
    fetch("https://dummyjson.com/posts")
      .then((res) => res.json())
      .then((data) => {
        if (selectedTags.length > 0) {
          const filterData = data.posts.filter((post) => checkTag(post.tags));
          pagination(filterData);
          console.log(filterData.length);
          setTotalItems(filterData.length);
        } else {
          setCurrentPage(1);
          setTotalItems(data.total);
        }
      });
  };
  const pagination = async (filterData) => {
    let s = (currentPage - 1) * pageSize;
    let e = s + pageSize;
    if (e > filterData.length) {
      e = filterData.length;
    }
    console.log(filterData.slice(s, e));
    setPosts(filterData.slice(s, e));
  };
  useEffect(() => {
    const queryParams = queryString.parse(location.search);

    // Set current page from query parameters
    if (queryParams.page) {
      setCurrentPage(parseInt(queryParams.page));
    }

    // Set search query from query parameters
    if (queryParams.q) {
      setSearchQuery(queryParams.q);
    }

    if (queryParams.tags) {
      setSelectedTags(queryParams.tags.split(","));
    }

    if (Object.keys(queryParams).length === 0) {
      setSelectedTags([]);
      setSearchQuery("");
    }
  }, [location.search]);
  useEffect(() => totalData, []);

  useEffect(() => {
    // Fetch data from API based on current page and page size
    fetch(
      `https://dummyjson.com/posts?skip=${
        (currentPage - 1) * pageSize
      }&limit=${pageSize}`
    )
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.posts);
      });
  }, [currentPage && selectedTags.length === 0]);

  useEffect(() => {
    totalData();
  }, [searchQuery]);

  useEffect(() => {
    totalDataTag();
  }, [selectedTags, selectedTags.length !== 0 && currentPage]);

  return (
    <Context.Provider
      value={{
        posts,
        totalDataTag,
        handlePageChange,
        handleSearchChange,
        handleTagFilter,
        totalData,
        totalItems,
        setPosts,
        selectedTags,
        setSelectedTags,
        searchQuery,
        setSearchQuery,
        setTotalItems,
        pageSize,
        setCurrentPage,
        currentPage,
        title,
      }}
    >
      {children}
    </Context.Provider>
  );
};
