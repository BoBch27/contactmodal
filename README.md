# ContactModal
ContactModal is an easy to use, elegant contact form modal.
It allows your visitors to contact you easily from any page of your website.
It's written in pure JavaScript and needs you to handle the backend side.

## Demo
A live demo is available [here](https://bobbydonev.com).

## How to use
### CDN
Include the following tag in the `<head>` section of your website's HTML: <br>
`<script src="https://cdn.jsdelivr.net/gh/bobch27/contactmodal@1.0.0/dist/contactmodal.min.js"></script>`

### NPM
`npm install contactmodal`
```javascript
  import ContactModal from 'contactmodal'
```

Create an endpoint in your backend. The data is sent in JSON format by a POST request with the parameters `name`, `email`, `message` and `page`.

A `phone` and `token` options are also available if your application needs to pass these parameters to the backend. To allow these options, use the options as shown below.

Add the following script (these are the default values - all fields are optional):
```javascript
new ContactModal({
  endpoint: '/contact', // Define your endpoint for the POST request
  position: 'right', // Possible values are 'left' or 'right'.
  delay: 5, // Set the delay after which the success/error message is hidden and form is reset (in seconds)
  name: true, // Show a name field. Possible values are true/false.
  phone: false, // Show a phone field. Possible values are true/false.
  values: { // Populate fields if you already know user's data.
    name: '', // Possible value is a string
    phone: '', // Possible value is a string
    email: '', // Possible value is a string
  }
  token: { // Both name and value are required in order to send the token with the request.
    name: null, // Possible values are null or a string
    value: null // Possible values are null or a string
  },
  colors: { // Possible values are HEX color "#000000" or color name "black".
    bg: '#242424', // Sets the background color.
    text: '#ffffff', // Sets the text color.
    details: '#ffffff' // Sets an additional color used in various places in the modal.
  },
  texts: {
    title: 'Let\'s have a chat!',
    subtitle: null, // Optional - if unset, no subtitle will be shown
    namePlaceholder: 'Your name',
    phonePlaceholder: 'Your phone',
    emailPlaceholder: 'Your email',
    messagePlaceholder: 'Your message',
    successMssg: 'Thanks, your message has been sent!',
    errorMssg: 'Uh-oh... Something went wrong. Please try again later.',
    buttonText: 'Send'
  }
});
```

## Available Method
You can show or hide ContactModal with the `toggle` method:
```javascript
const ContactModal = new ContactModal({
  endpoint: 'http://yourwebsite.com/contact'
});

ContactModal.toggle();
``` 