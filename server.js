import express from 'express';
import fetch from 'node-fetch';
import { Headers } from 'node-fetch';

const app = express();

// It's better to use environment variables for sensitive data
const TOKEN = '101|mR2qMQl9icSPlynV9R86tNsAeV65PtasbSek9RcO';
const BASE_URL = 'https://sms.webline.africa/api/v3/sms/send';

async function sendSMS(recipient, message, senderId = 'TAARIFA') {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${TOKEN}`);
    myHeaders.append('Content-Type', 'application/json');

    // Create the payload according to API requirements
    const payload = {
        message: message,
        recipient: recipient,    // Add recipient field
        contacts: [recipient],   // Make sure contacts is an array
        sender_id: senderId
    };

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(payload),
        redirect: 'follow'
    };

    try {
        const response = await fetch(BASE_URL, requestOptions);
        const result = await response.json();
        console.log('API Request Payload:', payload); // Debug log
        console.log('API Response:', result);        // Debug log
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// API endpoint to send SMS
app.get('/s', async (req, res) => {  // Removed express.json() as it's not needed for GET
    try {
        const result = await sendSMS("255652992922,255762992922,", "Debian Jessie", "TAARIFA");
        res.json(result);
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

// Test endpoint that demonstrates direct usage
app.get('/t', async (req, res) => {
    try {
        const result = await sendSMS(
            '255734666100',
            'This is an API test sms from Webline'
        );
        res.json(result);
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

app.get("/", (req, res) => {
    res.send("dgfdgdf")
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});