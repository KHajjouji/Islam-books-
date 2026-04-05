export interface SEOAnalysisResult {
  score: number;
  checks: {
    titleLength: { status: 'good' | 'warning' | 'error'; message: string };
    descriptionLength: { status: 'good' | 'warning' | 'error'; message: string };
    keywordInTitle: { status: 'good' | 'error'; message: string };
    keywordInDescription: { status: 'good' | 'error'; message: string };
    keywordDensity: { status: 'good' | 'warning' | 'error'; message: string };
    contentLength: { status: 'good' | 'warning' | 'error'; message: string };
    readability: { status: 'good' | 'warning'; message: string };
  };
}

export function analyzeSEO(
  content: string,
  focusKeyword: string,
  title: string,
  description: string
): SEOAnalysisResult {
  const checks: SEOAnalysisResult['checks'] = {
    titleLength: { status: 'error', message: '' },
    descriptionLength: { status: 'error', message: '' },
    keywordInTitle: { status: 'error', message: '' },
    keywordInDescription: { status: 'error', message: '' },
    keywordDensity: { status: 'error', message: '' },
    contentLength: { status: 'error', message: '' },
    readability: { status: 'warning', message: '' },
  };

  let score = 0;
  const maxScore = 100;
  let earnedScore = 0;

  // 1. Title Length (Optimal: 50-60 chars)
  const titleLen = title.length;
  if (titleLen >= 50 && titleLen <= 60) {
    checks.titleLength = { status: 'good', message: 'Title length is optimal (50-60 characters).' };
    earnedScore += 15;
  } else if (titleLen > 0 && titleLen < 50) {
    checks.titleLength = { status: 'warning', message: 'Title is a bit short. Try to make it 50-60 characters.' };
    earnedScore += 10;
  } else if (titleLen > 60) {
    checks.titleLength = { status: 'warning', message: 'Title is too long. Keep it under 60 characters.' };
    earnedScore += 5;
  } else {
    checks.titleLength = { status: 'error', message: 'Title is missing.' };
  }

  // 2. Description Length (Optimal: 150-160 chars)
  const descLen = description.length;
  if (descLen >= 150 && descLen <= 160) {
    checks.descriptionLength = { status: 'good', message: 'Description length is optimal (150-160 characters).' };
    earnedScore += 15;
  } else if (descLen > 0 && descLen < 150) {
    checks.descriptionLength = { status: 'warning', message: 'Description is a bit short. Try to make it 150-160 characters.' };
    earnedScore += 10;
  } else if (descLen > 160) {
    checks.descriptionLength = { status: 'warning', message: 'Description is too long. Keep it under 160 characters.' };
    earnedScore += 5;
  } else {
    checks.descriptionLength = { status: 'error', message: 'Meta description is missing.' };
  }

  // Focus Keyword Checks
  const keyword = focusKeyword.trim().toLowerCase();
  if (keyword) {
    // 3. Keyword in Title
    if (title.toLowerCase().includes(keyword)) {
      checks.keywordInTitle = { status: 'good', message: 'Focus keyword found in the SEO title.' };
      earnedScore += 20;
    } else {
      checks.keywordInTitle = { status: 'error', message: 'Focus keyword not found in the SEO title.' };
    }

    // 4. Keyword in Description
    if (description.toLowerCase().includes(keyword)) {
      checks.keywordInDescription = { status: 'good', message: 'Focus keyword found in the SEO description.' };
      earnedScore += 15;
    } else {
      checks.keywordInDescription = { status: 'error', message: 'Focus keyword not found in the SEO description.' };
    }

    // 5. Keyword Density in Content
    const contentLower = content.toLowerCase();
    // Remove HTML tags for word count
    const plainText = contentLower.replace(/<[^>]*>?/gm, '');
    const words = plainText.split(/\s+/).filter(w => w.length > 0);
    const wordCount = words.length;
    
    if (wordCount > 0) {
      const keywordRegex = new RegExp(`\\b${keyword}\\b`, 'gi');
      const keywordMatches = plainText.match(keywordRegex);
      const keywordCount = keywordMatches ? keywordMatches.length : 0;
      const density = (keywordCount / wordCount) * 100;

      if (density >= 1 && density <= 2.5) {
        checks.keywordDensity = { status: 'good', message: `Keyword density is optimal (${density.toFixed(2)}%).` };
        earnedScore += 15;
      } else if (density > 0 && density < 1) {
        checks.keywordDensity = { status: 'warning', message: `Keyword density is low (${density.toFixed(2)}%). Try using it more.` };
        earnedScore += 5;
      } else if (density > 2.5) {
        checks.keywordDensity = { status: 'warning', message: `Keyword density is high (${density.toFixed(2)}%). Be careful of keyword stuffing.` };
        earnedScore += 5;
      } else {
        checks.keywordDensity = { status: 'error', message: 'Focus keyword not found in the content.' };
      }
    } else {
      checks.keywordDensity = { status: 'error', message: 'Content is empty.' };
    }
  } else {
    checks.keywordInTitle = { status: 'error', message: 'Set a focus keyword to check title.' };
    checks.keywordInDescription = { status: 'error', message: 'Set a focus keyword to check description.' };
    checks.keywordDensity = { status: 'error', message: 'Set a focus keyword to check density.' };
  }

  // 6. Content Length
  const plainText = content.replace(/<[^>]*>?/gm, '');
  const wordCount = plainText.split(/\s+/).filter(w => w.length > 0).length;
  if (wordCount >= 600) {
    checks.contentLength = { status: 'good', message: `Content is long enough (${wordCount} words).` };
    earnedScore += 10;
  } else if (wordCount >= 300) {
    checks.contentLength = { status: 'warning', message: `Content is a bit short (${wordCount} words). Consider adding more.` };
    earnedScore += 5;
  } else {
    checks.contentLength = { status: 'error', message: `Content is too short (${wordCount} words). Aim for at least 300 words.` };
  }

  // 7. Readability (Simple heuristic: average sentence length)
  const sentences = plainText.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const avgSentenceLength = sentences.length > 0 ? wordCount / sentences.length : 0;
  
  if (avgSentenceLength > 0 && avgSentenceLength <= 20) {
    checks.readability = { status: 'good', message: 'Good readability. Sentences are easy to read.' };
    earnedScore += 10;
  } else if (avgSentenceLength > 20) {
    checks.readability = { status: 'warning', message: 'Sentences are a bit long. Try to use shorter sentences for better readability.' };
    earnedScore += 5;
  } else {
    checks.readability = { status: 'warning', message: 'Not enough content to check readability.' };
  }

  score = Math.round((earnedScore / maxScore) * 100);

  return { score, checks };
}
