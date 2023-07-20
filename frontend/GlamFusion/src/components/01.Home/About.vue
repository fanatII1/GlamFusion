<template>
    <section id="About">
        <h2 class="AboutHeading">About Us</h2>
        <div class="underline"></div>

        <!-- ABOUT DESCRIPTION -->
        <div class="AboutDescription">
            <div class="about-photos">
                <div class="photo-1">
                    <img src="../../assets/img/background-3.jfif" alt="" class="first-img">
                </div>
                <div class="photo-2">
                    <img src="../../assets/img/background-4.webp" alt="" class="first-img">
                </div>
            </div>
            <div class="aboutText">
                <h3 class="AboutTextHeading">Glamorous Fusion - Your Style, Your Way!</h3>
                <p class="aboutTextDescription">
                    At Glamorous Fusion, we are passionate about bringing out the best version of you. 
                    Our team of skilled professionals is dedicated to unlocking your inner glamour and enhancing your natural beauty. 
                </p>
                <p class="aboutTextDescription">
                    Whether it's a fresh haircut, dazzling hair braids, flawless makeup, or perfectly polished nails, we have the expertise to make you shine.
                    With a commitment to excellence and a focus on customer satisfaction, we strive to provide exceptional services that leave you feeling confident and fabulous.
                    Join us at Glamorous Fusion and experience the magic of transformation. Your glamour journey starts here!
                </p>
            </div>
        </div>
    </section>
</template>

<script setup>

</script>

<style scoped>
#About{
    height: 55%;
}
.AboutHeading{
    color: #fff;
    text-align: center;
    font-size: 2rem;
    width: 10%;
    margin: 0 auto;
}

.underline{
    width: 10%;
    height: 5px;
    background-color: #d69c4a;
    margin: 0 auto;
}

/* @media screen and (max-width: 1440px) {
    #AboutHeading, .underline{
        width: 20%;
    }
}

@media screen and (max-width: 768px) {
    #AboutHeading, .underline{
        width: 40%;
    }
} */

.AboutDescription{
    background-color: #000;
    height: 100%;
    display: flex;
    max-height: 480px;
}

.about-photos{
    display: flex;
    align-items: end;
}

.about-photos, .aboutText{
    width: 50%;
    column-gap: 1%;
}


.photo-1{
    width: 38%;
    height: 75%;
}
.photo-2{
    width: 45%;
    height: 90%;
}

.photo-1 img{
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-top-left-radius: 45%;
    border-top-right-radius: 45%;
}

.photo-2 img{
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.AboutTextHeading{
    color: #fff;
    font-size: 2.1rem;
}

.aboutTextDescription{
    color: #ababab;
    font-size: 1.1rem;
}
</style>