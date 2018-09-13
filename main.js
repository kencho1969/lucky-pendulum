enchant();
window.onload=function(){
	game=new Game(375,550);
	game.fps=60;
	game.preload(
		"image/player.png",
		"image/title.png",
		"image/startbutton.png",
		"image/stage.png",
		"image/uiback.png",
		"image/uiicon.png",
	);
	game.onload=function(){
		menu=new MainManu();
		game.rootScene.addChild(menu);
		
		
		var userAgent = window.navigator.userAgent.toLowerCase();
		if(userAgent.indexOf("iphone")!=-1 || userAgent.indexOf("ipad")!=-1 || userAgent.indexOf("android")!=-1) {
			// ツイートボタン
			var tweet_label = new Button("tweet","dark",40,40);
			tweet_label.y = 170;
			// タッチイベントを登録
			tweet_label.addEventListener(enchant.Event.TOUCH_START, function(){
				var twitter_url = "twitter://post?message=";
				var message = "てすてすtesutesu";
				// Twitter に移動
				location.href=twitter_url + encodeURIComponent(message);
			});
			game.rootScene.addChild(tweet_label);
		}
		
		
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
		start.addEventListener("touchstart",function(e){
			var stage=new Stage();
			game.rootScene.addChild(stage);
		});
		//add
		this.addChild(back);
		this.addChild(start);
	}
});
var Stage=enchant.Class.create(enchant.Group,{
	initialize: function(){
		enchant.Group.call(this);
		//2parts
		const map=new Group();
		const ui=new Group();
		this.addChild(map);
		this.addChild(ui);
		ui.moveTo(0,350);
		//background
		var back=new Sprite(800,350);
		back.image=game.assets["image/stage.png"];
		map.addChild(back);
		//player
		var player=new Player(100,300);
		map.addChild(player);
		//uibackground
		var uiback=new Sprite(375,200);
		uiback.image=game.assets["image/uiback.png"];
		ui.addChild(uiback);
		//uibutton
		const icons=new Array(8);
		for(let n=0;n<8;n++){
			if(n<3){
				icons[n]=new Sprite(125,125);
				icons[n].image=new Surface(125,125);
				icons[n].image.draw(game.assets["image/uiicon.png"],n*125,0,125,125,0,0,125,125);
				icons[n].moveTo(n*125,75);
			}else{
				icons[n]=new Sprite(75,75);
				icons[n].image=new Surface(75,75);
				icons[n].image.draw(game.assets["image/uiicon.png"],(n-3)*75,125,75,75,0,0,75,75);
				icons[n].moveTo((n-3)*75,0);
			}
			ui.addChild(icons[n]);
		}
		var left_hold,right_hold;
		icons[0].addEventListener("touchstart",function(e){
			left_hold=true;
			right_hold=false;
		});
		icons[0].addEventListener("touchend",function(e){
			left_hold=false;
		});
		icons[0].addEventListener("enterframe",function(e){
			if(left_hold){
				player.accel(-0.15);
			}
		});
		icons[2].addEventListener("touchstart",function(e){
			right_hold=true;
			left_hold=false;
		});
		icons[2].addEventListener("touchend",function(e){
			right_hold=false;
		});
		icons[2].addEventListener("enterframe",function(e){
			if(right_hold){
				player.accel(0.15);
			}
		});
	}
});
var Player=enchant.Class.create(enchant.Sprite,{
    initialize: function(x,y){
        enchant.Sprite.call(this,32,48);
        this.image = game.assets["image/player.png"];
        this.x = x;
        this.y = y;
        this.frame = 0;
		this.deposit=0;
		this.speed=0;
		this.max_speed=5;
		this.animation_delay=12;
		
        this.addEventListener("touchstart", function (e) {
            this.y = e.y;
        });
        this.addEventListener("touchmove", function (e) {
            this.y = e.y;
        });
        this.addEventListener("touchend", function (e) {
            this.y = e.y;
        });

        this.addEventListener("enterframe", function () {
			this.x+=this.speed;
			this.speed*=0.85;
			if(Math.abs(this.speed)<0.3){
				this.speed=0;
			}
			if(this.speed>0){
				this.deposit+=this.speed;
				if(this.deposit>this.animation_delay){
					this.frame=(this.frame+1)%4+4;
					this.deposit-=this.animation_delay;
				}
			}else if(this.speed<0){
				this.deposit-=this.speed;
				if(this.deposit>this.animation_delay){
					this.frame=(this.frame+1)%4;
					this.deposit-=this.animation_delay;
				}
			}else{
				this.frame-=this.frame%4;
				this.deposit=this.animation_delay;
			}
        });
    },
	
	accel: function(power){
		if(power>0){
			this.speed=(this.speed+this.max_speed*power)/(1+power);
		}else{
			this.speed=(this.speed+this.max_speed*power)/(1-power);
		}
	}
});