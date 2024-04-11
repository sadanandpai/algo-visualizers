export class Simulator {
  public isPlaying = false;
  public isPlayingPromise: Promise<void>;
  private isPlayingResolver!: () => void;
  private onPlay: (() => void) | undefined;
  private onStop: (() => void) | undefined;

  constructor(onPlay?: () => void, onStop?: () => void) {
    this.onPlay = onPlay;
    this.onStop = onStop;
    this.isPlayingPromise = new Promise((r) => {
      this.isPlayingResolver = r;
    });
  }

  start() {
    if (this.isPlaying) {
      return;
    }

    this.isPlaying = true;
    this.isPlayingResolver();
    this.onPlay?.();
  }

  pause() {
    if (!this.isPlaying) {
      return;
    }

    this.isPlaying = false;
    this.isPlayingPromise = new Promise((r) => {
      this.isPlayingResolver = r;
    });
    this.onStop?.();
  }

  getStatus() {
    return this.isPlayingPromise;
  }
}
