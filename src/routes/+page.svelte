<script>
  import Navbar from "$lib/components/navbar.svelte";
  let num = 0;
  var arr=["WEB DEVELOPER","WEB DESIGNER"]
  
  const interval = setInterval(function() {
    if (num < 1) {
      
      num=num+1;
    } else {
      num = 0;
    }
 }, 4000);

// clearInterval(interval);
  
</script>

<Navbar />
<div class="text-white h-screen">
  <div class="pt-16 -ml-5 gap-1 mb-4 justify-center">
    <div class="bg-[#FEA561] text-transparent w-20 h-20 rounded-lg ml-[35rem]">
      .
    </div>
    <div
      class="bg-[#3E6CF5] text-transparent w-16 h-16 rounded-lg ml-[39.5rem] absolute"
    >
      .
    </div>
  </div>
  <div class=" rounded-xl pl-16">
    <p class="text-5xl  font-bold ">
      Hi I'm  <span class="animate-pulse">Prajjwal Shrim<span class="rounded-lg pr-6 bg-[#00D763]">al</span></span>
    </p>
  </div>
 
  <div class="flex   gap-2 text-5xl font-bold w-fit">
    <h1
      class="w-fit  my-5 text-transparent ml-16 bg-clip-text bg-gradient-to-r from-[#ffdea6] via-[#9C62D1] to-[#6992A0] animate-typing whitespace-nowrap border-r-4 border-r-white pr-5 text-5xl"
    >
     {arr[num]} 
    </h1>
    <img src="2.png" alt="" class="absolute right-16 top-24 w-1/4 rotate-6 md" />
  </div>
  <div class="w-1/2 ml-16 mt-10 text-2xl">
    <p>
      "Welcome to my home! I create stunning web experiences, combining elegant
      design with cutting-edge technology to make your online presence shine."
    </p>
  </div>
</div>
<div
  class="flex rounded-full gap-8 justify-center absolute bottom-14 w-full text-white text-3xl"
>
  <a href="https://www.behance.net/prajjwalshrimal" target="_blank">
    <i class="fa-brands fa-behance text-3xl" /></a
  >
  <a href="https://www.linkedin.com/in/prajjwal-shrimal/" target="_blank"
    ><i class="fa fa-linkedin text-3xl" /></a
  >
  <a href="https://github.com/Prajjwal-08" target="_blank"
    ><i class="fa fa-github text-3xl" /></a
  >
  <a href="https://www.instagram.com/_.prajju08._/" target="_blank"
    ><i class="fa fa-instagram text-3xl" /></a
  >
</div>

<style>
  .message {
    color: #ffffff;
    display: block;
    font-weight: 900;
    overflow: hidden;
    position: absolute;
    padding-left: 0.5rem;
    top: 0.2rem;
    left: 500px;
    animation: openclose 5s ease-in-out infinite;
  }

  .word1,
  .word2 {
    font-family: tahoma;
  }

  @keyframes openclose {
    0% {
      top: 0.2rem;
      width: 0;
    }
    5% {
      width: 0;
    }
    15% {
      width: 300px;
    }
    30% {
      top: 0.2rem;
      width: 300px;
    }
    33% {
      top: 0.2rem;
      width: 0;
    }
    35% {
      top: 0.2rem;
      width: 0;
    }
    38% {
      top: -4.5rem;
    }
    48% {
      top: -4.5rem;
      width: 300px;
    }
    62% {
      top: -4.5rem;
      width: 300px;
    }
    66% {
      top: -4.5rem;
      width: 0;
      text-indent: 0;
    }
    71% {
      top: -9rem;
      width: 0;
      text-indent: 5px;
    }
    86% {
      top: -9rem;
      width: 285px;
    }
    95% {
      top: -9rem;
      width: 285px;
    }
    98% {
      top: -9rem;
      width: 0px;
      text-indent: 5px;
    }
    100% {
      top: 0;
      width: 0;
      text-indent: 0;
    }
  }
</style>
