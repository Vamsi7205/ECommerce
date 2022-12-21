var cartItems = [];


 checkLogin();

function checkLogin() {
  let loginStatus = sessionStorage.getItem("login");
  if ( loginStatus !="sucess") {
    window.open("login.html", "_self");
  } 
}

function logout() {
   if(confirm('Are you sure to logout?')) {
    sessionStorage.setItem("login","fail");
   };
 
}



function validateForm(){
  var email = document.getElementById("email").value;
  var pwd = document.getElementById("password").value;
  alert("as");
  if(email=="" || pwd=="")
  {
      document.getElementById("errorMsg1").style.display = "block";
      document.getElementById("errorMsg2").style.display = "none";
      document.getElementById("errorMsg3").style.display = "none";
      document.getElementById("errorMsg4").style.display = "none";

  } else  if(email == "vamsi@gmail.com" && pwd == "Vamsi@123") {
      alert("Login Sucessfull");
      sessionStorage.setItem("login","sucess");
      window.open("login.html", "_self");

  } else{
      document.getElementById("errorMsg1").style.display = "none";
      if(email!=""){
          var emailReg = /^.+@.+\..+$/;
          if(emailReg.test(email) == false){
              document.getElementById("errorMsg2").style.display = "block";
              document.getElementById("errorMsg4").style.display = "none";

              return false;
          }
          else{
              document.getElementById("errorMsg2").style.display = "none";
          }
      }
      if(password!=""){
          var pwdReg = /^.{6,}$/;
          if(pwdReg.test(pwd) == false){
              document.getElementById("errorMsg3").style.display = "block";
              document.getElementById("errorMsg4").style.display = "none";

              return false;
          }
          else{
              document.getElementById("errorMsg3").style.display = "none";
          }
      }
      sendData(email,pwd,profileType);
  }
  
}

const generateURL = ({ amount, name, upi }) => {
  return `upi://pay?pa=${upi}&pn=${name}&am=${amount}&cu=INR`;
};

function createQRCode(amount) {
  let name = "Vamsi ";
  let upi = "vamsi7205@ybl";
  const url = generateURL({ amount, name, upi });
  var qrcode = new QRCode("qrcode", {
    text: "Order",
    width: 128,
    height: 128,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });
  qrcode.makeCode(url);
  
 alert( qrcode.link());
}

function createQRCode() {
  let name = "Vamsi Ecommerce";
  let amount = sessionStorage.getItem("total");
  let upi = "vamsi7205@ybl";
  const url = generateURL({ amount, name, upi });
  var qrcode = new QRCode("qrcode", {
    text: "Order",
    width: 228,
    height: 228,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });
  qrcode.makeCode(url);

}

var sendSMS = function(){
  
  let name = "Vamsi Ecommerce";
  let mobile = document.getElementById('mobileNo').value;
  let amount = sessionStorage.getItem("total");33333333333333
  let upi = "vamsi7205@ybl";
  const url = generateURL({ amount, name, upi });
  var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 0) {
      var responseText = JSON.parse(this.responseText);
      alert('It worked');
      console.log(responseText);
    }
    };
    let x= "vamsi".link(url);
    let msg = "upi://pay?pa=vamsi7205@ybl&pn=vamsi&am=100&cu=INR";
    let finalUrl = `http://192.168.168.58:8090/SendSMS?username=vamsi&password=vamsi&phone=${mobile}&message=${x}`;
    xhttp.open("GET", finalUrl, true);
    xhttp.send();
    alert(finalUrl);
}


function setIndexForDetailPage(index, itemINdex) {
  sessionStorage.setItem("arrIndex", index);
  sessionStorage.setItem("itemIndex", itemINdex);
}


function closePage() 
{
   let arr=["furniture.html","electronics.html#watches","electronics.html#laptops","electronics.html#ac"];
   let index =  sessionStorage.getItem("arrIndex");
   window.open(arr[index], "_self");
}



function showDetailPage() {
  let index =  sessionStorage.getItem("arrIndex");
  let itemINdex =  sessionStorage.getItem("itemIndex");
  let arr = [getWood(), getWatches(), getLaptops(), getAirConditioners()];
  let items = arr[index];
  let item =items[itemINdex];
  let price = (1 - (0.01 * item.discount)) * item.price;
  let discountedPrice = (Math.round(price * 100) / 100).toFixed(2);
  let temp = `<div class="row" id ="${itemINdex}">
                        <div class="column left" style="background-color:"white";">
                            <img  id="image" src=${item.Image}>
                        </div>
                            <div class="column right" >
                            <p id="desc" >${item.desc}</p>
                            <p id= "price">MRP: <del>Rs ${item.price}</del></p>
                            <p id= "discount">-${item.discount}% off</p> <p id ="finalPrice">RS ${discountedPrice} </p>
                            <p> <button class="buy" onclick="buyNow(${index},${itemINdex})">Buy Now</button> </p>
                            <button class="cart" onclick="addToCart(${index},${itemINdex})">Add To Cart</button> 
                        </div>
              </div>`;
  return temp;
}


function showDescriptionPage() {
  let index =  sessionStorage.getItem("arrIndex");
  let itemINdex =  sessionStorage.getItem("itemIndex");
  let arr = [getWood(), getWatches(), getLaptops(), getAirConditioners()];
  let items = arr[index];
  let item =items[itemINdex];
  let price = (1 - (0.01 * item.discount)) * item.price;
  let discountedPrice = (Math.round(price * 100) / 100).toFixed(2);
  let temp = `<div class="row" id ="${itemINdex}">
                    <h2>df</h2>
                    </div>`;
  return temp;
}

function addToCart(arrIndex, itemIndex) {
  let arr = [getWood(), getWatches(), getLaptops(), getAirConditioners()];
  let items = arr[arrIndex];
  var x = JSON.parse(sessionStorage.getItem("cartItems"));
  if (x == null) {
    x = [];
  }
  x.push(items[itemIndex]);
  alert("Item Sucessfully added to Cart");
  sessionStorage.setItem("cartItems", JSON.stringify(x));
}

function addBuyItemToCart() {
  let buyItem = JSON.parse(sessionStorage.getItem("buyItem"));
  if (buyItem != null) {
    sessionStorage.setItem("buyItem", null);
    var x = JSON.parse(sessionStorage.getItem("cartItems"));
  if (x == null) {
    x = [];
  }
  x.push(buyItem);
  sessionStorage.setItem("cartItems", JSON.stringify(x));
  } 
}

function buyNow(arrIndex, itemIndex) {
  let arr = [getWood(), getWatches(), getLaptops(), getAirConditioners()];
  let items = arr[arrIndex];
  sessionStorage.setItem("buyItem", JSON.stringify(items[itemIndex]));
  window.open("cart.html", "_self");
}

function removeFromCart(itemIndex) {
  let buyItem = JSON.parse(sessionStorage.getItem("buyItem"));
  if (buyItem != null) {
    sessionStorage.setItem("buyItem", null)
  } else {
    let cartItems = JSON.parse(sessionStorage.getItem("cartItems"));
    cartItems.splice(itemIndex, 1);
    sessionStorage.setItem("cartItems", JSON.stringify(cartItems))
    document.getElementById('cart').innerHTML = getCartItems();
  }

  displayTotal();
}

function removeAll() {
  let buyItem = JSON.parse(sessionStorage.getItem("buyItem"));
  if (buyItem != null) {
    sessionStorage.setItem("buyItem", null)
  } else {
    let cartItems = []
    sessionStorage.setItem("cartItems", JSON.stringify(cartItems))
    document.getElementById('cart').innerHTML = getCartItems();
  }
  displayTotal();
}

function getCartItems() {
 let buyItem = JSON.parse(sessionStorage.getItem("buyItem"));
 let items = JSON.parse(sessionStorage.getItem("cartItems"));
//  let buyItem = null;
// let items = getWatches();
 var final = "";
  var cartHeading = "Cart is Empty";
  if (buyItem != null) {
    cartHeading = "";
    let item = buyItem;
    let price = (1 - (0.01 * item.discount)) * item.price;
    let discountedPrice = (Math.round(price * 100) / 100).toFixed(2);
    let temp = `<div class="row" id ="0">
      <a href=${item.link}>
      <div class="column left" style="background-color:"white";">
      <img  id="image" src=${item.Image}></a>
      </div>
      <div class="column right" >
      <p id= >${item.desc}</p>
      <p id= "price"><del>Rs ${item.price}</del></p>
      <p id= "discount">-${item.discount}% off</p> <p id ="finalPrice">RS ${discountedPrice} </p>
       <a id="button" href="cart.html"onclick="removeFromCart(${0})">Remove</a>
  </div>
  </div>`;
    final = temp;
  } else if (items.length > 0) {
    var result = "";
    cartHeading = "Cart Items";
    for (itemINdex in items) {
      let item = items[itemINdex];
      let price = (1 - (0.01 * item.discount)) * item.price;
      let discountedPrice = (Math.round(price * 100) / 100).toFixed(2);
      let temp = `<div class="row" id ="${itemINdex}">
                            <a href=${item.link}>
                            <div class="column left" style="background-color:"white";">
                            <img  id="image" src=${item.Image}></a>
                            </div>
                            <div class="column right" >
                            <p id= >${item.desc}</p>
                            <p id= "price"><del>Rs ${item.price}</del></p>
                            <p id= "discount">-${item.discount}% off</p> <p id ="finalPrice">RS ${discountedPrice} </p>
                             <a id="button" href="cart.html"onclick="removeFromCart(${itemINdex})">Remove</a>
                        </div>
                        </div>`
      result += temp;
    }
    final = result;

  }
  document.getElementById('cartHeading').innerHTML = cartHeading;
  return final;
}

function getTotal() {
  let buyItem = JSON.parse(sessionStorage.getItem("buyItem"));
  if (buyItem != null) {
    let price = (1 - (0.01 * buyItem.discount)) * buyItem.price;
    let discountedPrice = ((Math.round(price * 100) / 100).toFixed(2)) * 1;
    return discountedPrice;
  } else {
    var totalPrice = 0;
    let items = JSON.parse(sessionStorage.getItem("cartItems"));
    if (items == null) {
      return 0;
    } else {
      for (item of items) {
        let price = (1 - (0.01 * item.discount)) * item.price;
        let discountedPrice = ((Math.round(price * 100) / 100).toFixed(2)) * 1;
        totalPrice += discountedPrice;
        totalPrice *= 1;
      }
      return totalPrice;
    }
  }
}
function displayTotal() {
  let buyItem = JSON.parse(sessionStorage.getItem("buyItem"));
  let totalPrice = getTotal();
  if (totalPrice > 0) {
    document.getElementById('total').innerHTML = `Total Rs: ${totalPrice}`;
    if(buyItem!=null) {
      document.getElementById('removeallbutton').hidden = true;
      }
  } else {
    document.getElementById('column2').hidden = true;
    document.getElementById('removeallbutton').hidden = true;
  }
}


function proceedForPayment() {
  let total = getTotal();
  if (total > 0) {
    sessionStorage.setItem("total", total);
    window.open("paymentstatic.html", "_self");
   // window.open("payment.html", "_self");
  }

}


function getWatches() {
  let arr = [{
    link: "https://www.amazon.in/Apple-Watch-GPS-Cellular-45mm/dp/B09HHFR9XM/ref=sr_1_1_sspa?crid=3KXLHS7CCCW9R&keywords=apple+watches&qid=1669969605&qu=eyJxc2MiOiI2LjE3IiwicXNhIjoiNS44MiIsInFzcCI6IjMuMzkifQ%3D%3D&sprefix=applewatches%2Caps%2C387&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1",
    Image: "apples7.jpg",
    desc1: "Apple Watch Series 7",
    price: "20000",
    discount: "10",
    desc:"Apple Watch Series 7 (GPS + Cellular, 45mm) - Midnight Aluminium Case with Midnight Sport Band - Regular",
    details:`Brand*	Apple#
    Model Name*	Apple Watch Series 7#
    Style*	GPS + Cellular#
    Colour*	Midnight Aluminium Case / Midnight#
    Special Feature*	Sleep Monitor, Email, GPS, Notifications`
  },
  {
    link: "https://www.amazon.in/Apple-Watch-GPS-Cellular-40mm/dp/B09G9717T5/ref=sr_1_3?crid=3KXLHS7CCCW9R&keywords=apple+watches&qid=1669969605&qu=eyJxc2MiOiI2LjE3IiwicXNhIjoiNS44MiIsInFzcCI6IjMuMzkifQ%3D%3D&sprefix=applewatches%2Caps%2C387&sr=8-3",
    Image: "applese.jpg",
    desc1: "Apple Watch SE ",
    price: "28000",
    discount: "5",
    desc:"Apple Watch SE (GPS + Cellular, 40mm) - Space Grey Aluminium Case with Midnight Sport Band - Regular",
    details:`Brand	Apple#
    Style	GPS + Cellular#
    Colour	Space Grey Aluminium Case with Midnight Sport Band#
    Special Feature	GPS#
    Age Range (Description)	Adult`
  },
  {
    link: "https://www.amazon.in/Apple-Cellular-Titanium-Orange-Alpine/dp/B0BDKGNMJQ/ref=sr_1_13?crid=3KXLHS7CCCW9R&keywords=apple+watches&qid=1669969605&qu=eyJxc2MiOiI2LjE3IiwicXNhIjoiNS44MiIsInFzcCI6IjMuMzkifQ%3D%3D&sprefix=applewatches%2Caps%2C387&sr=8-13",
    Image: "appleultra.jpg",
    desc1: "Apple Watch Ultra",
    price: "88000",
    discount: "10",
    desc:"Apple Watch Ultra GPS + Cellular, 49mm Titanium Case with Orange Alpine Loop - Small",
    details:`
    Brand	*Apple#
    Style	*Modern#
    Colour	*Orange#
    Special Feature*	Distance Tracker#
    Age Range (Description)	*Adult`
    },
  {
    link: "https://www.amazon.in/Fossil-Smartwatch-Snapdragon-Smartphone-Notifications/dp/B09DGS966L/ref=sr_1_5?keywords=fossil+smart+watch+for+men&qid=1669973500&qu=eyJxc2MiOiI0Ljk2IiwicXNhIjoiNS4xNiIsInFzcCI6IjQuMjIifQ%3D%3D&sprefix=fossil+smart%2Caps%2C319&sr=8-5",
    Image: "fossilgen6.jpg",
    desc1: "Fossil Gen 6 Smartwatch",
    price: "78000",
    discount: "33",
    desc:"Fossil Gen 6 Smartwatch with AMOLED Screen, Snapdragon 4100+ Wear Platform, Wear OS by Google, Google Assistant, SpO2, Wellness Features and Smartphone Notifications",
    details:`
    Brand	*Fossil#
    Model Name	*Gen 6#
    Style*	Men#
    Colour*	Grey#
    Screen Size	*1.28 Inches
    `
  },
  {
    link: "https://www.amazon.in/Galaxy-Watch4-Classic-Bluetooth-4-2cm/dp/B09C6DNF6H/ref=sr_1_4?crid=1FYPDGBG85C45&keywords=samsung+smart+watch+for+men&qid=1669973549&qu=eyJxc2MiOiI2LjI2IiwicXNhIjoiNS45NiIsInFzcCI6IjQuOTMifQ%3D%3D&sprefix=samsung+smart+watch+for+men%2Caps%2C260&sr=8-4",
    Image: "samsung.jpg",
    desc1: "Samsung Galaxy Watch4",
    price: "7855",
    discount: "22",
    desc:"Samsung Galaxy Watch4 Classic Bluetooth(4.2 cm, Black, Compatible with Android Only)",
    details:`
    Brand	*Samsung#
    Style*	BT#
    Colour*	Black#
    Special Feature*	Sleep Monitor#
    Age Range (Description)	*Adult`
  },
  {
    link: "https://www.amazon.in/boAt-Wave-Call-Dedicated-Multi-Sport/dp/B0B5B6PQCT/ref=sr_1_2_sspa?keywords=boat%2Bsmart%2Bwatch%2Bfor%2Bmen&qid=1669973896&qu=eyJxc2MiOiI1LjQwIiwicXNhIjoiNS4wMSIsInFzcCI6IjQuMzYifQ%3D%3D&sprefix=boat%2Caps%2C277&sr=8-2-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1",
    Image: "boat.jpg",
    desc1: "boAt Wave Call Smart Watch",
    price: "2000",
    discount: "7",
    desc:`boAt Wave Call Smart Watch, Smart Talk with Advanced Dedicated Bluetooth Calling Chip, 1.69” HD Display with 550 NITS & 70% Color Gamut, 150+ Watch Faces, Multi-Sport Modes,HR,SpO2, IP68(Active Black)`,
    details: `
    Brand*	boAt#
    Model Name*	Wave Call#
    Style*	Modern#
    Colour	*Active Black#
    Special Feature*	Bluetooth Calling, Dial Pad, 150+ Watch Faces, 1.69" HD Display`
  },

  ];
  return arr;
}

function getLaptops() {
  let arr = [
    {
      link: "https://www.amazon.in/HP-Pavilion-Multitouch-enabled-Micro-Edge-14-ek0086TU/dp/B0B58SWPNS/ref=sr_1_1_sspa?crid=1YCZZ7IFRUCPX&keywords=hp+laptop&qid=1669974845&qu=eyJxc2MiOiI2LjgxIiwicXNhIjoiNi43NSIsInFzcCI6IjUuMjYifQ%3D%3D&sprefix=hp+laptop%2Caps%2C333&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1",
      Image: "hp.jpg",
      desc1: "HP Pavilion Laptop",
      desc: "HP Pavilion x360,12th Gen Intel Core i5-1235U 8GB RAM/512GB SSD 14-inch(35.6 cm) Multitouch-enabled Micro-Edge FHD Laptop /Intel Iris Xe Graphics/Backlit KB/B&O/Win 11/MSO 2021/Space Blue, 14-ek0086TUp",
      price: "80000",
      discount: "10",
      details:`Brand*	HP#
      Model Name*	14-ek0086TU#
      Screen Size	*14 Inches#
      Colour	*Space Blue#
      CPU Model	*Intel Core i5#
      RAM Memory Installed Size*	8 GB#
      Operating System*	Windows 11 Home#
      Special Feature*	Mult-touch Enabled, Full HD#
      Graphics Card Description	*Integrated#
      CPU Speed*	4.4 GHz`
    },
    {
      link: "https://www.amazon.in/Apple-MacBook-Chip-13-inch-256GB/dp/B08N5VSQNG/ref=sr_1_2_sspa?keywords=macbook+pro&qid=1669974916&qu=eyJxc2MiOiI1LjA3IiwicXNhIjoiNC4zMSIsInFzcCI6IjMuNTcifQ%3D%3D&sprefix=macbo%2Caps%2C392&sr=8-2-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1",
      Image: "macbookpro.jpg",
      desc1: "MacBook Pro Laptop",
      desc: "2020 Apple MacBook Pro (13.3-inch/33.78 cm, Apple M1 chip with 8‑core CPU and 8‑core GPU, 8GB RAM, 256GB SSD) - Space Grey",
      price: "125000",
      discount: "9",
      details:" Brand*	Apple# Model Name*	MacBook Pro#Screen Size*	13.3 Inches#Colour*	Space Grey#CPU Model *	Core M Family#RAM Memory* Installed Size	8 GB#Operating System*	macOS 10.14 Mojave# Special Feature	*fingerprint reader#Graphics Card Description*	Integrated# CPU Speed	3.1 GHz#",
    },
    {
      link: "https://www.amazon.in/dp/B0BDM69W6P/ref=syn_sd_onsite_desktop_209?ie=UTF8&psc=1&pd_rd_plhdr=t",
      Image: "lenovo.jpg",
      desc1: "Lenovo Laptop",
      desc:"Lenovo ThinkBook 15 Intel 12th Gen Core i5 15.6(39.62cm) FHD 250 nits Antiglare Thin and Light Laptop (16GB/512GB SSD/Windows 11 Home/MS Office H&S 2021/Backlit/Mineral Grey/1.7 Kg), 21DJA04LIH",
      price: "100000",
      discount: "25",
      details:`Brand*	Lenovo#
      Model Name	*TB 15 G4#
      Screen Size*	15.6 Inches#
      Colour*	Mineral Grey#
      CPU Model*	Core i5#
      RAM Memory Installed Size*	16 GB#
      Operating System*	Windows 11 Home#
      Special Feature	*Fingerprint Reader, Anti Glare Screen, Light Weight, Thin#
      Graphics Card Description	*Integrated#
      CPU Speed*	1.3 GHz`
    },
    {
      link: "https://www.amazon.in/Microsoft-Surface-Laptop-Studio-Touchscreen/dp/B07XB2Y7ZD/ref=sr_1_2_sspa?crid=4FEI7XL81RDY&keywords=laptop&qid=1669974074&qu=eyJxc2MiOiI5LjIyIiwicXNhIjoiOS40OSIsInFzcCI6IjYuODUifQ%3D%3D&sprefix=laptop%2Caps%2C361&sr=8-2-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1",
      Image: "microsoftsurface.jpg",
      desc1: "Microsoft Surface Laptop Studio",
      desc: "Microsoft Surface Laptop Studio - 14.4 Inches Touchscreen - Intel ® Core I5 - 16Gb Memory - 256Gb Ssd - Platinum Windows 11 (Thr-00022)",
      price: "150000",
      discount: "20",
      details: `Brand*	Microsoft #
      Series*	Surface Laptop Studio #
      Screen Size*	12.3 Inches #
      Colour*	Platinum #
      Hard Disk Size	*256 GB#
      CPU Model	*Quad-Core#
      RAM Memory Installed Size*	16 GB#
      Operating System*Windows 11#
      Special Feature*	NVIDIA's 2nd gen RTX architecture, enabling ray-traced graphics and cutting-edge AI features from NVIDIA® GeForce RTX™ 3050 Ti, Factory-calibrated PixelSense™ Flow touch display features smoother scrolling with up to 120Hz refresh rate, Intel® Core™ i5 models: Intel® Iris® Xe Graphics, Play the latest games with graphics that rival reality. With DirectX 12 Ultimate and NVIDIA® GeForce RTX™ 3050 Ti laptop GPU, Click anywhere on the Precision Haptic touchpad, our largest yet, with extra built-in sensors for comfortable, customisable haptic feedback.NVIDIA's 2nd gen RTX architecture, enabling ray-traced graphics and cutting-edge AI features from NVIDIA® GeForce RTX™ 3050 Ti, Factory-cali…`
    },
    {
      link: "https://www.amazon.in/ASUS-15-6-inch-Integrated-Transparent-X515MA-BR011W/dp/B09SGGB687/ref=sr_1_5?crid=4FEI7XL81RDY&keywords=laptop&qid=1669974074&qu=eyJxc2MiOiI5LjIyIiwicXNhIjoiOS40OSIsInFzcCI6IjYuODUifQ%3D%3D&sprefix=laptop%2Caps%2C361&sr=8-5",
      Image: "asus.jpg",
      desc1: "ASUS VivoBook 15",
      desc: "ASUS VivoBook 15 (2021), 15.6-inch (39.62 cm) HD, Dual Core Intel Celeron N4020, Thin and Light Laptop (4GB RAM/256GB SSD/Integrated Graphics/Windows 11 Home/Transparent Silver/1.8 Kg), X515MA-BR011W",
      price: "33000",
      discount: "15",
      details:`Brand*	ASUS#
      Series*	VivoBook 15 (2021)#
      Screen Size*	15.6 Inches#
      Colour	*Transparent Silver#
      Hard Disk Size*	256 GB#
      CPU Model	*Celeron N4020#
      RAM Memory Installed Size*	4 GB#
      Operating System	*Windows 11 Home#
      Special Feature	*FingerPrint Reader, Thin and Light Laptop, HD (1366 x 768) Display, Anti-glare Panel#
      Graphics Card Description*Integrated`
    }, {
      link: "https://www.amazon.in/Dell-Inspiron-Graphics-Anti-Glare-D560766Win9Be/dp/B09TNWYR3Q/ref=sr_1_3?crid=1KODM3ELFDAYM&keywords=dell+laptop&qid=1670000080&qu=eyJxc2MiOiI3LjU1IiwicXNhIjoiNy40MyIsInFzcCI6IjQuNjYifQ%3D%3D&sprefix=dell+lapto%2Caps%2C288&sr=8-3",
      Image: "https://m.media-amazon.com/images/I/61IYtAceS1L._SX679_.jpg",
      desc1: "Dell Inspiron 3525 Laptop",
      desc: "Dell Inspiron 3525 Laptop, AMD Athlon Silver 3050U, Win11 + Office 21, 8GB GDDR4, 256GB SSD, Radeon Graphics, 15.6 (39.62Cms) HD AG, Black (D560766WIN9BE, 1.68Kgs)",
      price: "46000",
      discount: "5",
      details:`
      Brand	*Dell#
      Series*	Inspiron 3525#
      Screen *Size	15.6 Inches#
      Colour*	Carbon Black#
      Hard Disk Size	*256 GB#
      CPU Model	*Athlon#
      RAM Memory Installed Size*	8 GB#
      Operating System*	Windows 11#
      Special Feature*	Anti Glare Screen#
      Graphics Card Description	*Intel`
    }
  ]
  return arr
}

function getAirConditioners() {
  let arr = [

    {
      link: "https://www.amazon.in/LG-Convertible-Anti-Virus-Protection-PS-Q19YNZE/dp/B09NS5TKPN/ref=sr_1_3?crid=RSOODQNEYJDG&keywords=lg+ac&qid=1669999296&qu=eyJxc2MiOiI0LjAwIiwicXNhIjoiMy44NyIsInFzcCI6IjIuMzYifQ%3D%3D&sprefix=lg+ac%2Caps%2C332&sr=8-3",
      Image: "https://m.media-amazon.com/images/I/51hbo8yQ1EL._SX679_.jpg",
      desc1: "LG 1.5 Ton 5 Star AI DUAL Inverter Split AC",
      desc: "LG 1.5 Ton 5 Star AC",
      price: "42000",
      discount: "10"
    },
    {
      link: "https://www.amazon.in/Samsung-Convertible-Inverter-Split-AR12BY5YAWK/dp/B09SD2TGKH/ref=sr_1_4?crid=2IBOMSO19N49B&keywords=samsung+ac&qid=1669999364&qu=eyJxc2MiOiI0Ljk1IiwicXNhIjoiNC42MyIsInFzcCI6IjMuMDMifQ%3D%3D&sprefix=sam%2Caps%2C553&sr=8-4",
      Image: "https://m.media-amazon.com/images/I/61NTV--afOL._SX679_.jpg",
      desc1: "Samsung 1 Ton 5 Star AC",
      desc: "Samsung 1 Ton 5 Star AC (Copper, Convertible 5-in-1 Cooling Mode, 2022 Model, AR12BY5YAWK White)",
      price: "37777",
      discount: "8"
    },
    {
      link: "https://www.amazon.in/Blue-Star-Inverter-Copper-IC309RBTU/dp/B08L6QX5WC/ref=sr_1_3?crid=2MLRMDM0C0U43&keywords=bluestar+ac&qid=1669999419&qu=eyJxc2MiOiI0LjkyIiwicXNhIjoiNC4zMyIsInFzcCI6IjEuMjkifQ%3D%3D&sprefix=bluestar+ac%2Caps%2C755&sr=8-3",
      Image: "https://m.media-amazon.com/images/I/51+ZOn7EQCL._SX679_.jpg",
      desc1: "Blue Star 0.8 Tons 3 StarAC",
      desc: "Blue Star 0.8 Tons 3 Star Inverter Split AC(Copper, 2020 Model, IC309RBTU, White)",
      price: "27852",
      discount: "10"
    },
    {
      link: "https://www.amazon.in/Voltas-Inverter-Split-Conditioner-VOLTAS/dp/B09WDP2DLF/ref=sr_1_3?keywords=voltas+1.5+ton+ac&qid=1669999191&qu=eyJxc2MiOiI1LjEzIiwicXNhIjoiNC44OSIsInFzcCI6IjIuMDAifQ%3D%3D&sprefix=voltas+1.5%2Caps%2C536&sr=8-3",
      Image: "https://m.media-amazon.com/images/I/51v0JgEpzfL._SX679_.jpg",
      desc1: "Voltas  1.5 Ton 5 Star AC",
      desc: "Voltas Inverter Split Air Conditioner 1.5 Ton 5 Star(VOLTAS SAC 185V DAZJ)",
      price: "35000",
      discount: "15"
    },
    {
      link: "https://www.amazon.in/Voltas-Inverter-Split-Copper-SAC_185V_JZJ/dp/B07NQ7KCPF/ref=sr_1_7?keywords=voltas+1.5+ton+ac&qid=1669999191&qu=eyJxc2MiOiI1LjEzIiwicXNhIjoiNC44OSIsInFzcCI6IjIuMDAifQ%3D%3D&sprefix=voltas+1.5%2Caps%2C536&sr=8-7",
      Image: "https://m.media-amazon.com/images/I/41oKXckcdKL._SX425_.jpg",
      desc: "Voltas 1.5 Ton 5 Star Inverter Split AC (Copper SAC_185V_JZJ White)",
      desc1: "Voltas 1.5 Ton 5 Star AC ",
      price: "40000",
      discount: "19"
    }, {
      link: "https://www.amazon.in/Blue-Star-Inverter-Convertible-IA318FNU/dp/B09RG2SZVX/ref=sr_1_2_sspa?crid=2MLRMDM0C0U43&keywords=bluestar+ac&qid=1669999419&qu=eyJxc2MiOiI0LjkyIiwicXNhIjoiNC4zMyIsInFzcCI6IjEuMjkifQ%3D%3D&sprefix=bluestar+ac%2Caps%2C755&sr=8-2-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1",
      Image: "https://m.media-amazon.com/images/I/51mgk06aiJL.jpg",
      price: "35210",
      desc1: "Blue Star 1.5 Ton  AC ",
      desc: "Blue Star 1.5 Ton 3 Star Inverter Split AC (Copper, Convertible 4-in-1 Cooling Mode, 2022 Model, IA318FNU, White)",
      discount: "25"
    }
  ]
  return arr;
}


function getWood() {
  let arr = [{
      link: "https://www.amazon.in/Sleep-Company-Orthopedic-Adjustable-Adjustments/dp/B09VYZMY5M/ref=sr_1_3_sspa?keywords=furniture&qid=1669998290&qu=eyJxc2MiOiI5LjMzIiwicXNhIjoiOC42MyIsInFzcCI6IjUuNjYifQ%3D%3D&sprefix=furnit%2Caps%2C401&sr=8-3-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1",
      Image: "https://m.media-amazon.com/images/I/71ULkEIWlQL._SX679_.jpg",
      desc1: "The Sleep Company SmartGRID ARISTO Chair",
      desc: "The Sleep Company SmartGRID ARISTO Chair for Office & Home, SmartGRID Technology with Adjustable Lumbar support for ergonomic sitting posture | Elegant & Premium Tiffany Blue Mesh design| Multiple Adjustments Mechanism | Made in India | (White & Tiffany Blue)",

      price: "14999",
      discount: "10"
  },
  {
      link: "https://www.amazon.in/Tree-House-Nesting-Nightstand-Furniture/dp/B0BH4W3R4P/ref=sr_1_8?keywords=furniture&qid=1669998290&qu=eyJxc2MiOiI5LjMzIiwicXNhIjoiOC42MyIsInFzcCI6IjUuNjYifQ%3D%3D&sprefix=furnit%2Caps%2C401&sr=8-8",
      Image: "https://m.media-amazon.com/images/I/41RxMBntQFL._SX679_.jpg",
      desc1: "House Nesting Triangle End Coffee Table",
      desc: "Tree House Nesting Triangle End Coffee Tables Nightstand Modern Furniture for Home Office Living Room Nest White Table",

      price: "1599",
      discount: "9"
  },
  {
      link: "https://www.amazon.in/Aprodz-Sheesham-Avavia-Seater-Furniture/dp/B081T8XRJM/ref=sr_1_7?crid=38972CNNOFZCV&keywords=dining+table&qid=1669998599&qu=eyJxc2MiOiI4LjUxIiwicXNhIjoiOC44NSIsInFzcCI6IjUuMjAifQ%3D%3D&sprefix=di%2Caps%2C530&sr=8-7",
      Image: "https://m.media-amazon.com/images/I/61260yYzG9L._SX522_.jpg",
      desc1: "6 Seater Dining Table Set with Bench",
      desc: "Aprodz Sheesham Wood Avavia 6 Seater Dining Table Set with Bench for Home | Dining Furniture | Brown Finish",
      price: "30999",
      discount: "35"
  },
  {
      link: "https://www.amazon.in/Amazon-Brand-Solimo-DR-DS-004-1-Seater/dp/B089BG6SJD/ref=sr_1_16?crid=38972CNNOFZCV&keywords=dining+table&qid=1669998599&qu=eyJxc2MiOiI4LjUxIiwicXNhIjoiOC44NSIsInFzcCI6IjUuMjAifQ%3D%3D&sprefix=di%2Caps%2C530&sr=8-16",
      Image: "https://m.media-amazon.com/images/I/81R0kf1DUWS._SX679_.jpg",
      desc1: "Solimo Carina Engineered Wood & Metal 4 Seater Dining Set",
      desc: "Amazon Brand - Solimo Carina Engineered Wood & Metal 4 Seater Dining Set",
      price: "13000",
      discount: "25"
  },
  {
      link: "https://www.amazon.in/Cello-Novelty-Compact-Cupboard-Brown/dp/B01BHPPSZI/ref=sr_1_11?crid=L4AUO54OIVCA&keywords=cupboard&qid=1669998771&qu=eyJxc2MiOiI3LjM3IiwicXNhIjoiNy41OCIsInFzcCI6IjUuNTgifQ%3D%3D&sprefix=cupboar%2Caps%2C603&sr=8-11",
      Image: "https://m.media-amazon.com/images/I/51rtfz8X1CL._SX522_.jpg",
      desc1: "Plastic 2 Door Cupboard with Shelf(Brown)",
      desc: "Cello Novelty Compact Plastic 2 Door Cupboard with Shelf(Brown)",
      price: "3000",
      discount: "9"
  },
  {
      link: "https://www.amazon.in/Amazon-Brand-Cabelli-Engineered-Wardrobe/dp/B09ZV6PRHZ/ref=sr_1_4_sspa?crid=L4AUO54OIVCA&keywords=cupboard&qid=1669998771&qu=eyJxc2MiOiI3LjM3IiwicXNhIjoiNy41OCIsInFzcCI6IjUuNTgifQ%3D%3D&sprefix=cupboar%2Caps%2C603&sr=8-4-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1",
      Image: "https://m.media-amazon.com/images/I/61lrpHrrblL._SX522_.jpg",
      desc1: "Solimo Cabelli Engineered Wood 3 Door Wardrobe",
      desc: "Amazon Brand - Solimo Cabelli Engineered Wood 3 Door Wardrobe with 2 Drawers and Mirror (Walnut Finish)",
      price: "15000",
      discount: "44"
  }
  ];
  return arr;
}

document.getElementById('cart').innerHTML = getCartItems();
displayTotal();