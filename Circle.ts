class Circle {
    public x: number;
    public y: number;
    public radius: number;

    constructor(x: number, y: number, radius: number) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    isOverlapping(otherCircle: Circle) {
        var diff = [
            otherCircle.x - this.x,
            otherCircle.y - this.y
        ];

        return Math.sqrt(diff[0] * diff[0] + diff[1] * diff[1]) < this.radius + otherCircle.radius;
    }

    render(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.closePath();

        context.fill();
    }
}