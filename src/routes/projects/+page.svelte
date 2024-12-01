<script>
   import Navbar from "$lib/components/navbar.svelte";
  import { dndzone } from 'svelte-dnd-action';

  let items = [
    { id: '1', src: 'hacker.png', alt: 'Hacker Image' }
  ];

  function handleDrop(event) {
    // Handle drop event if needed
    console.log('Dropped items:', event.detail.items);
  }

  function handleDragStart(event) {
    // Custom behavior on drag start
    console.log('Drag started');
  }

  function handleDragEnd(event) {
    // Custom behavior on drag end
    console.log('Drag ended');
  }

</script>

<Navbar />
<div class="text-center pt-20 max-sm:pt-0 md:pt-5">
  <p class="text-5xl text-white font-medium">Projects</p>
</div>
<div class="flex flex-col items-center justify-center">
  <div
    class="grid lg:grid-cols-3 md:grid-cols-2 justify-items-center place-items-center mx-10 md:gap-16 sm:grid-cols-1 text-white mb-10"
  >
    <div
      class="lg:w-[20rem] md:w-[15rem] sm:w-[5rem] pt-14 font-medium text-center"
    >
      <div class="backdrop-blur bg-[#fff] rounded-xl bg-opacity-40 w-fit p-4">
        <a href="https://github.com/Prajjwal-08/web-developement"
          ><img
            src="image 31.png"
            alt=""
            class="sm:hidden lg:block md:block rounded-xl"
          /></a
        >
        <p class="p-3 text-xl">Music Web</p>
        <span
          >"Experience the rhythm with our sleek music web! Play, pause, and
          enjoy a curated collection of 10 captivating songs, crafted using HTML
          and CSS."</span
        >
        <a
          class="mt-3 button"
          href="https://github.com/Prajjwal-08/web-developement"
          ><i class="fab fa-github text" />Link to Project</a
        >
      </div>
    </div>
    <div
      class="lg:w-[20rem] md:w-[15rem] sm:w-[5rem] pt-14 font-medium text-center"
    >
      <div class="backdrop-blur bg-[#fff] rounded-xl bg-opacity-40 p-4">
        <a
          href="http://github.com/Prajjwal-08/soda-shop/tree/eba2eba3a982ac203cc30727a2efedf989efb5fa/soda%20shop"
        >
          <img
            src="image 30.png"
            alt=""
            class="w-[46%] rounded-xl"
            style=" margin: 0 auto; vertical-align: middle;"
          /></a
        >
        <p class="p-3 text-xl">Soda Shop</p>
        <span>
          "A delightful virtual soda shop experience! Our web combines HTML,
          CSS, and JavaScript to showcase a charming soda menu, interactive
          ordering, and a vibrant ambiance."
        </span>
        <a
          class="mt-3 button"
          href="https://github.com/Prajjwal-08/soda-shop/tree/eba2eba3a982ac203cc30727a2efedf989efb5fa/soda%20shop"
          ><i class="fab fa-github text" />Link to Project</a
        >
      </div>
    </div>
	<div class="relative">
		<div use:dndzone={{ items }} on:dndzone:drop={handleDrop}>
		  {#each items as item (item.id)}
			<img
			  src={item.src}
			  alt={item.alt}
			  class="draggable md:w-[18rem] lg:w-[25rem] hidden sm:block"
			  use:dndzone
			  on:dragstart={handleDragStart}
			  on:dragend={handleDragEnd}
			/>
		  {/each}
		</div>
	  </div>
	  
    <div
      class="lg:w-[20rem] md:w-[15rem] sm:w-[8rem] pt-14 font-medium text-center"
    >
      <div class="backdrop-blur bg-[#fff] rounded-xl bg-opacity-40 w-fit p-4">
        <a href="http://valuationupdates.com/astrologer/"
          ><img src="astrologer.jpg" alt="" class=" rounded-xl" /></a
        >
        <p class="p-3 text-xl">Astrology Web</p>
        <span
          >"The WordPress Astrology Project combines astrology and WordPress,
          offering personalized services, educational content, and community
          engagement for astrology enthusiasts."</span
        >
        <a class="mt-3 button" href="https://valuationupdates.com/astrologer/"
          ><i class="fab fa-github text" />Link to Project</a
        >
      </div>
    </div>
    <div
      class="lg:w-[20rem] md:w-[15rem] sm:w-[8rem] pt-14 font-medium text-center place-items-center"
    >
      <div class="backdrop-blur bg-[#fff] rounded-xl bg-opacity-40 p-4">
        <a href="https://github.com/Prajjwal-08/portfolio">
          <img src="portfolio.jpg" alt="" class="w- rounded-xl" /></a
        >
        <p class="p-3 text-xl">Portfolio</p>
        <span>
          "Web developer and designer showcasing a diverse portfolio of visually
          appealing and user-friendly websites. Passionate about creating
          exceptional digital experiences."
        </span>
        <a class="mt-3 button" href="https://github.com/Prajjwal-08/portfolio">
          <i class="fab fa-github text" /> Link to Project
        </a>
      </div>
    </div>
    <div class="flex flex-row justify-center mt-10">
      <div
        class="container lg:w-[20rem] md:w-[15rem] sm:w-[8rem] font-medium text-center"
      >
        <div class="backdrop-blur bg-[#fff] rounded-xl bg-opacity-40 p-4">
          <a href="https://github.com/Prajjwal-08/File-Management-System">
            <img src="file-mgmt.jpeg" alt="" class="w- rounded-xl" />
          </a>
          <p class="p-3 text-xl">File Management System</p>
          <span>
            " The File Management App built with            Laravel, offers streamlined file organization, personalized
            functionalities, and robust administrative control. "
          </span>
          <a
            class="mt-3 button"
            href="https://github.com/Prajjwal-08/File-Management-System"
          >
            <i class="fab fa-github text" /> Link to Project
          </a>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
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

  .button i {
    transition: 400ms;
  }

  .button:hover {
    background-color: transparent;
  }

  .button:hover .text {
    color: #181717;
  }

  .button:hover i {
    fill: #181717;
  }
</style>
