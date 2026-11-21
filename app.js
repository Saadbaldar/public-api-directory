/* Public API Directory
 *
 * Primary data source: https://api.publicapis.org/entries (free, no key).
 * If that request fails (network error, non-2xx status, or bad payload),
 * a built-in curated list of well-known free APIs (FALLBACK_ENTRIES) is
 * used instead, so the page still works offline / when the service is down.
 *
 * Live entry shape (from api.publicapis.org):
 *   { API, Description, Auth, HTTPS, Cors, Link, Category }
 * Auth is "" (none), "apiKey", "OAuth", etc. HTTPS is a boolean.
 * Cors is "yes", "no" or "unknown".
 */

"use strict";

var API_URL = "https://api.publicapis.org/entries";

/* Curated fallback dataset — real, well-known free APIs only.
 * Auth / HTTPS / Cors values reflect each API's public documentation. */
var FALLBACK_ENTRIES = [
  { API: "JSONPlaceholder", Description: "Fake online REST API for testing and prototyping.", Auth: "", HTTPS: true, Cors: "yes", Link: "https://jsonplaceholder.typicode.com/", Category: "Development" },
  { API: "Dog CEO", Description: "Random dog images and a full breed list.", Auth: "", HTTPS: true, Cors: "yes", Link: "https://dog.ceo/dog-api/", Category: "Animals" },
  { API: "Cat Facts", Description: "Random facts about cats.", Auth: "", HTTPS: true, Cors: "yes", Link: "https://catfact.ninja/", Category: "Animals" },
  { API: "The Cat API", Description: "Random cat images and breed information.", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://thecatapi.com/", Category: "Animals" },
  { API: "The Dog API", Description: "Random dog images and breed information.", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://thedogapi.com/", Category: "Animals" },
  { API: "REST Countries", Description: "Country data: names, capitals, currencies, flags and more.", Auth: "", HTTPS: true, Cors: "yes", Link: "https://restcountries.com/", Category: "Geography" },
  { API: "Open-Meteo", Description: "Free weather forecast API, no key required.", Auth: "", HTTPS: true, Cors: "yes", Link: "https://open-meteo.com/", Category: "Weather" },
  { API: "GitHub", Description: "Official GitHub REST API for repositories, users and issues.", Auth: "OAuth", HTTPS: true, Cors: "yes", Link: "https://docs.github.com/en/rest", Category: "Development" },
  { API: "CoinGecko", Description: "Cryptocurrency prices, market data and exchange rates.", Auth: "", HTTPS: true, Cors: "yes", Link: "https://www.coingecko.com/en/api", Category: "Finance" },
  { API: "Open Library", Description: "Books, authors and covers data from the Internet Archive.", Auth: "", HTTPS: true, Cors: "yes", Link: "https://openlibrary.org/dev", Category: "Books" },
  { API: "PokéAPI", Description: "Data on Pokémon, moves, abilities, types and more.", Auth: "", HTTPS: true, Cors: "yes", Link: "https://pokeapi.co/", Category: "Games" },
  { API: "NASA Open APIs", Description: "NASA data including Astronomy Picture of the Day and Mars rover photos.", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://api.nasa.gov/", Category: "Science & Math" },
  { API: "OpenWeatherMap", Description: "Current weather, forecasts and historical weather data.", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://openweathermap.org/api", Category: "Weather" },
  { API: "NewsAPI", Description: "Searchable live and historical news articles from many sources.", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://newsapi.org/", Category: "News" },
  { API: "Random User Generator", Description: "Random user profiles with names, photos and contact details.", Auth: "", HTTPS: true, Cors: "yes", Link: "https://randomuser.me/", Category: "Development" },
  { API: "Chuck Norris Jokes", Description: "Random Chuck Norris jokes.", Auth: "", HTTPS: true, Cors: "yes", Link: "https://api.chucknorris.io/", Category: "Entertainment" },
  { API: "Bored API", Description: "Suggests an activity to do when you are bored.", Auth: "", HTTPS: true, Cors: "yes", Link: "https://www.boredapi.com/", Category: "Entertainment" },
  { API: "Advice Slip", Description: "Random pieces of life advice.", Auth: "", HTTPS: true, Cors: "yes", Link: "https://api.adviceslip.com/", Category: "Entertainment" },
  { API: "JokeAPI", Description: "Programming, dark, pun and other jokes with safe-mode filtering.", Auth: "", HTTPS: true, Cors: "yes", Link: "https://v2.jokeapi.dev/", Category: "Entertainment" },
  { API: "Rick and Morty API", Description: "Characters, locations and episodes from Rick and Morty.", Auth: "", HTTPS: true, Cors: "yes", Link: "https://rickandmortyapi.com/", Category: "Entertainment" },
  { API: "Studio Ghibli API", Description: "Films, people, locations and vehicles from Studio Ghibli.", Auth: "", HTTPS: true, Cors: "yes", Link: "https://ghibliapi.vercel.app/", Category: "Entertainment" },
  { API: "SpaceX API", Description: "Launches, rockets, capsules and company data from SpaceX.", Auth: "", HTTPS: true, Cors: "yes", Link: "https://github.com/r-spacex/SpaceX-API", Category: "Science & Math" },
  { API: "Free Dictionary API", Description: "English word definitions, phonetics and examples.", Auth: "", HTTPS: true, Cors: "unknown", Link: "https://dictionaryapi.dev/", Category: "Dictionaries" },
  { API: "ipify", Description: "Returns your public IP address as JSON.", Auth: "", HTTPS: true, Cors: "unknown", Link: "https://www.ipify.org/", Category: "Development" },
  { API: "HTTP Cats", Description: "Cat pictures for every HTTP status code.", Auth: "", HTTPS: true, Cors: "yes", Link: "https://http.cat/", Category: "Development" },
  { API: "Agify", Description: "Predicts a person's age from their first name.", Auth: "", HTTPS: true, Cors: "yes", Link: "https://agify.io/", Category: "Development" },
  { API: "Genderize", Description: "Predicts the gender of a first name.", Auth: "", HTTPS: true, Cors: "yes", Link: "https://api.genderize.io/", Category: "Development" },
  { API: "Nationalize", Description: "Predicts the nationality of a first name.", Auth: "", HTTPS: true, Cors: "yes", Link: "https://api.nationalize.io/", Category: "Development" },
  { API: "Frankfurter", Description: "Free foreign exchange rates, published by the European Central Bank.", Auth: "", HTTPS: true, Cors: "yes", Link: "https://www.frankfurter.app/", Category: "Finance" },
  { API: "Sunrise-Sunset", Description: "Sunrise and sunset times for any latitude and longitude.", Auth: "", HTTPS: true, Cors: "unknown", Link: "https://sunrise-sunset.org/api", Category: "Weather" },
  { API: "Unsplash", Description: "Free high-resolution photos, search and download via API.", Auth: "OAuth", HTTPS: true, Cors: "unknown", Link: "https://unsplash.com/developers", Category: "Photography" },
  { API: "ZenQuotes", Description: "Random inspirational quotes.", Auth: "", HTTPS: true, Cors: "yes", Link: "https://zenquotes.io/", Category: "Entertainment" }
];

/* ------------------------------------------------------------------ */
/* Pure logic (no DOM) — also exported for Node testing.              */
/* ------------------------------------------------------------------ */

/* Normalise an Auth value from the live API to the filter vocabulary:
 * "" -> "none", otherwise the value as-is ("apiKey", "OAuth", ...). */
function normaliseAuth(auth) {
  return auth ? auth : "none";
}

/* Filter entries by search query, category, auth type and HTTPS flag.
 * query matches API name or description, case-insensitive, substring. */
function filterEntries(entries, opts) {
  var query = (opts.query || "").trim().toLowerCase();
  var category = opts.category || "all";
  var auth = opts.auth || "all";
  var httpsOnly = !!opts.httpsOnly;

  return entries.filter(function (entry) {
    if (query) {
      var haystack = ((entry.API || "") + " " + (entry.Description || "")).toLowerCase();
      if (haystack.indexOf(query) === -1) return false;
    }
    if (category !== "all" && entry.Category !== category) return false;
    if (auth !== "all" && normaliseAuth(entry.Auth) !== auth) return false;
    if (httpsOnly && entry.HTTPS !== true) return false;
    return true;
  });
}

/* Sorted, unique category list for the dropdown. */
function getCategories(entries) {
  var seen = {};
  var list = [];
  entries.forEach(function (entry) {
    var c = entry.Category || "Uncategorised";
    if (!seen[c]) { seen[c] = true; list.push(c); }
  });
  return list.sort();
}

/* ------------------------------------------------------------------ */
/* DOM / app wiring (browser only).                                    */
/* ------------------------------------------------------------------ */

var allEntries = [];
var usingFallback = false;

var els = {};

function escapeHtml(str) {
  return String(str == null ? "" : str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderCategories() {
  var select = els.categorySelect;
  while (select.options.length > 1) select.remove(1); // keep "All categories"
  getCategories(allEntries).forEach(function (cat) {
    var opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    select.appendChild(opt);
  });
}

function renderResults() {
  var filtered = filterEntries(allEntries, {
    query: els.searchInput.value,
    category: els.categorySelect.value,
    auth: els.authSelect.value,
    httpsOnly: els.httpsOnly.checked
  });

  els.resultCount.textContent = filtered.length + (filtered.length === 1 ? " API" : " APIs");

  els.emptyState.hidden = filtered.length !== 0;

  els.results.innerHTML = filtered.map(function (entry) {
    var authLabel = entry.Auth ? escapeHtml(entry.Auth) : "None";
    var httpsLabel = entry.HTTPS ? "Yes" : "No";
    var httpsClass = entry.HTTPS ? "meta-yes" : "meta-no";
    return (
      '<article class="card">' +
        '<div class="card-top">' +
          '<h2 class="card-title"><a href="' + escapeHtml(entry.Link) + '" target="_blank" rel="noopener">' + escapeHtml(entry.API) + "</a></h2>" +
          '<span class="badge">' + escapeHtml(entry.Category || "Uncategorised") + "</span>" +
        "</div>" +
        '<p class="card-desc">' + escapeHtml(entry.Description || "No description available.") + "</p>" +
        '<dl class="card-meta">' +
          "<dt>Auth</dt><dd>" + authLabel + "</dd>" +
          '<dt>HTTPS</dt><dd class="' + httpsClass + '">' + httpsLabel + "</dd>" +
          "<dt>CORS</dt><dd>" + escapeHtml(entry.Cors || "unknown") + "</dd>" +
        "</dl>" +
      "</article>"
    );
  }).join("");
}

function setSourceNote() {
  if (usingFallback) {
    els.dataSource.textContent =
      "Showing a built-in list of " + FALLBACK_ENTRIES.length +
      " curated APIs — the live directory (api.publicapis.org) could not be reached, so results are limited.";
    els.dataSource.classList.add("fallback");
  } else {
    els.dataSource.textContent = "Live data from api.publicapis.org — " + allEntries.length + " APIs in the directory.";
    els.dataSource.classList.remove("fallback");
  }
}

function showError(message) {
  els.error.textContent = message;
  els.error.hidden = false;
}

async function loadEntries() {
  els.loading.hidden = false;
  els.error.hidden = true;

  try {
    var response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("HTTP " + response.status + " " + response.statusText);
    }
    var data = await response.json();
    if (!data || !Array.isArray(data.entries) || data.entries.length === 0) {
      throw new Error("Unexpected response format from the API.");
    }
    allEntries = data.entries;
    usingFallback = false;
  } catch (err) {
    // Live fetch failed — fall back to the built-in curated list so the
    // page still works, and tell the user what happened.
    console.warn("Live API fetch failed, using fallback dataset:", err);
    allEntries = FALLBACK_ENTRIES.slice();
    usingFallback = true;
    showError(
      "Could not reach the live API directory (api.publicapis.org). " +
      "Showing a built-in list of " + FALLBACK_ENTRIES.length +
      " curated free APIs instead. Try reloading later for the full directory."
    );
  } finally {
    els.loading.hidden = true;
  }

  renderCategories();
  setSourceNote();
  renderResults();
}

function init() {
  els.searchInput = document.getElementById("search-input");
  els.categorySelect = document.getElementById("category-select");
  els.authSelect = document.getElementById("auth-select");
  els.httpsOnly = document.getElementById("https-only");
  els.resultCount = document.getElementById("result-count");
  els.dataSource = document.getElementById("data-source");
  els.loading = document.getElementById("loading");
  els.error = document.getElementById("error");
  els.results = document.getElementById("results");
  els.emptyState = document.getElementById("empty-state");

  els.searchInput.addEventListener("input", renderResults);
  els.categorySelect.addEventListener("change", renderResults);
  els.authSelect.addEventListener("change", renderResults);
  els.httpsOnly.addEventListener("change", renderResults);

  loadEntries();
}

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", init);
}

/* Node export for testing the pure logic without a browser. */
if (typeof module !== "undefined" && module.exports) {
  module.exports = { filterEntries: filterEntries, getCategories: getCategories, normaliseAuth: normaliseAuth, FALLBACK_ENTRIES: FALLBACK_ENTRIES, API_URL: API_URL };
}
