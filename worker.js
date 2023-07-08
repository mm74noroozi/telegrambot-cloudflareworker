export default {
  async fetch(request, env) {
    const bot_token = "sample_bot_token";
    const chat_id = 123456789;
    try {
      const { pathname } = new URL(request.url);
      const contentType = request.headers.get('content-type');
      if (pathname.startsWith("/notif")) {
        let message = 'Hi from cloudflare' 
        if (request.method === 'POST' && contentType.includes('application/json'))  {
          const body = await request.json();
          message = body.message;
        }
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            chat_id: chat_id,
            text: message
          })
        }
        return fetch(`https://api.telegram.org/${bot_token}/sendMessage`,options);
      }
    } catch(e) {
      return new Response(err.stack, { status: 500 })
    }
  }
}
