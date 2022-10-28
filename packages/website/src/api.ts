const devHosts: string[] = ["127.0.0.1", "localhost"];

const isLocal = devHosts.includes(location.hostname);

/**
 * Reasonable URL to the API. If the hostname is localhost, assume the API is hosted on localhost on the static port + 1
 */
export const apiURL = isLocal
  ? `http://${location.hostname}:${parseInt(location.port) + 1}/`
  : new URL("/api/", location.origin).toString();
