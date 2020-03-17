const https = require("https");

const getRegion = lang => (lang === "en" ? "US" : "RU");

module.exports = (pathname, language) => {
  const path = `/3${pathname}&region=${language ? getRegion(language) : "US"}`;
  
  const options = {
    hostname: 'api.themoviedb.org',
    path,
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`
    }
  };
  
  return new Promise((resolve, reject) => {
    let data = "";
  
    const req = https.request(options, res => {
      res.on("data", chunk => (data += chunk));
      res.on("end", () => resolve(JSON.parse(data)));
    });
    
    req.on("error", reject);
    
    req.end();
  });
  
  
};
