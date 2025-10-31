// Social Sharing Handler
(function() {
  'use strict';

  // Get current page info
  function getShareInfo() {
    const title = document.querySelector('.headline')?.textContent || document.title;
    const url = window.location.href;
    const description = document.querySelector('meta[name="description"]')?.content ||
                       'Learn institutional trading concepts from Signal Pilot';

    return { title, url, description };
  }

  // Share handlers
  const shareHandlers = {
    twitter: (info) => {
      const text = `${info.title}\n\n${info.url}\n\nvia @SignalPilot`;
      return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    },

    reddit: (info) => {
      return `https://reddit.com/submit?url=${encodeURIComponent(info.url)}&title=${encodeURIComponent(info.title)}`;
    },

    linkedin: (info) => {
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(info.url)}`;
    },

    hackernews: (info) => {
      return `https://news.ycombinator.com/submitlink?u=${encodeURIComponent(info.url)}&t=${encodeURIComponent(info.title)}`;
    },

    copy: async (info) => {
      try {
        await navigator.clipboard.writeText(info.url);

        // Show toast
        const toast = document.getElementById('share-toast');
        if (toast) {
          toast.style.display = 'block';
          setTimeout(() => {
            toast.style.display = 'none';
          }, 3000);
        }

        return null; // Don't open new window
      } catch (err) {
        console.error('Failed to copy:', err);
        return null;
      }
    }
  };

  // Attach click handlers
  document.addEventListener('DOMContentLoaded', () => {
    const shareButtons = document.querySelectorAll('[data-share]');

    shareButtons.forEach(button => {
      button.addEventListener('click', async (e) => {
        e.preventDefault();

        const shareType = button.dataset.share;
        const handler = shareHandlers[shareType];

        if (handler) {
          const info = getShareInfo();
          const url = await handler(info);

          if (url) {
            window.open(url, '_blank', 'width=600,height=400');
          }

          // Track share event
          if (window.plausible) {
            window.plausible('Social Share', { props: { platform: shareType } });
          }
        }
      });
    });
  });
})();
