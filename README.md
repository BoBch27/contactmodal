# ContactModal
ContactModal is an easy to use, elegant contact form modal.
It allows your visitors to contact you easily from any page of your website.
It's written in pure JavaScript and needs you to handle the backend side.

## Demo
A live demo is available [here](https://www.bobbydonev.co.uk).

## How to use
Include the following tags in the `<head>` section of your website's HTML: <br>
`<script src="https://cdn.jsdelivr.net/gh/bobch27/contactmodal@0.1.0/dist/contactmodal.min.js"></script>`<br>
`<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/bobch27/contactmodal@0.1.0/dist/contactmodal.min.css">`

Create an endpoint in your backend. The data is sent in JSON format by a POST request with the parameters `name`, `email`, `message` and `page`.

A token option is also available if your application needs to pass this parameter to the backend. To allow the token option, include a token name and value, as shown below.

Add the following script (these are the default values - only the `endpoint` is required, the rest are optional):
```javascript
new ContactModal({
  endpoint: 'submit.php', // Define your endpoint for the POST request
  position: 'right', // Possible values are 'left' or 'right'.
  delay: 5, // Set the delay after which the success/error message is hidden and form is reset (in seconds)
  name: true, // Populate the name field if you already know user's name. Possible values are true/false (to toggle whether the field is shown in the form), or a string containing the name.
  email: null, // // Populate the email field if you already know user's email. Possible values are null (if you don't know their email), or a string containing the email.
  token: { // Both name and value are required in order to send the token with the request.
    name: null, // Possible values are null or a string
    value: null // Possible values are null or a string
  },
  colors: { // Possible values are HEX color "#000000" or color name "black".
    bg: '#242424', // Sets the background color.
    text: '#ffffff', // Sets the text color.
    details: '#242424' // Sets an additional color used in various places in the modal.
  },
  texts: {
    title: 'Let\'s have a chat!',
    subtitle: null,
    namePlaceholder: 'Your name',
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
  endpoint: 'http://yourwebsite.com/form.php'
});

ContactModal.toggle();
``` 