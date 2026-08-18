import React, { useState } from "react";
import SiteHeader from "./components/SiteHeader";
import Home from "./pages/Home";
import Chat from "./pages/Chat";

const App = () => {
  const [page, setPage] = useState("home"); // "home" | "chat"

  return (
    <>
      <SiteHeader page={page} setPage={setPage} />
      {page === "chat" ? <Chat /> : <Home />}
    </>
  );
};

export default App;
