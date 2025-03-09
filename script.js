const blogCard = document.getElementById('blog-card');
const blogTitle = document.getElementById('blog-title');
const blogDescription = document.getElementById('blog-description');
const blogLink = document.getElementById('blog-link');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let posts = [];
let currentIndex = 0;

// ✅ Replace this with your Vercel backend URL
const API_URL = "https://medium-blog-backend-three.vercel.app/medium-feed";

// Fetch blogs from the backend
const fetchBlogs = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();

        // Check if the response contains blog posts
        if (!data || data.length === 0) throw new Error('No blog posts found');

        posts = data.map(item => ({
            title: item.title || "No title available",
            description: item.description || "No description available",
            link: item.link || "#"
        }));

        // Enable navigation buttons if there are posts
        if (posts.length > 0) {
            prevBtn.disabled = false;
            nextBtn.disabled = false;
            displayPost(currentIndex);
        }
    } catch (error) {
        console.error("Error fetching blog posts:", error);
        blogTitle.innerText = "Error loading posts.";
        blogDescription.innerText = "Please try again later.";
        blogLink.style.display = "none";
        prevBtn.disabled = true;
        nextBtn.disabled = true;
    }
};

// Display the current blog post
const displayPost = (index) => {
    if (posts.length > 0) {
        const post = posts[index];
        blogTitle.innerText = post.title;
        blogDescription.innerText = post.description;
        blogLink.href = post.link;
        blogLink.style.display = "inline"; // Show the link

        // Fade-out and fade-in effect
        blogCard.style.opacity = 0;
        setTimeout(() => {
            blogCard.style.opacity = 1;
        }, 500);
    }
};

// Button event listeners
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : posts.length - 1;
    displayPost(currentIndex);
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex < posts.length - 1) ? currentIndex + 1 : 0;
    displayPost(currentIndex);
});

// Fetch blogs when the page loads
window.onload = fetchBlogs;
