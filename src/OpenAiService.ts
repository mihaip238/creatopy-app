const API_KEY = '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';
const OPENAI_ENDPOINT = 'https://api.openai.com/v1/engines/davinci/completions';
const OPENAI_IMAGE_ENDPOINT = 'https://api.openai.com/v1/images/generations';

export const generateImage = async (title: string, description: string) => {
  const headers = {
    Authorization: `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  };
  const imagePrompt = `Create a minimalist ad image background without any words based on the title: '${title}' and the description: '${description}'`;

  const data = {
    prompt: imagePrompt,
    model: 'dall-e-3',
    size: '1024x1024', // Choose based on your requirement
    quality: 'standard', // Or "hd" for higher quality
    n: 1,
    style: 'vivid', // Or "natural", depending on the desired outcome
  };

  try {
    const response = await fetch(OPENAI_IMAGE_ENDPOINT, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error calling OpenAI Image API:', error);
    throw error;
  }
};

export const generateAdContent = async (
  input: string,
  contentType: 'title' | 'description'
) => {
  const headers = {
    Authorization: `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  };

  // Create different prompts based on the content type
  let prompt = '';
  if (contentType === 'title') {
    prompt = `Create a catchy yet standard title up to 5-6 words for a marketing campaign based on this description : ${input}`;
  } else if (contentType === 'description') {
    prompt = `Write a concise and catchy description, up to 20 words, suitable for a marketing campaign, based on this concept: ${input}`;
  }

  const data = {
    prompt: prompt,
    max_tokens: 100, // Adjust as needed
  };

  try {
    const response = await fetch(OPENAI_ENDPOINT, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw error;
  }
};
