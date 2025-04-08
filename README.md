# ContactModal

**ContactModal** is a lightweight and elegant contact form modal that allows visitors to easily contact you from any page on your website. It is written in pure JavaScript and requires backend handling for form submissions.

## 🚀 Live Demo

Check out the [live demo](https://bobbydonev.com) to see ContactModal in action.

---

## 📌 Installation

### 📦 CDN (Recommended)

Include the following script in your website's `<head>` section:

```html
<script src="https://cdn.jsdelivr.net/gh/bobch27/contactmodal@1.0.3/dist/contactmodal.min.js"></script>
```

### 📦 NPM

Install via NPM:

```sh
npm install contactmodal
```

Import it in your JavaScript file:

```javascript
import ContactModal from 'contactmodal';
```

---

## ⚙️ Setup & Configuration

### Backend Requirements

ContactModal sends form data via a `POST` request in JSON format with the following parameters:

- `name`
- `email`
- `message`
- `page`
- *(Optional)* `phone` and `token`

### Initialisation

Add the following script to configure ContactModal. All fields are optional, and default values are provided:

```javascript
new ContactModal({
  endpoint: '/contact', // Backend endpoint for form submission
  position: 'right', // 'left' or 'right'
  delay: 5, // Time (in seconds) before the form resets after submission
  name: true, // Show name field (true/false)
  phone: false, // Show phone field (true/false)
  values: { // Pre-fill form fields (optional)
    name: '',
    phone: '',
    email: ''
  },
  token: { // Optional security token
    name: null,
    value: null
  },
  colors: { // Customise modal appearance
    bg: '#242424', // Background colour
    text: '#ffffff', // Text colour
    details: '#ffffff' // Accent colour
  },
  texts: { // Customise modal text
    title: "Let's have a chat!",
    subtitle: null, // Optional subtitle
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

---

## 📖 Methods

### `toggle()` - Show or Hide ContactModal

You can programmatically open or close the modal using:

```javascript
const contactModal = new ContactModal({
  endpoint: 'http://yourwebsite.com/contact'
});

contactModal.toggle();
```

---

## 📝 Notes

- Ensure your backend properly handles JSON requests from the modal.
- The modal is fully customisable through the options provided.
- For feature requests or bug reports, please open an issue on GitHub.

---
