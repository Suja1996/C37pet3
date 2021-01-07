class Food{

constructor(){
this.foodStock=0;
this.image=loadImage("images/Milk.png")
}

display(){
var count=this.foodStock
for(var j=0;j<700;j=j+50){
  
  
for(var i=0;i<450;i=i+50){

  if(count>0){
   
  image(this.image,50+i,250+j,50,50)
  count--}}}

}


updateFood(count){
  this.foodStock=count
}

bedroom(){
background(bedroom,550.500)
}
garden(){
  background(garden,550.500)
}

washroom(){
  background(washroom,550.500)
}











}