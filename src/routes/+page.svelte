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

  <div class="flex text-white p-8 pt-20">
    <div class="Left lg:w-1/2 md:w-1/2 sm:w-full">
      
      <p class="text-5xl lg:gap-0 md:gap-0  sm:w-full font-bold mt-10">
        Hi I'm <span class="sm:leading-6 "
          >Prajjwal Shrim<span class="rounded-lg pr-6 mt-2 bg-[#00D763]">al</span
          ></span
        >
      </p>
      <div 
      class="w-fit my-5 text-transparent  bg-clip-text bg-gradient-to-r from-[#1cdce8] via-[#bb77ed] to-[#f34a62] animate-typing whitespace-nowrap border-r-4 border-r-white pr-5 
      text-5xl max-sm:text-3xl"
     >
      {arr[num]}
    </div>
    <p >
      "Welcome to my home! I create stunning web experiences, combining elegant
      design with cutting-edge technology to make your online presence shine."
    </p>
    <button class="mt-10"><a href="/contact" class="">Hire Me</a></button>
    </div>
    <div class="Right lg:w-1/2 md:w-1/2 sm:w-full "><img
      src="2.png"
      alt=""
      class="absolute lg:right-16 lg:top-20 lg:w-1/4 rotate-6 md:right-0 md:top-48 max-sm:mt-[33rem] max-sm:right-0 "
    /></div>
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