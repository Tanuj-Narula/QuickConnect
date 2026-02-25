import { useState, useEffect } from "react";
import Home from "./pages/Home";
import NotFound from "./components/NotFound";
import { BrowserRouter, Routes, Route } from "react-router";
import LoginPage from "./pages/LoginPage";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import { checkTokenExpiry } from "./utils/checkTokenExpiry";
import ProtectedRoute from "./components/ProtectedRoute";
import ChatPage from "./components/ChatPage";

function App() {
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      checkTokenExpiry(dispatch, token);
    }
  }, [token]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          >
            <Route path="/rooms/:Id" element={<ChatPage />} />
          </Route>
          <Route path="/login" element={<LoginPage use={"Sign In"} />} />
          <Route path="/signup" element={<LoginPage use={"Sign Up"} />} />
          <Route
            path="/update"
            element={
              <ProtectedRoute>
                <LoginPage use={"Update"} />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
