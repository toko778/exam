// 1. function to get htlm element
const fetchButton = document.getElementById('fetchDataBtn');
const postsContainer = document.getElementById('postsContainer');
// 2. Task 3, simple promise
function checkServerStatus() {
    return new Promise(function(resolve, reject) {
        let isServerOnline = true; // server
        if (isServerOnline) {
            resolve("კავშირი სერვერთან წარმატებულია!");
        } else {
            reject("სერვერი გათიშულია.");
        }
    });
}
// 3. async/await and try/catch errors
async function loadServerData() {
    postsContainer.innerHTML = "<p>იტვირთება...</p>";
    try {
        // Promise check
        const statusMessage = await checkServerStatus();
        console.log(statusMessage);
        // მივმართავთ რეალურ სერვერს პოსტების წამოსაღებად
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3');
        if (!response.ok) {
            throw new Error("მონაცემების წამოღება ვერ მოხერხდა.");
        }
        const posts = await response.json();
        postsContainer.innerHTML = ""; 
        // print posts 
        posts.forEach(function(post) {
            const postBlock = document.createElement('div');
            postBlock.style.border = "1px solid #ccc";
            postBlock.style.margin = "10px 0";
            postBlock.style.padding = "10px";
            postBlock.style.borderRadius = "5px";
            
            postBlock.innerHTML = "<h4>" + post.title + "</h4><p>" + post.body + "</p>";
            postsContainer.appendChild(postBlock);
        });
    } catch (error) {
        
        console.error("დაფიქსირდა შეცდომა:", error.message);
        postsContainer.innerHTML = "<p style='color: red;'>შეცდომა მონაცემების ჩატვირთვისას!</p>";
    }
}
fetchButton.addEventListener('click', loadServerData);