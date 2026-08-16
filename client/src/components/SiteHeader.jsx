import React from "react";
import { useTheme } from "../context/ThemeContext";

const SiteHeader = () => {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <div
        className="p-2 flex items-center justify-between theme-transition"
        style={{ background: "var(--primary-dark)" }}
      >
        <h1 className="text-3xl font-bold text-center" style={{ color: "#FFFFFF" }}>
          Mingo Chat App
        </h1>

        <select
          name="theme"
          id="theme"
          className="select select-bordered w-fit"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="black">Black</option>
          <option value="spotify">Spotify</option>
          <option value="claude">Claude</option>
          <option value="corporate">Corporate</option>
          <option value="ghibli">Ghibli</option>
          <option value="halloween">Halloween</option>
        </select>
      </div>
    </>
  );
};

export default SiteHeader;
