export async function createSession(userId: string): Promise<{ id: string }> {
    // Generate a session ID
    const sessionId = Math.random().toString(36).substring(2);

    // Return the session ID
    return { id: sessionId };
}
