class Controls {
    // controls of the car 
    constructor(forward, left, right, reverse) {
        this.forward = false;
        this.left = false;
        this.right = false;
        this.reverse = false;
// # makes it a private methode 
        this.#addKeyboardListeners();
    }
    
    // on push of button
    #addKeyboardListeners() {
        // the arrow function allows you to refer to the this. above 
        document.onkeydown = (event) => {
            switch (event.key) {
                case "ArrowLeft":
                    this.left = true;
                    break;
                case "ArrowRight":
                    this.right = true;
                    break;
                case "ArrowDown":
                    this.reverse = true;
                    break;
                case "ArrowUp":
                    this.forward = true;
                    break;
            }
            // view what buttons are being clicked on the console
            console.table(this);
        }
        
        // on release of button
        document.onkeyup = (event) => {
            switch (event.key) {
                case "ArrowLeft":
                    this.left = false;
                    break;
                case "ArrowRight":
                    this.right = false;
                    break;
                case "ArrowDown":
                    this.reverse = false;
                    break;
                case "ArrowUp":
                    this.forward = false;
                    break;
            }
            // view what buttons are being clicked
            console.table(this);
        }
    }
}
