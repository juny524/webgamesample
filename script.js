        // Phaser 3 を使ったハノイの塔のゲーム
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            backgroundColor: '#ffffff',
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 0 },
                    debug: true
                }
            },
            scene: {
                preload: preload,
                create: create,
                update: update
            }
        };

        const game = new Phaser.Game(config);
        let selectedDisks = [];
        const pillarDisks = [[], [], []]; // 各支柱のディスクを管理

        function preload() {
            // 画像をロード
            this.load.image('pillar', 'assets/pillar.png');
            this.load.image('5_first_floor', 'assets/first_floor.png');
            this.load.image('4_second_floor', 'assets/second_floor.png');
            this.load.image('3_third_floor', 'assets/third_floor.png');
            this.load.image('2_fourth_floor', 'assets/fourth_floor.png');
            this.load.image('1_fifth_floor', 'assets/fifth_floor.png');
        }

        function create() {
            // 支柱を配置
            const pillarXPositions = [200, 400, 600];
            const pillars = [];

            pillarXPositions.forEach((x, index) => {
                const pillar = this.add.image(x, 450, 'pillar').setInteractive();
                pillars.push(pillar);

                // 支柱のクリックイベント
                pillar.on('pointerdown', () => {
                    const pillarIndex = pillars.indexOf(pillar);
                    const pillarTopDisk = pillarDisks[pillarIndex][pillarDisks[pillarIndex].length - 1];

                    if (selectedDisks.length > 0) {
                        const selectedDisk = selectedDisks[selectedDisks.length - 1];
                        const currentPillarIndex = pillarDisks.findIndex(p => p.includes(selectedDisk));

                        if (pillarIndex === currentPillarIndex) {
                            // 同じ支柱をクリックして選択解除
                            selectedDisks.forEach(d => d.setTint(0xffffff));
                            selectedDisks = [];
                        } else {
                            // 選択されたディスクを移動
                            const targetPillarDisks = pillarDisks[pillarIndex];
                            const selectedDiskSize = parseInt(selectedDisk.texture.key.split('_')[0]);
                            const targetTopDiskSize = targetPillarDisks.length > 0
                                ? parseInt(targetPillarDisks[targetPillarDisks.length - 1].texture.key.split('_')[0])
                                : Infinity;

                            if (selectedDiskSize < targetTopDiskSize) {
                                console.log('Move Allowed:', selectedDisk.texture.key, 'to', pillarIndex);
                                const newY = 400 - targetPillarDisks.length * 20;
                                selectedDisk.x = x;
                                selectedDisk.y = newY;

                                // 更新
                                pillarDisks[currentPillarIndex].pop();
                                pillarDisks[pillarIndex].push(selectedDisk);

                                // 選択解除
                                selectedDisks.forEach(d => d.setTint(0xffffff));
                                selectedDisks = [];
                            } else {
                                console.log('Move Not Allowed:', selectedDisk.texture.key, 'to', pillarIndex);
                            }
                        }
                    } else {
                        // 支柱上のディスクを選択
                        if (pillarTopDisk) {
                            console.log('Top Disk Selected:', pillarTopDisk.texture.key);
                            pillarTopDisk.setTint(0xff0000);
                            selectedDisks = [pillarTopDisk];
                        }
                    }
                });
            });

            // ディスクを最初の支柱に配置
            const disks = ['5_first_floor', '4_second_floor', '3_third_floor', '2_fourth_floor', '1_fifth_floor'];
            let startY = 400;

            disks.forEach((disk, index) => {
                const diskImage = this.add.image(200, startY - index * 20, disk).setInteractive(); // 20pxずつ上にずらして配置
                pillarDisks[0].push(diskImage);
            });
        }

        function update() {
            // 更新処理はここに追加
        }