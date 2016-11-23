class Player implements IEntity {
    private circle: Circle;

    private game: Game;

    constructor(game: Game) {
        this.game = game;

        this.circle = new Circle(0, 0, 20);
    }

    render(context: CanvasRenderingContext2D) {
        // Set the player color
        context.fillStyle = "red";

        // Render the player
        this.circle.render(context);
    }

    update() {
        // Nothing to do here since the player is controlled via mouse input
    }

    onMouseMove(x: number, y: number) {
        this.circle.x = x;
        this.circle.y = y;

        // TODO: check for collision with other entities
        // if there is a collision we have to trigger the game over event
        // e.g. this.game.gameLost();
        // We can get all game entities using this.game.getEntities();
    }
}