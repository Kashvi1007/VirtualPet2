class Food {
    constructor(){

        this.foodStock = 20;
        this.lastFed = 12;
        this.image = loadImage("images/Milk.png");

        //database
        database = firebase.database();
    }

    //updating value of food in database and foodstock with food parameter
    updateFoodStock(food){
        this.foodStock = food;
        database.ref("/").update({Food: food});
    }

    //updating value of lastfed in database and lastfed with time parameter
    updateLastFed(time){
        this.lastFed = time;
        database.ref("/").update({LastFed: time});
    }


    display(){

    //display food in rows of 10
     var x = 80, y = 100;
     imageMode(CENTER);
     if(this.foodStock != 0){
         for(var i = 0; i < this.foodStock; i++){
             if(i % 10 === 0){
                x = 80;
                y += 50;
             }
             image(this.image, x, y, 50, 50);
             x += 30;
         }
     }
    }
}


/*
    getFoodStock(){
        this.foodStock = database.ref("/");
        this.foodStock.on("value", updateFoodStock);
    }
    deductFood(){
        this.foodStock--;
        updateFoodStock(this.foodStock);
        console.log("in deductFood");
    }
    */