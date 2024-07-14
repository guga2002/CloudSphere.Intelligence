import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import * as handTrack from 'handtrackjs';

@Component({
  selector: 'app-gesture-navigation',
  standalone: true,
  imports: [],
  templateUrl: './gesture-navigation.component.html',
  styleUrls: ['./gesture-navigation.component.css'],
})
export class GestureNavigationComponent implements OnInit, OnDestroy {
  cameraEnabled: boolean = false;
  video!: HTMLVideoElement;
  model: any;
  @ViewChild('videoElement', { static: true })
  videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement', { static: true })
  canvasElement!: ElementRef<HTMLCanvasElement>;
  @ViewChild('clickEffect', { static: true })
  clickEffect!: ElementRef<HTMLDivElement>;

  private lastScrollTime = 0;
  private scrollDelay = 100; // milliseconds

  constructor() {}

  ngOnInit(): void {
    this.initHandTrack();
  }

  ngOnDestroy(): void {
    this.stopVideo();
  }

  toggleCamera(event: any) {
    this.cameraEnabled = event.target.checked;
    if (this.cameraEnabled) {
      this.startVideo();
    } else {
      this.stopVideo();
    }
  }

  initHandTrack() {
    const modelParams = {
      flipHorizontal: true,
      maxNumBoxes: 20,
      iouThreshold: 0.5,
      scoreThreshold: 0.6,
    };

    handTrack.load(modelParams).then((lmodel: any) => {
      this.model = lmodel;
    });
  }

  startVideo() {
    this.video = this.videoElement.nativeElement;
    handTrack.startVideo(this.video).then((status: boolean) => {
      if (status) {
        this.video.addEventListener('loadeddata', () => {
          this.runDetection();
        });
      } else {
        console.log('Please enable video');
      }
    });
  }

  stopVideo() {
    if (this.video) {
      this.video.pause();
      const stream = this.video.srcObject as MediaStream;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
      this.video.srcObject = null;
    }
  }

  runDetection() {
    const canvas = this.canvasElement.nativeElement;
    const context = canvas.getContext('2d');
    if (!context) {
      console.error('Could not get canvas context');
      return;
    }

    this.model.detect(this.video).then((predictions: any) => {
      console.log('Predictions: ', predictions);
      context.clearRect(0, 0, canvas.width, canvas.height);
      this.model.renderPredictions(predictions, canvas, context, this.video);

      if (predictions.length > 0) {
        const hand = predictions.find(
          (p: any) => p.label === 'open' || p.label === 'closed'
        );
        if (hand) {
          const currentTime = new Date().getTime();
          if (
            hand.label === 'closed' &&
            currentTime - this.lastScrollTime > this.scrollDelay
          ) {
            if (hand.bbox[1] < this.video.height / 2) {
              console.log('Scroll up');
              window.scrollBy({ top: -100, behavior: 'smooth' });
            } else {
              console.log('Scroll down');
              window.scrollBy({ top: 100, behavior: 'smooth' });
            }
            this.lastScrollTime = currentTime;
          } else if (hand.label === 'open' && this.isDoubleClickGesture(hand)) {
            console.log('Click');
            const element = document.elementFromPoint(
              hand.bbox[0] + hand.bbox[2] / 2,
              hand.bbox[1] + hand.bbox[3] / 2
            ) as HTMLElement;
            if (element) {
              this.simulateClick(element);
              this.showClickEffect(
                hand.bbox[0] + hand.bbox[2] / 2,
                hand.bbox[1] + hand.bbox[3] / 2
              );
            }
          }
        }
      }
      if (this.cameraEnabled) {
        requestAnimationFrame(this.runDetection.bind(this));
      }
    });
  }

  isDoubleClickGesture(hand: any) {
    // Implement your logic for detecting a double-click gesture
    // You could track the hand position over time to detect a double click
    return false;
  }

  simulateClick(element: HTMLElement) {
    const rect = element.getBoundingClientRect();
    const clickEvent = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
      clientX: rect.left + rect.width / 2,
      clientY: rect.top + rect.height / 2,
    });
    element.dispatchEvent(clickEvent);
  }

  showClickEffect(x: number, y: number) {
    const clickEffectEl = this.clickEffect.nativeElement;
    clickEffectEl.style.left = `${x}px`;
    clickEffectEl.style.top = `${y}px`;
    clickEffectEl.classList.add('show');
    setTimeout(() => {
      clickEffectEl.classList.remove('show');
    }, 300); // Duration of the click effect
  }
}
