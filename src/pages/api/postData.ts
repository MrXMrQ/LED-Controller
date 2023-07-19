import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

interface ledData {
    selectedIP: string;
    selectedBrightness: number;
    keyword: string;
    red: number
    green: number
    blue: number
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === 'POST') {
        try {
            // Lies die JSON-Daten aus dem Request-Body
            const data: ledData = req.body;

            // Sende die JSON-Daten an den Nodemcu-Webserver
            sendDataToNodeMCU(data);

            // Gib eine Erfolgsmeldung zurück
            res.status(200).json({ message: 'Daten erfolgreich empfangen und verarbeitet.', data });
        } catch (error) {
            // Falls ein Fehler auftritt, gib eine Fehlermeldung zurück
            res.status(500).json({ error: 'Fehler beim Verarbeiten der Daten.' });
        }
    } else {
        // Falls eine andere HTTP-Methode als POST verwendet wird, gib eine Fehlermeldung zurück
        res.status(405).end();
    }
}

// Funktion zum Senden der Daten an den Nodemcu-Webserver
async function sendDataToNodeMCU(data: ledData) {
    const nodeMCUUrl = `http://${data.selectedIP}/post`;
    try {
        const response = await axios.post(nodeMCUUrl, data);
    } catch (error) {
        console.log('Fehler beim Senden der Daten an den Nodemcu:');
    }
}
