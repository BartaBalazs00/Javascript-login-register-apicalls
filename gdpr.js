export class GDPR {
    constructor() {
        this.storageKey = "gdprConsent";
        this.container = document.getElementById("gdpr-container");
    }
  
    init() {
        const consent = localStorage.getItem(this.storageKey);
  
        if (!consent) {
            this.renderBanner();
        }
    }
  
    renderBanner() {
        const banner = document.createElement("div");
        banner.className =
            "alert alert-info fixed-bottom m-0 text-center rounded-0 d-flex justify-content-between align-items-center p-3 shadow";

        banner.innerHTML = 
        `
            <div class="text-start">
                <strong>GDPR tájékoztató:</strong> Az oldal sütiket használ a jobb felhasználói élmény érdekében.
                    Kérjük, fogadd el vagy utasítsd el az adatkezelést.
                </div>
                <div class="text-end">
                    <button id="gdpr-accept" class="btn btn-success btn-sm me-2">Elfogadom</button>
                <button id="gdpr-reject" class="btn btn-danger btn-sm">Elutasítom</button>
            </div>
        `;
  
        this.container.appendChild(banner);
  
        document
        .getElementById("gdpr-accept")
        .addEventListener("click", () => this.setConsent("accepted"));
        document
        .getElementById("gdpr-reject")
        .addEventListener("click", () => this.setConsent("rejected"));
    }
  
    setConsent(status) {
        localStorage.setItem(this.storageKey, status);
        this.removeBanner();
  
        console.log(`GDPR döntés: ${status}`);
    }
  
    removeBanner() {
        if (this.container) {
            this.container.innerHTML = "";
        }
    }
}