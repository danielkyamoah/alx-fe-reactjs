// GitHub API service module
// Provides functions to fetch user data and repositories from GitHub

const API_BASE = 'https://api.github.com'
const API_KEY = import.meta.env.VITE_APP_GITHUB_API_KEY

/**
 * Get authorization headers with optional API key
 * @returns {Object} headers object
 */
const getHeaders = () => {
    const headers = { 'Accept': 'application/vnd.github.v3+json' }
    if (API_KEY) {
        headers['Authorization'] = `token ${API_KEY}`
    }
    return headers
}

/**
 * Fetch a GitHub user profile by username
 * @param {string} username - GitHub username
 * @returns {Promise<Object>} User profile object
 */
export const fetchGitHubUser = async (username) => {
    if (!username) throw new Error('Username is required')

    const response = await fetch(
        `${API_BASE}/users/${encodeURIComponent(username)}`,
        { headers: getHeaders() }
    )

    if (!response.ok) {
        if (response.status === 404) throw new Error('User not found')
        throw new Error(`GitHub API error: ${response.status}`)
    }

    return response.json()
}

/**
 * Fetch repositories for a GitHub user
 * @param {string} username - GitHub username
 * @param {number} perPage - Results per page (default: 30, max: 100)
 * @returns {Promise<Array>} Array of repository objects
 */
export const fetchUserRepos = async (username, perPage = 30) => {
    if (!username) throw new Error('Username is required')

    const response = await fetch(
        `${API_BASE}/users/${encodeURIComponent(username)}/repos?per_page=${perPage}&sort=updated`,
        { headers: getHeaders() }
    )

    if (!response.ok) {
        throw new Error(`Failed to fetch repos: ${response.status}`)
    }

    return response.json()
}

/**
 * Search for users by query
 * @param {string} query - Search query
 * @param {number} perPage - Results per page (default: 10)
 * @returns {Promise<Object>} Search results object with items array
 */
export const searchUsers = async (query, perPage = 10) => {
    if (!query) throw new Error('Query is required')

    const response = await fetch(
        `${API_BASE}/search/users?q=${encodeURIComponent(query)}&per_page=${perPage}`,
        { headers: getHeaders() }
    )

    if (!response.ok) {
        throw new Error(`Search failed: ${response.status}`)
    }

    return response.json()
}

/**
 * Get rate limit information for GitHub API
 * @returns {Promise<Object>} Rate limit object
 */
export const getRateLimit = async () => {
    const response = await fetch(
        `${API_BASE}/rate_limit`,
        { headers: getHeaders() }
    )

    if (!response.ok) {
        throw new Error('Failed to fetch rate limit')
    }

    return response.json()
}
