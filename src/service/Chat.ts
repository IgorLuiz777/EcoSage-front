import axios from 'axios';

const apiBaseUrl = 'http://localhost:8080';

export const sendMessage = async (message: string) => {
    try {
        const response = await axios.get(
            `${apiBaseUrl}/chat?message=${message}`,
        );
        return response.data;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};

export const getUserMessages = async () => {
    try {
        const response = await axios.get(`${apiBaseUrl}/chat/messages/user`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user messages:', error);
        throw error;
    }
};

export const getAiMessages = async () => {
    try {
        const response = await axios.get(`${apiBaseUrl}/chat/messages/ai`);
        return response.data;
    } catch (error) {
        console.error('Error fetching AI messages:', error);
        throw error;
    }
};
