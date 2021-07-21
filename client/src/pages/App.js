import React from "react";
import Dashboard from "./Dashboard";
import Search from "../components/Search";

const code = new URLSearchParams(window.location.search).get("search");
export default function App() {
  return code ? <Search query={code} /> : <Dashboard />;
}
