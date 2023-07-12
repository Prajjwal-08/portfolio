<script>
  import Navbar from "$lib/components/navbar.svelte";
  let num = 0;
  var arr = ["WEB DEVELOPER", "WEB DESIGNER","FREELANCER"];

  const interval = setInterval(function () {
    if (num < 2) {
      num = num + 1;
    } else {
      num = 0;
    }
  }, 4000);

  // clearInterval(interval);
</script>

<Navbar />
<div class="text-white h-screen relative ">
  <div class="pt-16 -ml-5 gap-1 mb-4 justify-center">
    <div
      class="bg-[#FEA561] text-transparent lg:w-[4.75] lg:h-[4.75] md:w-14 md:h-14 rounded-lg ml-[36rem] hidden sm:block"
    >
      .
    </div>
    <div
      class="bg-[#3E6CF5] text-transparent lg:w-[4.75] lg:h-[4.75] md:w-14 md:h-14 rounded-lg ml-[39.5rem] absolute hidden sm:block"
    >
      .
    </div>
  </div>
  <div class=" rounded-xl pl-16">
    <p class="text-5xl sm:gap-10 lg:gap-0 md:gap-0 sm:w-full font-bold">
      Hi I'm <span class="animate-pulse"
        >Prajjwal Shrim<span class="rounded-lg pr-6 bg-[#00D763]">al</span
        ></span
      >
    </p>
  </div>

  <div class="flex gap-2 text-5xl font-bold w-full relative ">
    <span
      class="w-fit my-5 text-transparent ml-16 bg-clip-text bg-gradient-to-r from-[#1cdce8] via-[#bb77ed] to-[#f34a62] animate-typing whitespace-nowrap border-r-4 border-r-white pr-5 
      text-5xl"
    >
      {arr[num]}
    </span>
    <img
      src="2.png"
      alt=""
      class="absolute lg:right-16 lg:top-0 lg:w-1/4 rotate-6 md:right-0 md:top-48 max-sm:mt-[15rem] max-sm:-right-60   "
    />
  </div>
  <div class="w-1/2 ml-16 mt-10 text-2xl">
    <p>
      "Welcome to my home! I create stunning web experiences, combining elegant
      design with cutting-edge technology to make your online presence shine."
    </p>
    <button class="mt-10"><a href="/contact" class="">Hire Me</a></button>
  </div>

  <p class="p-16 text-transparent">.</p>
  <div class="grid grid-flow-col rounded-full gap-8 justify-center text-slate-100 text-4xl" >
    <a href="https://www.behance.net/prajjwalshrimal" target="_blank"><i class="fa-brands fa-behance text-3xl hover:scale-125 hover:bg-blue-700 p-0.5"/></a>
    <a href="https://www.linkedin.com/in/prajjwal-shrimal/" target="_blank"><i class="fa fa-linkedin text-3xl hover:scale-125 hover:bg-blue-600 px-1"/></a>
    <a href="https://github.com/Prajjwal-08" target="_blank" ><i class="fa-brands fa-square-github text-3xl hover:scale-150 hover:bg-black rounded-xl" /></a >
    <a href="https://www.instagram.com/_.prajju08._/" target="_blank"><i class="fa fa-instagram text-3xl hover:scale-125 hover:bg-gradient-to-r via-[#FE0665] to-[#D300C5] from-[#FF7901] rounded-md px-1"/></a>
  </div>
</div>

<style>
  button {
    padding: 0.8em 1.8em;
    border: 2px solid #1cdce8;
    position: relative;
    overflow: hidden;
    background-color: transparent;
    text-align: center;
    text-transform: uppercase;
    font-size: 20px;
    transition: 0.3s;
    z-index: 1;
    font-family: inherit;
    color: #1cdce8;
  }
  button::before {
    content: "";
    width: 0;
    height: 300%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    background: #1cdce8;
    transition: 0.5s ease;
    display: block;
    z-index: -1;
  }
  button:hover::before {
    width: 105%;
  }
  button:hover {
    color: #111;
  }
</style>
