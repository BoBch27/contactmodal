import contactModalHTML from './contactmodal.html';
import contactModalCSS from './contactmodal.css';

class ContactModal {
    constructor(options = {}) {
        this.defaults = {
            endpoint: '/contact',
            position: 'right',
            name: true,
            delay: 5,
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
}

// export class for module usage
export default ContactModal;

// assign to window for normal script tags
window.ContactModal = ContactModal;
