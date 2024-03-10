/**
 * An Array of routes accessible to public
 * @type {string[]}
 */
export const publicRoutes: string[]=[
    "/",
    "/auth/new-verification",
];

/**
 * An Array of routes used for authentication
 * @type {string[]}
 */
export const authRoutes: string[]=[
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset",
    "/auth/reset-password",
];


/**
 * The prefix for api auth routes
 * Routes that start with this prefix are used for api for api auth purposes
 * @type {string}
 */
export const apiAuthPrefix: string="/api/auth";

/**
 * Default path after login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string='/settings'