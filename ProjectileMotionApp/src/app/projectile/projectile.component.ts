import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Ball} from '../../model/ball';

@Component({
  selector: 'app-projectile',
  templateUrl: './projectile.component.html',
  styleUrls: ['./projectile.component.css']
})
export class ProjectileComponent implements OnInit {

  @ViewChild('canvas', {static: true})
  canvas: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D;

  balls: Ball[] = [];

  animation: number;

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.startAnimation();
  }

  // Start thread to call animate method 60 times per second
  startAnimation(): void  {
    this.animation = setInterval(() => {
      this.animate();
    }, 1000 / 60);
  }

  // Method to call the draw and move method for each ball created
  animate(): void {
    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.balls.forEach( ball => {
      this.drawBall(ball);
      ball.moveBall(this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    });
  }

  // Method to draw the ball on canvas
  drawBall(ball: Ball): void {
    this.ctx.beginPath();
    this.ctx.arc(ball.positionX, ball.positionY, ball.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = ball.color;
    this.ctx.fill();
    this.ctx.closePath();
  }

  // Method to clear the information an restart the animation
  stopAnimation(): void {
    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    clearInterval(this.animation);
    this.balls = [];
    this.startAnimation();
  }

  // Method called on click event on canvas
  generateBall(event): void {
    this.balls.push(new Ball(event.clientX, event.clientY));
  }

}
