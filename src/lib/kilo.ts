// src/lib/kilo.ts
// Utility for Kilo Code API simulation

export async function kiloGenerateContent(prompt: string): Promise<string> {
  // Simulate Kilo Code AI responses based on prompt content
  if (prompt.includes('generate concise study notes')) {
    const fileText = extractFileText(prompt);
    return generateDetailedNotes(fileText);
  } else if (prompt.includes('create 5 multiple-choice questions')) {
    const fileText = extractFileText(prompt);
    return generateDetailedQuiz(fileText);
  } else if (prompt.includes('suggest a search query')) {
    const fileText = extractFileText(prompt);
    return generateYouTubeQuery(fileText);
  } else if (prompt.includes('extract the main title and a bullet list')) {
    const fileText = extractFileText(prompt);
    return generateTopicOverview(fileText);
  } else if (prompt.includes('Answer the following question')) {
    const context = extractContext(prompt);
    const question = extractQuestion(prompt);
    return answerQuestion(context, question);
  }
  return 'Kilo Code: Unable to process prompt.';
}

function extractFileText(prompt: string): string {
  const parts = prompt.split('\n\n');
  return parts[parts.length - 1] || '';
}

function extractContext(prompt: string): string {
  const match = prompt.match(/study material context: \n(.*?)\n\nAnswer/);
  return match ? match[1] : '';
}

function extractQuestion(prompt: string): string {
  const match = prompt.match(/Question: (.*)/);
  return match ? match[1] : '';
}

function generateDetailedNotes(text: string): string {
  if (!text || text.trim().length === 0) {
    return 'No content found in the uploaded file. Please upload a valid PDF, image, or text file.';
  }

  // Handle image-based PDFs or files with minimal text
  if (text.includes('[Image or unsupported file type]') || text.trim().length < 50) {
    return `**Easy Study Notes for Visual Content:**

Hey there! 👋 I see you've uploaded some visual material (diagrams, charts, or images). Let me help you understand this in simple terms:

**What You Need to Know:**
• **Look closely**: Examine every diagram, chart, and image carefully
• **Find patterns**: Look for shapes, colors, and connections that repeat
• **Ask questions**: What is this showing? Why is it important?
• **Connect ideas**: How do different visual elements relate to each other?

**Simple Breakdown:**
📊 **Diagrams** = Pictures that explain ideas
📈 **Charts** = Visual representations of data or processes
🖼️ **Images** = Visual examples or illustrations
🔗 **Connections** = How different parts link together

**Easy Memory Tips:**
1. **Draw it yourself** - Redraw the diagrams in your own way
2. **Color code** - Use different colors for different ideas
3. **Tell a story** - Create a simple story connecting the visual elements
4. **Compare** - How is this similar to something you already know?

**Quick Quiz Yourself:**
- What are the 3 main visual elements you see?
- How do they connect to each other?
- What real-world example matches this concept?

Remember: Visual learning is about seeing patterns and connections. Take your time to really look at each element!`;
  }

  // Extract and simplify complex content
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 10);
  const keySentences = sentences.slice(0, Math.min(12, sentences.length));

  // Simplify complex sentences
  const simplifiedPoints = keySentences.map(sentence => {
    const words = sentence.trim().split(' ');
    // Keep sentences under 20 words for simplicity
    if (words.length > 20) {
      return words.slice(0, 18).join(' ') + '...';
    }
    return sentence.trim();
  });

  // Extract key concepts and simplify them
  const words = text.toLowerCase().match(/\b[a-z]{4,}\b/g) || [];
  const commonWords = ['that', 'with', 'have', 'this', 'will', 'your', 'from', 'they', 'know', 'want', 'been', 'good', 'much', 'some', 'time', 'very', 'when', 'come', 'here', 'just', 'like', 'long', 'make', 'many', 'over', 'such', 'take', 'than', 'them', 'well', 'were'];
  const keyTerms = words.filter(w => !commonWords.includes(w)).slice(0, 8);

  // Create simple, student-friendly summary
  const summary = `Hey! 👋 I've read through your college notes and made them easier to understand. Here's the simple version of what you uploaded:`;

  // Create easy-to-follow mind map
  const mainTopic = keyTerms.slice(0, 2).join(' ') || 'Main Topic';
  const subtopics = keyTerms.slice(2, 6).map(term =>
    `  📍 ${term.charAt(0).toUpperCase() + term.slice(1)}`
  ).join('\n');

  const mindMap = `🧠 **${mainTopic.charAt(0).toUpperCase() + mainTopic.slice(1)}**
${subtopics}`;

  // Student-friendly memory tricks
  const tricks = [
    `🎯 **Link to real life**: Connect "${keyTerms[0] || 'this concept'}" to something you do every day`,
    `🔤 **Make an acronym**: Use first letters of ${keyTerms.slice(0, 4).join(', ')} to spell a word you know`,
    `📖 **Tell a story**: Imagine ${keyTerms.slice(0, 3).join(' and ')} having an adventure together`,
    `🏠 **Place method**: Put each idea in different rooms of your house in your mind`,
    `🎨 **Draw it**: Sketch simple pictures representing each key point`
  ];

  return `**${summary}**

**📝 Easy Key Points (Simplified):**
${simplifiedPoints.map((point, i) => `${i + 1}. ${point}`).join('\n')}

**🧠 Simple Mind Map:**
${mindMap}

**🎯 Easy Memory Tricks:**
${tricks.map((trick, i) => `${i + 1}. ${trick}`).join('\n')}

**💡 Quick Study Tip:**
Read each point out loud, then explain it in your own words. If you can teach this to a friend, you really understand it!

**❓ Test Yourself:**
- Can you explain the main idea in 2 sentences?
- What are the 3 most important points?
- How would you use this in real life?`;
}

function generateDetailedQuiz(text: string): string {
  if (!text || text.trim().length === 0) {
    return 'No content found in the uploaded file. Please upload a valid PDF, image, or text file.';
  }

  // Handle image-based PDFs or files with minimal text
  if (text.includes('[Image or unsupported file type]') || text.trim().length < 50) {
    return `**Visual Content Quiz:**

Since your uploaded file appears to be image-based or contains minimal text, here are practice questions for visual learning:

1. What is the primary visual element you notice in the material?
A) Text content
B) Diagrams and charts
C) Images and graphics
D) Tables and data
Correct: B
Explanation: Visual materials often rely on diagrams, charts, and images to convey information.

2. How should you approach studying visual content?
A) Read it like a book
B) Analyze patterns and relationships
C) Memorize colors only
D) Ignore the images
Correct: B
Explanation: Visual learning involves understanding patterns, relationships, and how elements connect.

3. What is a good strategy for remembering visual information?
A) Copy the images exactly
B) Create mental associations
C) Avoid looking at the material
D) Focus only on text labels
Correct: B
Explanation: Creating mental associations helps convert visual information into memorable concepts.

4. Why are visual aids important in learning?
A) They make materials look pretty
B) They help explain complex concepts
C) They replace the need for reading
D) They are easier to ignore
Correct: B
Explanation: Visual aids help break down complex concepts into understandable elements.

5. What should you do after studying visual material?
A) Forget what you saw
B) Try to recreate the diagrams from memory
C) Only remember the colors
D) Avoid thinking about it
Correct: B
Explanation: Recreating diagrams from memory reinforces understanding and retention.`;
  }

  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 20);
  const questions = sentences.slice(0, Math.min(5, sentences.length)).map((sentence, i) => {
    const cleanSentence = sentence.trim();
    const question = `What is the main idea expressed in: "${cleanSentence}"?`;

    // Generate more diverse and relevant options based on the sentence content
    const words = cleanSentence.split(' ');
    const keyWord = words[Math.floor(words.length / 2)] || 'concept';
    const firstWord = words[0]?.toLowerCase() || 'the';
    const lastWord = words[words.length - 1]?.toLowerCase() || 'topic';

    const options = [
      `The importance of ${keyWord}`,
      `The relationship between ${firstWord} and ${lastWord}`,
      `Understanding ${keyWord} in context`,
      `The application of ${keyWord} principles`
    ];

    return `${i + 1}. ${question}\nA) ${options[0]}\nB) ${options[1]}\nC) ${options[2]}\nD) ${options[3]}\nCorrect: A\nExplanation: The sentence emphasizes the core concept of ${keyWord} and its significance in the overall context.`;
  });

  return questions.join('\n\n');
}

function generateYouTubeQuery(text: string): string {
  if (!text || text.trim().length === 0) {
    return 'general study techniques tutorial';
  }

  // Handle image-based content
  if (text.includes('[Image or unsupported file type]') || text.trim().length < 50) {
    return 'visual learning techniques study methods educational videos';
  }

  // Extract key terms for search
  const words = text.toLowerCase().match(/\b[a-z]{4,}\b/g) || [];
  const commonWords = ['that', 'with', 'have', 'this', 'will', 'your', 'from', 'they', 'know', 'want', 'been', 'good', 'much', 'some', 'time', 'very', 'when', 'come', 'here', 'just', 'like', 'long', 'make', 'many', 'over', 'such', 'take', 'than', 'them', 'well', 'were'];
  const keyTerms = words.filter(w => !commonWords.includes(w)).slice(0, 6);

  const query = keyTerms.length > 0 ? keyTerms.join(' ') + ' tutorial explanation educational video' : 'study material explanation';
  return query;
}

function generateTopicOverview(text: string): string {
  if (!text || text.trim().length === 0) {
    return 'Introduction\nKey Concepts\nExamples\nSummary';
  }

  // Handle image-based content
  if (text.includes('[Image or unsupported file type]') || text.trim().length < 50) {
    return 'Visual Content Overview\n- Diagram Analysis\n- Pattern Recognition\n- Visual Learning Strategies\n- Concept Mapping\n- Study Techniques for Images';
  }

  // Extract potential headings and topics
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 10);
  const words = text.toLowerCase().match(/\b[a-z]{4,}\b/g) || [];
  const commonWords = ['that', 'with', 'have', 'this', 'will', 'your', 'from', 'they', 'know', 'want', 'been', 'good', 'much', 'some', 'time', 'very', 'when', 'come', 'here', 'just', 'like', 'long', 'make', 'many', 'over', 'such', 'take', 'than', 'them', 'well', 'were'];
  const keyTerms = words.filter(w => !commonWords.includes(w)).slice(0, 8);

  // Create a main title from first few key terms
  const mainTitle = keyTerms.slice(0, 3).join(' ').charAt(0).toUpperCase() + keyTerms.slice(0, 3).join(' ').slice(1);

  // Generate section headings
  const sections = [
    mainTitle || 'Main Topic',
    `Introduction to ${keyTerms[0] || 'Key Concepts'}`,
    `${keyTerms[1] || 'Core'} Principles`,
    `${keyTerms[2] || 'Important'} Applications`,
    `${keyTerms[3] || 'Advanced'} Topics`,
    'Examples and Case Studies',
    'Summary and Key Takeaways'
  ];

  return sections.join('\n');
}

function answerQuestion(context: string, question: string): string {
  if (!context || !question) {
    return 'I need both context and a question to provide an accurate answer.';
  }

  // Handle image-based content
  if (context.includes('[Image or unsupported file type]') || context.trim().length < 50) {
    return `Based on your visual study material, I can help you with general study strategies. For questions about visual content, consider:

- **Visual Analysis**: What key diagrams or images stand out to you?
- **Pattern Recognition**: Are there recurring themes or symbols?
- **Contextual Understanding**: How do the visual elements relate to the overall topic?
- **Application**: How might you apply these visual concepts in practice?

Please describe what you see in the material, and I'll provide more specific guidance!`;
  }

  // Find sentences that might be relevant to the question
  const questionWords = question.toLowerCase().split(' ').filter(w => w.length > 2);
  const contextSentences = context.split(/[.!?]+/);

  const relevantSentences = contextSentences.filter(sentence =>
    questionWords.some(word => sentence.toLowerCase().includes(word))
  );

  if (relevantSentences.length > 0) {
    const answer = relevantSentences[0].trim();
    return `Based on the study material: ${answer}`;
  } else {
    // Provide a general response based on available context
    const firstSentence = contextSentences[0]?.trim() || 'the provided material';
    return `From the context: ${firstSentence}. For more specific details, please ask about particular concepts mentioned in the material.`;
  }
}