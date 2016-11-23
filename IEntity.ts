interface IEntity {
    update(): void;
    render(context: CanvasRenderingContext2D): void;

    onMouseMove(x: number, y: number): void;
}