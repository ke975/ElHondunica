import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

const GEMINI_API_KEY = "AIzaSyAQtu8Q3wMrMxZXvjnwcile3aqKEoEMQf8"; 
const MODEL_NAME = "gemini-2.5-flash"; 

export const sendToGemini = async (userId, prompt) => {
    if (!GEMINI_API_KEY) {
        console.error("Error: GEMINI_API_KEY no está definida.");
        return "Error de configuración de la clave de API.";
    }

    // 1. Cuerpo de la solicitud - ¡CORREGIDO!
    const requestBody = {
        contents: [{ 
            role: "user", 
            parts: [{ text: prompt }] 
        }],
        // ✅ CAMBIO CLAVE: Usar generationConfig para los parámetros de generación
        generationConfig: { 
            temperature: 0.7,
        }
    };

    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${GEMINI_API_KEY}`;
        
        // 2. Llamada a la API
        const res = await fetch(url, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(requestBody),
        });

        let data;
        
        if (!res.ok) {
            const errorText = await res.text();
            console.error("Error HTTP en API de Gemini:", res.status, res.statusText, "\nDetalle:", errorText);
            
            try {
                data = JSON.parse(errorText);
                if (data.error) {
                    return `Error de la IA (${res.status}): ${data.error.message}`;
                }
            } catch (e) {
                return `Error de conexión con la IA (Status: ${res.status}). Revisa la clave API.`;
            }
        }
        
        if (res.ok) {
             data = await res.json();
        }

        if (data.error) {
            console.error("Error de la API de Gemini (en JSON):", data.error.message);
            return `Error de la IA: ${data.error.message}`;
        }
        
        const candidate = data.candidates?.[0];
        
        if (!candidate) {
            const blockReason = data.promptFeedback?.blockReason || "Desconocida";
            console.error("Respuesta bloqueada o vacía. Razón:", blockReason);
            return "La IA no respondió o la solicitud fue bloqueada por filtros de seguridad.";
        }
        
        const message = candidate.content?.parts?.[0]?.text;
        
        if (!message) {
             return "No se pudo extraer la respuesta de la IA.";
        }

        // 5. Guardar en Firestore
        await addDoc(collection(db, "users", userId, "messages"), {
            prompt,
            response: message,
            createdAt: serverTimestamp(),
        });

        return message;

    } catch (error) {
        console.error("Error de red/ejecución:", error.message || error);
        return "Error al comunicarse con la IA.";
    }
};