<script>
   import Navbar from "$lib/components/navbar.svelte";
</script>

<Navbar />

<div class="text-center pt-20 max-sm:pt-5 md:pt-5">
  <p class="text-4xl sm:text-5xl text-white font-medium">Projects</p>
</div>

<div class="flex flex-col items-center justify-center">
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 mx-4 sm:mx-10 text-white mb-10 flex-class">

    <!-- Project Card 1 -->
    <div class="pt-10 font-medium text-center boxes">
      <div class="backdrop-blur bg-[#fff] rounded-xl bg-opacity-40 p-4">
        <a href="https://github.com/Prajjwal-08/web-developement">
          <img src="image 31.png" alt="Music Web" class="w-full h-auto rounded-xl mb-4" />
        </a>
        <p class="p-3 text-xl">Music Web</p>
        <span class="block mb-3">
          "Experience the rhythm with our sleek music web! Play, pause, and enjoy a curated collection of 10 captivating songs, crafted using HTML and CSS."
        </span>
        <a class="mt-3 button" href="https://github.com/Prajjwal-08/web-developement">
          <i class="fab fa-github text" /> Link to Project
        </a>
      </div>
    </div>

    <!-- Project Card 2 -->
    <div class="pt-10 font-medium text-center boxes">
      <div class="backdrop-blur bg-[#fff] rounded-xl bg-opacity-40 p-4">
        <a href="http://github.com/Prajjwal-08/soda-shop/tree/eba2eba3a982ac203cc30727a2efedf989efb5fa/soda%20shop">
          <img src="image 30.png" alt="Soda Shop" class="w-1/2 mx-auto rounded-xl mb-4" />
        </a>
        <p class="p-3 text-xl">Soda Shop</p>
        <span class="block mb-3">
          "A delightful virtual soda shop experience! Our web combines HTML, CSS, and JavaScript to showcase a charming soda menu, interactive ordering, and a vibrant ambiance."
        </span>
        <a class="mt-3 button" href="https://github.com/Prajjwal-08/soda-shop/tree/eba2eba3a982ac203cc30727a2efedf989efb5fa/soda%20shop">
          <i class="fab fa-github text" /> Link to Project
        </a>
      </div>
    </div>

    <!-- Project Card 3 (Full width on all screens) -->
    <div class="sm:col-span-2 pt-10 font-medium text-center boxes-1">
      <div class="backdrop-blur bg-[#fff] rounded-xl bg-opacity-40 p-4">
        <a href="http://valuationupdates.com/astrologer/">
          <img src="astrologer.jpg" alt="Astrology Web" class="w-full h-auto rounded-xl mb-4" />
        </a>
        <p class="p-3 text-xl">Astrology Web</p>
        <span class="block mb-3">
          "The WordPress Astrology Project combines astrology and WordPress, offering personalized services, educational content, and community engagement for astrology enthusiasts."
        </span>
        <a class="mt-3 button" href="https://valuationupdates.com/astrologer/">
          <i class="fab fa-github text" /> Link to Project
        </a>
      </div>
    </div>

    <!-- Project Card 4 -->
    <div class="pt-10 font-medium text-center boxes">
      <div class="backdrop-blur bg-[#fff] rounded-xl bg-opacity-40 p-4">
        <a href="https://github.com/Prajjwal-08/portfolio">
          <img src="portfolio.jpg" alt="Portfolio" class="w-full h-auto rounded-xl mb-4" />
        </a>
        <p class="p-3 text-xl">Portfolio</p>
        <span class="block mb-3">
          "Web developer and designer showcasing a diverse portfolio of visually appealing and user-friendly websites. Passionate about creating exceptional digital experiences."
        </span>
        <a class="mt-3 button" href="https://github.com/Prajjwal-08/portfolio">
          <i class="fab fa-github text" /> Link to Project
        </a>
      </div>
    </div>

    <!-- Project Card 5 -->
    <div class="pt-10 font-medium text-center boxes">
      <div class="backdrop-blur bg-[#fff] rounded-xl bg-opacity-40 p-4">
        <a href="https://github.com/Prajjwal-08/File-Management-System">
          <img src="file-mgmt.jpeg" alt="File Management System" class="w-full h-auto rounded-xl mb-4" />
        </a>
        <p class="p-3 text-xl">File Management System</p>
        <span class="block mb-3">
          "The File Management App built with Laravel, offers streamlined file organization, personalized functionalities, and robust administrative control."
        </span>
        <a class="mt-3 button" href="https://github.com/Prajjwal-08/File-Management-System">
          <i class="fab fa-github text" /> Link to Project
        </a>
      </div>
    </div>

  </div>
</div>

<style>
  .boxes, .boxes .backdrop-blur {
    width: 100%;
    max-width: 400px;
    min-height: 450px;
  }

  .boxes-1 {
    width: 100%;
    max-width: 850px;
  }

  .flex-class {
    justify-content: center;
  }

  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 15px;
    gap: 15px;
    background-color: #181717;
    outline: 3px #181717 solid;
    outline-offset: -3px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    transition: 400ms;
  }

  .button .text {
    color: white;
    font-weight: 700;
    font-size: 1em;
    transition: 400ms;
  }

  .button:hover {
    background-color: transparent;
  }

  .button:hover .text {
    color: #181717;
  }
</style>
