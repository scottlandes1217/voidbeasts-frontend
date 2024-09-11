import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Phaser from 'phaser';

const Game = () => {
  const gameContainer = useRef(null);
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: gameContainer.current,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 }
        }
      },
      scene: {
        preload: preload,
        create: create,
        update: update
      }
    };

    const game = new Phaser.Game(config);

    let player;
    let cursors;

    function preload() {
      this.load.image('map', 'path/to/your/map/image.png');
      this.load.spritesheet('character', 'path/to/character/sprite.png', {
        frameWidth: 32,
        frameHeight: 48
      });
    }

    function create() {
      this.add.image(400, 300, 'map');
      player = this.physics.add.sprite(400, 300, 'character');

      this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('character', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
      });
      this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('character', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
      });
      this.anims.create({
        key: 'up',
        frames: [{ key: 'character', frame: 4 }],
        frameRate: 20
      });
      this.anims.create({
        key: 'down',
        frames: [{ key: 'character', frame: 1 }],
        frameRate: 20
      });

      cursors = this.input.keyboard.createCursorKeys();
    }

    function update() {
      player.setVelocity(0);

      if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.anims.play('left', true);
      } else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.anims.play('right', true);
      } else if (cursors.up.isDown) {
        player.setVelocityY(-160);
        player.anims.play('up', true);
      } else if (cursors.down.isDown) {
        player.setVelocityY(160);
        player.anims.play('down', true);
      } else {
        player.anims.stop();
      }
    }

    return () => {
      game.destroy(true);
    };
  }, []);

  // Handle navigating back to the character list
  const goBack = () => {
    navigate('/');
  };

  return (
    <div>
      <h1>Welcome, Warrior!</h1>
      {/* The Phaser game container */}
      <div ref={gameContainer} style={{ width: '800px', height: '600px' }} />

      {/* Add a back button to go back to the character list */}
      <button onClick={goBack} style={{ marginTop: '20px' }}>
        Back to Character List
      </button>
    </div>
  );
};

export default Game;
