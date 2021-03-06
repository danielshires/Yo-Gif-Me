barba.use(barbaCss)

barba.init({

    transitions: [

        {
            name: "fade",
            once() {


            },

            beforeEnter({
                current,
                next,
                trigger
            }) {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                })
            },
        }

    ],

    views: [

        {
            namespace: 'index',

            beforeEnter() {
                navBrand.classList.add("navBrand_light")
                navBrandLink.forEach(i => {
                    i.classList.add("navBrand_light")
                });

            },
            afterLeave() {
                navBrand.classList.remove("navBrand_light")
                navBrandLink.forEach(i => {
                    i.classList.remove("navBrand_light")
                });

            }
        }
    ]

})