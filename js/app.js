document.addEventListener('DOMContentLoaded',function(){
    let movingBox = document.querySelector(".movingBox");
    let pointBoxesContainer = document.querySelector(".pointBoxes");
    let devButton = document.querySelector(".devButton");
    let pointsContainer = document.querySelector(".points");
    let area = document.querySelector(".area");
    let instructions = document.querySelector(".instructionsTitle");
    let instructionsContainer = document.querySelector(".instructionsContainer");

    let pointBoxesArray = [];
    let movingBoxX = 0;
    let movingBoxY = 0;
    let points = 0;
    let pointBoxNumber = 0;

    // devButton.addEventListener("click",function(e) {
    //     e.preventDefault()
    //     let randX = 15+50*(~~(Math.random() * 8))
    //     let randY = 15+50*(~~(Math.random() * 8))
    //     let newPointBox = new PointBox(randX,randY)
    //     newPointBox.createPointBox();
    // })

    class Area {
        positionCheck() {
            window.requestAnimationFrame(areaObject.positionCheck)
            pointBoxesArray.forEach( (e,i) => {
                if (e[0]<movingBoxX || e[0] > movingBoxX+50) {
                    return;
                }
                if (e[1]<movingBoxY || e[1] > movingBoxY+50) {
                    return;
                }
                areaObject.addPoint();
                area.removeChild(document.querySelector("."+e[2]))
                pointBoxesArray.splice(i,1);
            })
        }

        addPoint() {
            points++;
            pointsContainer.innerText = points;
        }

        removePoint() {
            //For future use
        }
    }

    class PointBox {
         constructor(x,y){
             this.x=x;
             this.y=y;
        }

        createPointBox() {
            let newBox = document.createElement("div")
            newBox.classList.add("pointBox");
            pointBoxNumber++
            newBox.classList.add("pointBox" + pointBoxNumber);
            pointBoxesArray[pointBoxesArray.length] = [this.x,this.y,"pointBox" + pointBoxNumber];
            newBox.style.top = this.y + "px";
            newBox.style.left = this.x + "px";
            area.appendChild(newBox);
        }
    }

    document.addEventListener("keydown",function(event){
        switch (event.key) {
            case "ArrowDown":
                movingBoxY += 50
                break;
            case "ArrowUp":
                movingBoxY -= 50
                break;
            case "ArrowLeft":
                movingBoxX -= 50
                break;
            case "ArrowRight":
                movingBoxX += 50
                break;
        
            default:
                break;
        }
            if (movingBoxX > 350) {
                movingBoxX = 350;
            }
            if (movingBoxX < 0) {
                movingBoxX = 0;
            }
            if (movingBoxY > 350) {
                movingBoxY = 350;
            }
            if (movingBoxY < 0 ) {
                movingBoxY = 0;
            }
        movingBox.style.top = movingBoxY + "px";
        movingBox.style.left = movingBoxX + "px";
    })

    let areaObject = new Area;
    let gameRaf = window.requestAnimationFrame(areaObject.positionCheck);

    let creationInterval = setInterval(function(){
        
        if (pointBoxesArray.length >= 10) {
            window.cancelAnimationFrame(gameRaf);
            area.innerHTML = "";
            let loseBox = document.createElement("p");
            loseBox.classList.add("loseWindow");
            loseBox.innerText = "You lost";
            area.appendChild(loseBox)
            return;
        }

        let randX, randY, newPointBox, outcome;

        // if (pointBoxesArray.length === 0) {
        //     randX = 15+50*(~~(Math.random() * 8))
        //     randY = 15+50*(~~(Math.random() * 8))
        //     newPointBox = new PointBox(randX,randY)
        //     newPointBox.createPointBox();
        //     return;
        // }        
        
        randX = 15+50*(~~(Math.random() * 8))
        randY = 15+50*(~~(Math.random() * 8))

        pointBoxesArray.forEach(function(e){
            if (e[0] === randX && e[1] === randY) {
                return;
            }
        })            
        
        newPointBox = new PointBox(randX,randY)
        newPointBox.createPointBox();

    },1000)
    
    instructions.addEventListener("click",function(){
        instructionsContainer.classList.toggle("open");
    })
});