export const shouldSendBody = (method: string) =>
  !["GET", "HEAD", "DELETE"].includes(method);

export const toJsonSafe = async (res: Response) => {
  try {
    const text = await res.text();
    return text ? JSON.parse(text) : null;
  } catch {
    return null;
  }
};
