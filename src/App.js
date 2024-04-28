import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PostList from "./components/PostList";
import Navbar from "./components/Navbar";
import NotFoundPage from "./components/NotFoundPage";
import ErrorBoundary from "./components/ErrorBoundary";
import "./App.css";
import { Provider } from "./context/context";

const App = () => {
  return (
    <Router>
      <Provider>
        <ErrorBoundary>
          <div>
            <Routes>
              <Route
                path="/"
                exact
                element={
                  <>
                    <Navbar />
                    <PostList />
                  </>
                }
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </ErrorBoundary>
      </Provider>
    </Router>
  );
};

export default App;
