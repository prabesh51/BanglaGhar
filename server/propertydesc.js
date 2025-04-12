const OpenAI = require("openai");

const openai = new OpenAI({
    baseURL: 'https://api.aimlapi.com/v1',
    apiKey: '078533c648a2413cad5b76536a7c6edd'
});

// Controller function to generate property descriptions
const generatePropertyDescription = async (req, res) => {
    try {
        const property = req.body.propertyData;
        
        const prompt = `You are a professional real estate agent. Generate a compelling 150-200 word description for a commercial property with these details:
        
        Property Title: ${property.title}
        Property Type: ${property.propertyType}
        Listing Type: For ${property.listingType}
        Price: ${property.price} BDT
        Location: ${property.address}, ${property.city}, ${property.state}
        Size: ${property.area} square feet
        Bedrooms: ${property.bedrooms}
        Bathrooms: ${property.bathrooms}
        
        Key Features:
        ${property.features.parking ? "- Ample parking space" : ""}
        ${property.features.garden ? "- Beautiful garden area" : ""}
        ${property.features.airConditioning ? "- Fully air-conditioned" : ""}
        ${property.features.furnished ? "- Fully furnished" : ""}
        ${property.features.pool ? "- Swimming pool" : ""}
        
        Nearby Amenities:
        ${property.nearbyAmenities.institutions === "Yes" ? "- Close to institutions" : ""}
        ${property.nearbyAmenities.hospital === "Yes" ? "- Nearby hospital" : ""}
        ${property.nearbyAmenities.market === "Yes" ? "- Nearby market" : ""}
        ${property.nearbyAmenities.park === "Yes" ? "- Nearby park" : ""}
        
        Additional Keywords: ${property.descriptionKeywords || "None"}
        
        Write an engaging description that highlights the property's best features, location advantages, and potential uses. Use persuasive language suitable for a high-value commercial property listing. Mention any unique selling points and the business potential of the location.`;

        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: "You are a professional realtor crafting high-quality commercial property descriptions that attract serious buyers." },
                { role: "user", content: prompt }
            ],
            model: "mistralai/Mistral-7B-Instruct-v0.2",
        });

        res.json({ description: completion.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ error: "Failed to generate property description", details: error.message });
    }
};

// Controller function to translate text to Bangla
const translateToBangla = async (req, res) => {
  try {
    const { text } = req.body;

    const prompt = `Translate the following text into Bangla:\n\n${text}\n\n make sure to keep the meaning and context intact and description should be of the same length as it was in english.`;

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a professional translator." },
        { role: "user", content: prompt },
      ],
      model: "mistralai/Mistral-7B-Instruct-v0.2",
    });

    res.json({ translatedText: completion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: "Failed to translate text", details: error.message });
  }
};

// Export the function
module.exports = { generatePropertyDescription, translateToBangla };