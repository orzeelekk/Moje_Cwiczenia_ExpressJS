import { html, render } from './../node_modules/lit-html/lit-html.js';

export class ModalService {
    constructor(rootElement) {
        this.rootElement = rootElement;
    }

    showModal(template) {
        render(html`
            <div class="modal-overlay">
                <div class="modal-container">
                    ${template}
                </div>
            </div>
        `, this.rootElement);
    }

    closeModal() {
        render('', this.rootElement);
    }

}
