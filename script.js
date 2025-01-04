
// Phaser 3 を使ったシンプルなジャンプゲーム
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
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

function preload() {
    // キャラ画像をロード
    this.load.image('sky', 'assets/sky.png');
    this.load.image('platform', 'assets/platform.png');
    this.load.image('character', 'assets/character.png');
    this.load.image('menuButton', 'assets/menuButton.png'); // メニューボタン用画像
}

function create() {
    // 背景
    this.add.image(400, 300, 'sky');

    // プラットフォーム
    const platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'platform').setScale(2).refreshBody();

    // プレイヤーキャラクター
    player = this.physics.add.sprite(100, 450, 'character');

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    // 地面と衝突判定
    this.physics.add.collider(player, platforms);

    // タップまたはクリックでジャンプ
    this.input.on('pointerdown', () => {
        console.log('Pointer clicked or tapped!');
        console.log('Blocked Down: ', player.body.blocked.down);
        console.log('Touching Down: ', player.body.touching.down);
        console.log('On Floor: ', player.body.onFloor());

        if (player.body.blocked.down) { // ← blocked.downに変更
            console.log('player.body.blocked.down ----- OKOKOKOK');
            player.setVelocityX(1000);
            player.setVelocityY(-330);
        }
    });

    // メニューボタンを追加
    const menuButton = this.add.image(50, 50, 'menuButton')
        .setInteractive()
        .setScale(0.5);


    menuButton.on('pointerdown', () => {
        player.setX(config.width / 2);
        // player.setY(-200);
        player.setVelocityX(0);
        player.setY(300);
        player.setVelocityY(0); // 一旦速度をリセット
        player.body.setAllowGravity(true); // 重力を有効化
        // alert('Menu Button Clicked!');
    });


}

function update() {
    // 更新処理はここに追加
}
