const output = document.querySelector("output");
const input = document.getElementById("image-input");
const redSquare = document.getElementById("output");
let imagesArray = [];
let namesArray = [];
let lengthofFiles = 0;
const col = document.querySelector("#inputNumber");

input.addEventListener("change", () => {
  const files = input.files;
  for (let i = 0; i < files.length; i++) {
    imagesArray.push(files[i]);
    namesArray.push(files[i].name.toString().split(".")[0]);
  }
  lengthofFiles = files.length;
  displayImages();
  widthDeterminer();
});

namesArray.sort((a, b) => imagesArray.indexOf(a) - imagesArray.indexOf(b)); // SORTING

function displayImages() {
  let images = "";
  imagesArray.forEach((image, index) => {
    images += `<div class="image">
                  <div class="img" id="${index}" style= "background-image:url(${URL.createObjectURL(
      image
    )})"></div>
                  <span contenteditable="true" class="bold">${namesArray[index]
                    .split("-")[0]
                    .trim()}</span>
                  <br>
                  <span contenteditable="true">${namesArray[index]
                    .split("-")[1]
                    .trim()}</span>
                </div>`;
  });
  output.innerHTML = images;
  jqueryMotion();
}

col.addEventListener("change", () => {
  output.style.gridTemplateColumns = `repeat(${col.value}, 140px)`;
  widthDeterminer();
});

function widthDeterminer() {
  console.log(lengthofFiles, Number(col.value));
  redSquare.style.width = `${col.value * 160 - 15}px`;
  redSquare.style.height = `${
    Math.ceil(lengthofFiles / col.value) * 225 - 25
  }px`;
}

function jqueryMotion() {
  $(document).ready(function () {
    var $bg = $(".img"),
      origin = { x: 0, y: 0 },
      start = { x: 0, y: 0 },
      movecontinue = false;

    function move(e) {
      var moveby = {
        x: origin.x - e.clientX,
        y: origin.y - e.clientY,
      };

      if (movecontinue === true) {
        start.x = start.x - moveby.x;
        start.y = start.y - moveby.y;

        $(this).css("background-position", start.x + "px " + start.y + "px");
      }

      origin.x = e.clientX;
      origin.y = e.clientY;

      e.stopPropagation();
      return false;
    }

    function handle(e) {
      movecontinue = false;
      $bg.unbind("mousemove", move);

      if (e.type == "mousedown") {
        origin.x = e.clientX;
        origin.y = e.clientY;
        movecontinue = true;
        $bg.bind("mousemove", move);
      } else {
        $(document.body).focus();
      }

      e.stopPropagation();
      return false;
    }

    function reset() {
      start = { x: 0, y: 0 };
      $(this).css("backgroundPosition", "0 0");
    }

    $bg.bind("mousedown mouseup mouseleave", handle);
    $bg.bind("dblclick", reset);
  });
}
