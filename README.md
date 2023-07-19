This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Dear user (if there are any lol), it is important that the web server of the NodeMcu ESP8266 ESP-12E is running for this LED controller to function properly (more information in the repository led-controller-NodeMcu). You can access the LED controller, as described above, at localhost:3000. On the /led-Controller page, you can adjust the colors and brightness of the LED strip, as well as turn it on or off. On the /device page, you can add devices and see if they are online or offline in your network.

Known bugs so far:
Data is sometimes not received correctly, which means that sometimes you may need to press the "Send" button one or two more times before the LED strip accepts the desired color