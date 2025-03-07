import contactModalHTML from './contactmodal.html';
import contactModalCSS from './contactmodal.css';

class ContactModal {
    constructor(options = {}) {
        this.defaults = {
            endpoint: '/contact',
            position: 'right',
            name: true,
            delay: 5,
            values: { name: '', email: '' },
            token: { name: null, value: null },
            colors: { bg: '#242424', text: '#ffffff', details: '#ffffff' },
            texts: {
                title: "Let's have a chat!",
                subtitle: '',
                namePlaceholder: 'Your name',
                emailPlaceholder: 'Your email',
                messagePlaceholder: 'Your message',
                successMssg: 'Thanks, your message has been sent!',
                errorMssg: 'Uh-oh... Something went wrong. Please try again later.',
                buttonText: 'Send'
            }
        };

        // replace defaults with passed in options
        this.options = { ...this.defaults, ...options };
            
        // handle nested options
        if (options.values) {
            this.options.values = { ...this.defaults.values, ...options.values };
        }
        if (options.colors) {
            this.options.colors = { ...this.defaults.colors, ...options.colors };
        }
        if (options.texts) {
            this.options.texts = { ...this.defaults.texts, ...options.texts };
        }
        if (options.token) {
            this.options.token = { ...this.defaults.token, ...options.token };
        }

        this.#setupModal();
    }

    #setupModal() {
        // modal content
        let html = contactModalHTML;

        // replace all placeholders
        Object.keys(this.options.values).forEach((key) => {
            html = html.replace(`{{ ${key} }}`, this.options.values[key] || '');
        });

        // replace all placeholders
        Object.keys(this.options.texts).forEach((key) => {
            html = html.replace(`{{ ${key} }}`, this.options.texts[key] || '');
        });

        // create modal container
        this.modal = document.createElement('div');
        this.modal.id = 'contactmodal';
        this.modal.className = this.options.position;
        this.modal.innerHTML = html;

        // get form
        this.form = this.modal.querySelector('form');

        // set modal colours
        document.documentElement.style.setProperty('--bg-color', this.options.colors.bg);
        document.documentElement.style.setProperty('--text-color', this.options.colors.text);
        document.documentElement.style.setProperty('--details-color', this.options.colors.details);

        // handle name field visibility
        if (!this.options.name) {
            const nameField = this.form.querySelector('#user_name');
            nameField.required = false;
            nameField.parentElement.style.display = 'none';
        }
    
        // handle subtitle visibility
        if (!this.options.texts.subtitle) {
            this.modal.querySelector('.contactmodal__sub-title').style.display = 'none';
        }

        this.modal.querySelector('.contactmodal__btn').addEventListener('click', () => this.toggle());
        this.modal.querySelector('.contactmodal__exit').addEventListener('click', () => this.toggle());
        this.form.addEventListener('submit', (e) => this.#submitForm(e));

        // append css to head
        const style = document.createElement('style');
        style.textContent = contactModalCSS;
        document.head.appendChild(style);

        // append modal to body
        const docFrag = document.createDocumentFragment();
        docFrag.appendChild(this.modal);
        document.body.appendChild(docFrag);
    }

    toggle() {
        this.modal.classList.toggle('contactmodal--open');
    }

    async #submitForm(e) {
        e.preventDefault();
    
        const form = this.form;
        const loadingOverlay = this.modal.querySelector(".contactmodal__overlay--loading");
        const successOverlay = this.modal.querySelector(".contactmodal__overlay--success");
        const errorOverlay = this.modal.querySelector(".contactmodal__overlay--error");
        
        // show loading overlay
        loadingOverlay.classList.add("contactmodal__overlay--visible");
    
        // gather form data
        const name = form.querySelector('#user_name')?.value || null;
        const email = form.querySelector('#user_email').value;
        const message = form.querySelector('#user_message').value;
        const { token } = this.options;
    
        // prepare payload
        const payload = { 
            name, 
            email, 
            message,
            page: window.location.href,
            token: (token.name && token.value) ? token : null
        };

        try {
            const response = await fetch(this.options.endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
        
            // reset form and loading state
            form.reset();
            form.querySelector('button').blur();
            loadingOverlay.classList.remove('contactmodal__overlay--visible');
            
            // handle response
            if (response.ok) {
                successOverlay.classList.add("contactmodal__overlay--visible");
    
                setTimeout(() => {
                    successOverlay.classList.remove('contactmodal__overlay--visible');
                }, this.options.delay * 1000);
            } else {
                throw new Error('Server responded with an error');
            }
        } catch (error) {
            // handle errors
            console.error('Form submission error:', error);
            form.reset();
            form.querySelector('button').blur();
            loadingOverlay.classList.remove('contactmodal__overlay--visible');
            errorOverlay.classList.add("contactmodal__overlay--visible");
            
            setTimeout(() => {
                errorOverlay.classList.remove('contactmodal__overlay--visible');
            }, this.options.delay * 1000);
        }
    }
}

// export class for module usage
export default ContactModal;

// assign to window for normal script tags
window.ContactModal = ContactModal;
