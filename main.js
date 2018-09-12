enchant();
window.onload=function(){
	game=new Game(375,550);
	game.fps=30;
	game.preload(
		"image/player.png",
		"image/title.png",
		"image/startbutton.png",
	);
	game.onload=function(){
		menu=new MainManu();
		game.rootScene.addChild(menu);
		var player = new Player(100, 300);
	}
	game.start();
};

var MainManu=enchant.Class.create(enchant.Group,{
	initialize: function(){
		enchant.Group.call(this);
		//background
		var back=new Sprite(375,550);
		back.image=game.assets["image/title.png"];
		//startButton
		var start=new Sprite(325,50);
		start.image=game.assets["image/startbutton.png"];
		start.moveTo(25,475);
		start.addEventListener('touchstart',function(e){
			game.rootScene.removeChild(menu);
		});
		
		this.addChild(back);
		this.addChild(start);
	}
});
var Stage=enchant.Class.create(enchant.Group,{
});
var Player=enchant.Class.create(enchant.Sprite,{
    initialize: function(x,y){
        enchant.Sprite.call(this,32,48);
        this.image = game.assets["image/player.png"];
        this.x = x;
        this.y = y;

        this.frame = 0;

        this.addEventListener('touchstart', function (e) {
            this.y = e.y;
            game.touched = true;
        });
        this.addEventListener('touchmove', function (e) {
            this.y = e.y;
        });
        this.addEventListener('touchend', function (e) {
            this.y = e.y;
            game.touched = false;
        });

        this.addEventListener('enterframe', function () {
            if(game.touched && game.frame % 3 == 0) {
                //var s = new PlayerShoot(this.x, this.y);
            }
        });

        game.rootScene.addChild(this);
    }
});