import {
    AfterViewInit,
    Component,
    ElementRef,
    HostBinding,
    HostListener,
    Input,
    OnInit,
    ViewChild,
} from '@angular/core';
import { StrokeColors } from './model';

@Component({
    selector: 'app-canvas',
    templateUrl: './canvas.component.html',
    styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements OnInit, AfterViewInit {
    @Input() canvasWidth: number = 500;
    @Input() canvasHeight: number = 500;
    @Input() borderWidth: number = 10;
    @ViewChild('canvasRef', { static: true }) canvasRef!: ElementRef;
    canvas!: HTMLCanvasElement;
    context!: CanvasRenderingContext2D;
    deltaX: number = 0;
    deltaY: number = 0;
    isMouseDown: boolean = false;
    @HostListener('mousedown', ['$event'])
    onMouseDown(e: MouseEvent) {
        this.isMouseDown = true;
        const { x, y } = this._getRealCoords(e.clientX, e.clientY);
        this.context.moveTo(x, y);
    }
    @HostListener('mouseup') onMouseUp() {
        this.isMouseDown = false;
    }
    @HostListener('window:mousemove', ['$event']) onMouseMove(e: MouseEvent) {
        if (!this.isMouseDown) return;
        const el = e.target as HTMLElement;
        !el.closest('.canvas') && (this.isMouseDown = false);
        const { x, y } = this._getRealCoords(e.clientX, e.clientY);
        this._draw(x, y);
    }
    @HostListener('window:scroll') onWindowScroll() {
        this._setDeltas();
    }

    constructor() {}

    ngOnInit(): void {
        this.canvas = this.canvasRef.nativeElement as HTMLCanvasElement;
        this.canvas.style.border = `${this.borderWidth}px groove red`;
        this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;

        this._setCanvasSizes(this.canvasWidth, this.canvasHeight);
        this.setStrokeColor('red');
        this.setLineWidth(2);
    }

    ngAfterViewInit(): void {
        this._setDeltas();
    }

    private _getRect(): DOMRect {
        return this.canvas.getBoundingClientRect();
    }

    private _setDeltas() {
        this.deltaY = this._getRect().top;
        this.deltaX = this._getRect().left;
    }

    private _setCanvasSizes(width: number, height: number): void {
        this.canvas.width = width;
        this.canvas.height = height;
    }

    public setLineWidth(width: number) {
        this.context.lineWidth = width;
    }

    public setStrokeColor(color: StrokeColors) {
        this.context.strokeStyle = color;
    }

    private _draw(x: number, y: number): void {
        this.context.lineTo(x, y);
        this.context.stroke();
    }

    private _getRealCoords(xCoord: number, yCoord: number): { x: number; y: number } {
        const x = xCoord - this.deltaX - this.borderWidth;
        const y = yCoord - this.deltaY - this.borderWidth;
        return { x, y };
    }

    public clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
