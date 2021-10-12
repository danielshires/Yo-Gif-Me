const cursorTag = document.querySelector("div.cursor")
const balls = cursorTag.querySelectorAll("div")
const ballHover = cursorTag.querySelector("div span")
const links = document.querySelectorAll("[data-hover]")

let aimX = 0
let aimY = 0

balls.forEach((ball, index) => {

    let currentX = 0
    let currentY = 0
    let speed = 0.3 - index * 0.01

    const animateBall = function () {
        currentX += (aimX - currentX) * speed
        currentY += (aimY - currentY) * speed

        ball.style.left = currentX + "px"
        ball.style.top = currentY + "px"

        requestAnimationFrame(animateBall)
    }

    animateBall();
})

document.addEventListener("mousemove", function (event) {

    aimX = event.pageX
    aimY = event.pageY
    // ball.style.left = event.pageX + "px"
    // ball.style.top = event.pageY + "px"
})

links.forEach(link => {

    link.addEventListener("mouseover", function () {
        balls.forEach(ball => {
            ball.style.transform = "scale(3)"
            ball.style.mixBlendMode = "difference"

        })
        })

    link.addEventListener("mouseout", function () {
        balls.forEach(ball => {
            ball.style.transform = "scale(1)"
            ball.style.mixBlendMode = "normal"
        })
    })
})