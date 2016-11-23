class Game {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    private entities: IEntity[] = [];

    private gameIsLost: boolean = false;

    /**
     * Initializes the game
     */
    initialize() {
        this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");

        this.canvas.width = document.body.offsetWidth;
        this.canvas.height = document.body.offsetHeight;

        this.registerEventHandlers();

        // Add the player to the game
        this.addEntity(new Player(this));

        // Request the first frame
        this.requestNextFrame();
    }

    /**
     * Adds the given entity to the game.
     */
    addEntity(entity: IEntity) {
        this.entities.push(entity);
    }
    /**
     * Removes the given entity from the game.
     */
    removeEntity(entity: IEntity) {
        this.entities.splice(this.entities.indexOf(entity), 1);
    }

    /**
     * Call this function to trigger the game over event
     */
    gameLost() {
        this.gameIsLost = true;
    }

    /**
     * Returns a copy of all entities part of the game.
     */
    getEntities(): IEntity[] {
        return this.entities.slice();
    }

    /**
     * Register the input event handlers
     */
    private registerEventHandlers() {
        // Mouse moved event
        this.canvas.addEventListener("mousemove", (e) => {
            if(!this.gameIsLost) {
                for(var entity of this.entities) {
                    entity.onMouseMove(e.x, e.y);
                }
            }
        });
    }

    /**
     * Renders the game
     */
    private render() {
        // Clear screen
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for(var entity of this.entities) {
            this.context.save();
            entity.render(this.context);
            this.context.restore();
        }

        if(this.gameIsLost) {
            this.context.save();

            this.context.fillStyle = "red";
            this.context.strokeStyle = "black";
            this.context.lineWidth = 5;
            this.context.font = "100px Arial";

            var textSize = this.context.measureText("Game Over!").width;

            this.context.fillText("Game Over!", (this.canvas.width / 2) - (textSize / 2), 200);
            this.context.strokeText("Game Over!", (this.canvas.width / 2) - (textSize / 2), 200);

            this.context.restore();
        }
    }

    /**
     * Updates the game
     */
    private update() {
        if(!this.gameIsLost) {
            for(var entity of this.entities) {
                entity.update();
            }
        }
    }

    /**
     * Requests a render frame.
     */
    private requestNextFrame() {
        window.requestAnimationFrame(() => {
            this.update();
            this.render();

            this.requestNextFrame();
        });
    }
}