import React, { FC, useState } from 'react';
import Configuration from 'openai';
import OpenAIApi from 'openai';
import InstagramPost from './components/InstagramPost';
import TwitterHeader from './components/TwitterHeader';
import Story from './components/Story';
import { generateAdContent, generateImage } from './OpenAiService';

export const App: FC<{ name: string }> = ({ name }) => {
  const [description, setDescription] = useState('');
  const [adTitle, setAdTitle] = useState('');
  const [adDescription, setAdDescription] = useState('');
  const [adCTA, setAdCTA] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('instagram'); // default template
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState('');

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };
  const limitWords = (text, wordLimit) => {
    return text.split(' ').slice(0, wordLimit).join(' ');
  };

  const handleGenerateClick = async () => {
    setIsLoading(true); // Start loading
    try {
      // Generate the title for the ad
      const titleResponse = await generateAdContent(description, 'title');
      const generatedTitle =
        titleResponse.choices[0]?.text.trim() || 'Default Title';
      setAdTitle(limitWords(generatedTitle, 5)); // Apply word limit to title

      // Generate the description for the ad
      const descriptionResponse = await generateAdContent(
        description,
        'description'
      );
      const generatedDescription =
        descriptionResponse.choices[0]?.text.trim() || 'Default Description';
      setAdDescription(limitWords(generatedDescription, 20)); // Apply word limit to description

      // Generate the image for the ad
      const imageResponse = await generateImage(
        generatedTitle,
        generatedDescription
      );
      if (imageResponse.data && imageResponse.data.length > 0) {
        // Assuming the API response contains a direct link to the image
        setGeneratedImageUrl(imageResponse.data[0].url);
      }

      setIsLoading(false); // Stop loading after both requests
    } catch (error) {
      console.error('Failed to generate ad content:', error);
      setIsLoading(false); // Stop loading in case of error
    }
  };

  return (
    <div className="App">
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleGenerateClick}>Generate</button>

      {/* Template selection (you can replace this with your own UI components) */}
      <select
        value={selectedTemplate}
        onChange={(e) => setSelectedTemplate(e.target.value)}
      >
        <option value="instagram">Instagram Post</option>
        <option value="twitter">Twitter Header</option>
        <option value="story">Story</option>
      </select>

      {/* Conditional rendering of templates */}
      {selectedTemplate === 'instagram' && (
        <InstagramPost
          title={adTitle}
          description={adDescription}
          cta={adCTA}
          imageUrl={generatedImageUrl}
        />
      )}
      {selectedTemplate === 'twitter' && (
        <TwitterHeader
          title={adTitle}
          description={adDescription}
          cta={adCTA}
          imageUrl={generatedImageUrl}
        />
      )}
      {selectedTemplate === 'story' && (
        <Story
          title={adTitle}
          description={adDescription}
          cta={adCTA}
          imageUrl={generatedImageUrl}
        />
      )}
    </div>
  );
};
