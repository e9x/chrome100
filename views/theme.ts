function setTheme(theme: string) {
  // max age of 400 days
  document.cookie = `theme=${theme}; max-age=${60 * 24 * 400}; samesite=strict; path=/`;

  document.documentElement.setAttribute("data-theme", theme);
}

// set the initial theme to the user's preference
if (!document.cookie.includes("theme=")) {
  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  setTheme(preference);
}

const themeSwitcher = document.querySelector<HTMLDivElement>(".theme");

if (themeSwitcher)
  themeSwitcher.addEventListener("click", () => {
    setTheme(
      document.documentElement.getAttribute("data-theme") === "light"
        ? "dark"
        : "light"
    );
  });
