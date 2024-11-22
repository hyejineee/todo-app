export const jwtDecode: <T>(token: string) => T = (token: string) => {
  try {
    const [, payload] = token.split('.');
    if (!payload) throw new Error('Invalid token structure');

    // Base64 디코딩 (padding 처리 포함)
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const paddedBase64 = base64.padEnd(
      base64.length + ((4 - (base64.length % 4)) % 4),
      '=',
    );

    const jsonPayload = atob(paddedBase64);
    return JSON.parse(jsonPayload);
  } catch (error) {
    throw new Error('Failed to decode JWT token');
  }
};
