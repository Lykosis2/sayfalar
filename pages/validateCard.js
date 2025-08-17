import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ValidateCard() {
  const router = useRouter();
  const state = router.query;
  const htmlContent = decodeURIComponent(state.htmlContent || '');

  useEffect(() => {
    if (htmlContent) {
      const container = document.getElementById('html-content-container');
      const scriptTags = container.querySelectorAll('script');

      scriptTags.forEach((scriptTag) => {
        const script = document.createElement('script');
        script.text = scriptTag.textContent;
        document.body.appendChild(script);
      });
    }
  }, [htmlContent]); // Dependency array ensures this runs only when htmlContent changes

  if (state && state.htmlContent) {
    return (
      <div style={{ width: '100%', height: '400px' }}>
        <p>HTML Content:</p>
        <div
          id="html-content-container"
          style={{ width: '100%', height: '100%', overflow: 'auto' }}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    );
  }

  return <div>No HTML content provided in state.</div>;
}
