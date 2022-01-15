(function() {
  this.ContactModal = function() {
    this.box = null;
    this.form = null;

    const defaults = {
      endpoint: 'submit.php',
      position: 'right',
      name: true,
      email: null,
      delay: 5,
      token: {
        name: null,
        value: null
      },
      colors: {
        bg: '#242424',
        text: '#ffffff',
        details: '#242424'
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
    }

    if (arguments[0] && typeof arguments[0] === "object") {
      this.options = extendDefaults(defaults, arguments[0]);
    }

    this.render();
  };

  ContactModal.prototype.render = function() {
    const docFrag = document.createDocumentFragment();

    const nameInput = (typeof this.options.name == 'string' && this.options.name) ? `<input class="input" id="user_name" type="text" placeholder="${this.options.texts.namePlaceholder}" required value="${this.options.name}"></input>` : `<input class="input" id="user_name" type="text" placeholder="${this.options.texts.namePlaceholder}" required></input>`;
    const emailInput = (typeof this.options.email == 'string' && this.options.email) ? `<input class="input" id="user_email" type="email" placeholder="${this.options.texts.emailPlaceholder}" required value="${this.options.email}"></input>` : `<input class="input" id="user_email" type="email" placeholder="${this.options.texts.emailPlaceholder}" required></input>`;
    
    this.box = document.createElement('div');
    this.box.id = 'contactmodal';
    this.box.className = `${this.options.position}`;
    this.box.innerHTML = `
      <button class="contactmodal__btn contactmodal__click">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" viewBox="0 0 120 90">
          <path d="M60,0 l50,0 a10,10 0 0,1 7,17 l-50,50 a10,10 0 0,1 -13,0 l-50,-50 a10,10 0 0,1 7,-17z" stroke="#000" stroke-width="0" />
          <path d="M60,90 l54,0 a10,10 0 0,0 7,-7 l0,-60 -50,50 a15,15 0 0,1 -21,0 l-50,-50 0,60 a10,10 0 0,0 7,7z" stroke="#000" stroke-width="0" />  
        </svg>
      </button>
      <div class="contactmodal">
        <div class="contactmodal__contact">
          <div class="contactmodal__exit contactmodal__click">&#215;</div>
          <h3 class="contactmodal__title contactmodal__title--contact">
            ${this.options.texts.title}
          </h3>
          <h3 class="contactmodal__sub-title contactmodal__sub-title--contact">
            ${this.options.texts.subtitle}
          </h3>
          <form id="contact__form" class="contactmodal__form">
            <div class="form__item">
              ${nameInput}
            </div>
            <div class="form__item">
              ${emailInput}
            </div>
            <div class="form__item">
              <textarea class="input" id="user_message" type="text" placeholder="${this.options.texts.messagePlaceholder}" required></textarea>
            </div>
            <button id="contact__submit" class="form__submit">
              ${this.options.texts.buttonText}
            </button>
          </form>
          <div class="contactmodal__overlay contactmodal__overlay--loading">
            <div class="contactmodal__spinner"></div>
          </div>
          <div class="contactmodal__overlay contactmodal__overlay--success">
            ${this.options.texts.successMssg}
          </div>
          <div class="contactmodal__overlay contactmodal__overlay--error">
            ${this.options.texts.errorMssg}
          </div>
        </div>
      </div>
    `;

    this.form = this.box.querySelector('.contactmodal__form');

    if (this.options.name == false || this.options.name == null) {
      const nameField = this.form.querySelectorAll('.form__item')[0];
      nameField.querySelector('input').required = false;
      nameField.style.display = 'none';
    }

    if (!this.options.texts.subtitle) {
      this.box.querySelector('.contactmodal__sub-title').style.display = 'none';
    }

    document.querySelector(':root').style.setProperty('--bg-color', this.options.colors.bg);
    document.querySelector(':root').style.setProperty('--text-color', this.options.colors.text);
    document.querySelector(':root').style.setProperty('--details-color', this.options.colors.details);
    
    docFrag.appendChild(this.box);
    document.body.appendChild(docFrag);
  
    this.listen();
  };

  ContactModal.prototype.listen = function() {
    const self = this;

    this.box.querySelector('.contactmodal__btn').addEventListener('click', () =>  self.toggle());
    this.box.querySelector('.contactmodal__exit').addEventListener('click', () =>  self.toggle());
    this.form.addEventListener('submit', (e) => self.contact(e));
  };

  ContactModal.prototype.toggle = function() {
    this.box.classList.toggle('contactmodal--open');
  };

  ContactModal.prototype.contact = function(e) {
    e.preventDefault();

    const self = this;
    const form = this.form;

    const loading = this.box.querySelector(".contactmodal__overlay--loading");
    const success = this.box.querySelector(".contactmodal__overlay--success");
    const error = this.box.querySelector(".contactmodal__overlay--error");
    loading.classList += " contactmodal__overlay--visible";

    const name = form.querySelector('#user_name').value || null;
    const email = this.options.email || form.querySelector('#user_email').value;
    const message = form.querySelector('#user_message').value;
    const token = this.options.token;

    const xhr = new XMLHttpRequest();    
    xhr.open('POST', this.options.endpoint);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
      form.reset();
      form.querySelector('button').blur();
      loading.classList.remove('contactmodal__overlay--visible');
      
      if (xhr.status === 200) {
        success.classList += " contactmodal__overlay--visible";

        setTimeout(() => {
          success.classList.remove('contactmodal__overlay--visible');
        }, self.options.delay * 1000);
      } else {
        error.classList += " contactmodal__overlay--visible";

        setTimeout(() => {
          error.classList.remove('contactmodal__overlay--visible');
        }, self.options.delay * 1000);
      }
    };
    xhr.onerror = function() {
      form.reset();
      form.querySelector('button').blur();
      loading.classList.remove('contactmodal__overlay--visible');
      error.classList += " contactmodal__overlay--visible";

      setTimeout(() => {
        error.classList.remove('contactmodal__overlay--visible');
      }, self.options.delay * 1000);
    };

    if (token.name && token.value) {
      xhr.send(JSON.stringify({ 
        name, 
        email, 
        message, 
        page: window.location.href,
        token 
      }));
    } else {
      xhr.send(JSON.stringify({ 
        name, 
        email, 
        message,
        page: window.location.href
      }));
    }
  };

  // Helper Function
  function extendDefaults(defaults, properties) {
    for (let prop in defaults) {
      if (properties.hasOwnProperty(prop)) {
        if (typeof defaults[prop] === 'object' && defaults[prop] !== null) {
          for (subprop in defaults[prop]) {
            if (properties[prop].hasOwnProperty(subprop)) {
              defaults[prop][subprop] = properties[prop][subprop];
            }
          }
        } else {
          defaults[prop] = properties[prop];
        }
      }
    }

    return defaults;
  };
})();