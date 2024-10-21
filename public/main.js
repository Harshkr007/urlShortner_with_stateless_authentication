// ./public/main.js

// Wait for the DOM to fully load before attaching event listeners
document.addEventListener("DOMContentLoaded", () => {
    const getAllUrlsButton = document.querySelector(".getallurl");
    const urlListBlock = document.querySelector(".url-list");
  
    // Attach event listener to the 'Get All URLs' button
    getAllUrlsButton.addEventListener("click", async () => {
      try {
        const response = await fetch("/url/urls"); // Corrected route to fetch all URLs
        if (!response.ok) {
          throw new Error("Failed to fetch URLs");
        }
        const urlList = await response.json();
        renderUrlList(urlList);
      } catch (error) {
        console.error("Error fetching URLs:", error);
      }
    });
  
    // Function to render the list of URLs dynamically
    const renderUrlList = (urlList) => {
      if (!urlList || urlList.length === 0) {
        urlListBlock.innerHTML = "<p>No URLs available.</p>";
        return;
      }
  
      const listHTML = `
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Original URL</th>
              <th>Short URL</th>
              <th>Visits</th>
            </tr>
          </thead>
          <tbody>
            ${urlList
              .map(
                (element, index) => `
              <tr>
                <td>${index + 1}</td>
                <td>${element.redirectURL}</td>
                <td>
                  <a href="/url/api/${element.shortId}" class="short-url" target="_blank">
                    http://localhost:8000/url/api/${element.shortId}
                  </a>
                </td>
                <td>${element.visitHistory.length}</td>
              </tr>`
              )
              .join("")}
          </tbody>
        </table>`;
  
      urlListBlock.innerHTML = listHTML;
    };
  });
  