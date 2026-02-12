const API_KEY = "live_AXWAyvoO7lb69geMCNW4ny5efSDKkc2CIegXMdHCjTWc38ybMU84RPECnMCnBxap";

const api = window.axios.create({
    baseURL: 'https://api.thecatapi.com/v1/',
    timeout: 8000,
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
    }
});


export default api;
