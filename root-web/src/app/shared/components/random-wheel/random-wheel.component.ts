import { Component, Input, ViewChild, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { IRandomWheelSegment, ISegmentWithFullData, IWinResult, RandomWheelTimeOptions } from 'src/app/core';
import { AppState } from 'src/app/core/store/store';
import { selectUserName } from 'src/app/core/store/user';

@Component({
    selector: 'app-random-wheel',
    templateUrl: './random-wheel.component.html',
    styleUrls: ['./random-wheel.component.scss'],
})
export class RandomWheelComponent implements OnDestroy {
    @Input() segments: IRandomWheelSegment[] = [];
    @Input() rotationCount: number = 5;
    @Input() size: number = 350;
    @Input() rotationTimeMS: RandomWheelTimeOptions = 2000;
    @Output() winnerValue: EventEmitter<IWinResult> = new EventEmitter<IWinResult>();
    segmentsCount!: number;
    segmentHeight!: number;
    segmentWidth!: number;
    angleRangePerSegment!: number;
    segmentsWithFullData: ISegmentWithFullData[] = [];
    @ViewChild('wheelRef', { static: true }) wheelWrapper!: ElementRef;
    wheel!: HTMLElement;
    isPlaying: boolean = false;
    isSpinEnd: boolean = false;
    isDestroyed$: Subject<boolean> = new Subject();
    username?: string;

    constructor(private store: Store<AppState>) {
        this.store
            .pipe(select(selectUserName), takeUntil(this.isDestroyed$))
            .subscribe((name) => (this.username = name));
    }

    ngOnInit() {
        this.segmentsCount = this.segments.length;
        this.angleRangePerSegment = 360 / this.segmentsCount;
        this.segmentWidth = 145;
        this.segmentHeight = this.size / 2;
        this.wheel = this.wheelWrapper.nativeElement;
        this.wheel.style.transform = `rotate(22deg)`;
        this._setWheelStyles();
        this._modifySegmentsArray();
        this._createAllSegments();
    }

    ngOnDestroy(): void {
        this.isDestroyed$.next(true);
    }

    public play() {
        console.log('Playing...');
        this.isPlaying = true;
        const audio = this._playSoundOnRotation();
        const rotationAngle = Math.floor(Math.random() * 360) + this.rotationCount * 360;
        this.wheel.style.transform = `rotate(-${rotationAngle - 22}deg)`;
        const winnerAngle = Math.abs(rotationAngle - 360 * this.rotationCount);
        setTimeout(() => {
            audio.pause();
            const winnerSegment = this.segmentsWithFullData.find(
                (segment) => segment.angleStart <= winnerAngle && segment.angleEnd >= winnerAngle
            );
            this.winnerValue.emit({
                username: this.username ?? 'anonim',
                createdAt: new Date(),
                value: winnerSegment?.value as string,
            });
            this._triggerSpinEndAnimation();
            setTimeout(() => this._setWheelToStart(), 5000);
            setTimeout(() => this._changeTransition('time'), 5100);
        }, this.rotationTimeMS);
    }

    private _setWheelStyles() {
        this.wheel.style.height = `${this.size}px`;
        this.wheel.style.width = `${this.size}px`;
        this._changeTransition('time');
    }

    private _triggerSpinEndAnimation() {
        this.isSpinEnd = true;
        setTimeout(() => (this.isSpinEnd = false), 5000);
    }

    private _setWheelToStart() {
        console.log('Stopping...');
        this._changeTransition('none');
        this.isPlaying = false;
        this.wheel.style.transform = `rotate(22deg)`;
    }

    private _changeTransition(type: 'none' | 'time') {
        if (type === 'none') this.wheel.style.transition = `none`;
        else this.wheel.style.transition = `${this.rotationTimeMS}ms ease-in-out`;
    }

    private _modifySegmentsArray() {
        this.segmentsWithFullData = this.segments.map((data, index) => {
            const angleStart = index * this.angleRangePerSegment;
            const angleEnd = index * this.angleRangePerSegment + this.angleRangePerSegment - 1;
            return { ...data, angleStart, angleEnd };
        });
    }

    private _playSoundOnRotation(): HTMLAudioElement {
        let audio: HTMLAudioElement;
        if (this.rotationTimeMS === 2000) audio = new Audio('../../`../../assets/audio/rotation.mp3');
        else audio = new Audio('../../../../assets/audio/rotation-5sec.m4a');
        audio.play();
        return audio;
    }

    //CREATE ALL SEGMENTS
    private _createAllSegments() {
        this.segmentsWithFullData.forEach((segment, index) => {
            this._createSegment(44.98 * index, segment.value, segment.id);
        });
    }

    private _createSegment(rotationAngle: number, textContent: string, id: number) {
        const wheelWrapper = document.querySelector('.segments') as HTMLElement;
        const segment = document.createElement('div');
        segment.className = 'segment';
        segment.textContent = textContent;
        this._addStylesToSegment(segment, rotationAngle, id);
        wheelWrapper.append(segment);
    }

    private _addStylesToSegment(el: HTMLElement, rotationAngle: number, id: number) {
        el.style.position = 'absolute';
        el.style.userSelect = 'none';
        el.style.textAlign = 'center';
        el.style.fontSize = '17px';
        el.style.display = 'flex';
        el.style.flexDirection = 'column';
        el.style.alignItems = 'center';
        el.style.padding = '10px';
        el.style.bottom = '50%';
        el.style.left = '29.5%';
        el.style.background = id % 2 === 0 ? 'red' : 'gray';
        el.style.height = `${this.segmentHeight}px`;
        el.style.width = `${this.segmentWidth}px`;
        el.style.transformOrigin = 'bottom center';
        el.style.transform = `rotate(${rotationAngle}deg)`;
        el.style.clipPath = 'polygon(10% 0%, 100% 0%, 50% 100%, 0 0%)';
    }

    private _getRandomRGB(): string {
        const oneRGB = () => Math.random() * 255;
        const rgb = `rgb(${oneRGB()}, ${oneRGB()}, ${oneRGB()})`;
        return rgb;
    }
}
