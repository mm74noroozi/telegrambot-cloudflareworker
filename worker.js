export default {
  async fetch(request, env) {
    try {
      const { pathname } = new URL(request.url);
      const contentType = request.headers.get('Content-Type');
      if (pathname.startsWith("/notif")) {
        let message = 'Hi from cloudflare'
        let photo = "http://tange.s3.ir-thr-at1.arvanstorage.com/MN.JPG"
        if (request.method === 'POST' && contentType.includes('application/json'))  {
          const body = await request.json();
          message = body.message;
          if(body.photo){
            photo = body.photo
          }
        }
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            chat_id: <chat_id>,
            caption: message,
            photo: photo,
            parse_mode: "HTML"
          })
        }
        // return new Response(JSON.stringify(options))
        return fetch("https://api.telegram.org/<bot_token>/sendPhoto", options);
      }
      return fetch("https://s100.divarcdn.com/static/photo/thumbnail/NDnxJq0cctC_Va8-t3Fn0w/c9e17691-fad4-48a0-b462-3e484fcfb110.jpg")
    } catch(e) {
      return new Response(e.stack, { status: 500 })
    }
  }
}
