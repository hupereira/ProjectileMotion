export class Ball {
  // Attribute definition
  color: string;
  positionX: number;
  positionY: number;
  radius: number;
  velocityX: number;
  velocityY: number;
  gravity = 9.8;
  initialX: number;
  initialY: number;
  initialVelocity: number;
  time = 0;

  // Create a new ball with random size, color and velocities on the received coordinates
  constructor(posX, posY) {
    this.color = 'rgb(' + Math.random() * 256 + ',' + Math.random() * 256 + ',' + Math.random() * 256 + ')';
    this.positionX = this.initialX = posX;
    this.positionY = this.initialY = posY;

    // Generate random velocity between -1000 and 1000
    this.velocityY = (Math.random() * 2000) - 1000;

    // Generate random velocity between -1000 and 1000
    this.velocityX = (Math.random() * 2000) - 1000;

    // Calculate the initial vector velocity of the ball
    this.initialVelocity = Math.sqrt((this.velocityY * this.velocityY + this.velocityX * this.velocityX));
    this.radius = (Math.random() * 50 + 50) / 2;
  }

  // Move the ball accordingly the projectile motion
  moveBall(canvasWidth: number, canvasHeight: number): void {
    this.initialVelocity += this.gravity;

    this.time += 0.01;

    this.positionX = this.initialX + this.velocityX * this.time;
    this.positionY = this.initialY + this.initialVelocity * this.time + 0.5 * this.gravity * this.time * this.time;

    // Ball collision detection with top border
    if (this.positionY - this.radius < 0) {
      this.time = 0;
      this.initialVelocity = -this.initialVelocity * 0.9;
      this.positionY = this.radius;
      this.initialY = this.positionY;
      this.initialX = this.positionX;
    }

    // Ball collision detection with bottom border
    if (this.positionY + this.radius > canvasHeight) {
      this.time = 0;
      this.initialVelocity = -this.initialVelocity * 0.9;
      this.positionY = canvasHeight - this.radius;
      this.initialY = this.positionY;
      this.initialX = this.positionX;
    }

    // Ball collision detection with left border
    if (this.positionX - this.radius < 0) {
      this.time = 0;
      this.velocityX = -this.velocityX * 0.9;
      this.positionX = this.radius;
      this.initialY = this.positionY;
      this.initialX = this.positionX;
    }

    // Ball collision detection with right border
    if (this.positionX + this.radius > canvasWidth) {
      this.time = 0;
      this.velocityX = -this.velocityX * 0.9;
      this.positionX = canvasWidth - this.radius;
      this.initialY = this.positionY;
      this.initialX = this.positionX;
    }
  }


}
