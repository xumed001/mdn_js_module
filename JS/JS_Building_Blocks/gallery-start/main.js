const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const ImgArray = ['pic1.jpg','pic2.jpg','pic3.jpg','pic4.jpg','pic5.jpg']
/* Declaring the alternative text for each image file */
const altText = {
    'pic1.jpg': 'eyes',
    'pic2.jpg': 'waves',
    'pic3.jpg': 'white and purple flowers',
    'pic4.jpg': 'egyptian wall art',
    'pic5.jpg': 'butterfly on a leaf'
}
/* Looping through images */
for (const img of ImgArray) {
    let image = document.createElement('img')
    image.setAttribute('src', `images/${img}`)
    image.setAttribute("alt", `${altText[img]}`);

    thumbBar.appendChild(image)

    image.addEventListener('click', (e) => {
        // displayedImage.setAttribute('src', `images/${img}`)
        // displayedImage.setAttribute("alt", `${altText[img]}`);
        displayedImage.src = e.target.src
        displayedImage.alt = e.target.alt
    })
}

/* Wiring up the Darken/Lighten button */
btn.addEventListener('click', darken)

function darken(){
    const light = `rgba(0,0,0,0)`
    const dark = `rgba(0,0,0,.5)`
    
    if (btn.className === 'light'){
        overlay.style.backgroundColor = dark
        btn.className = 'dark'
        btn.textContent = 'Lighten'
    } else {
        overlay.style.backgroundColor = light
        btn.className = 'light'
        btn.textContent = 'Darken'
    }
}