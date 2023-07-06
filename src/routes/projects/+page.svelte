<script>
    import Navbar from "$lib/components/navbar.svelte"
</script>
<Navbar/>
<div class="text-center pt-20">
<p class="text-5xl text-white font-medium">Projects</p></div>
<div class="flex gap-6 justify-center text-white">
  <div class="w-[20rem] pt-14 font-medium text-center">
	<div class="backdrop-blur bg-[#fff] rounded-xl bg-opacity-40 w-fit p-4">
	   <img src="image 31.png" alt="" class=" rounded-xl" />
	   <p class="p-3 text-xl">Music Web
	 </p>
	 <span>"Experience the rhythm with our sleek music web! Play, pause, and enjoy a curated collection of 10 captivating songs, crafted using HTML and CSS."</span>
	 <a class="mt-3 button" href="https://github.com/Prajjwal-08/web-developement" >Link to Project</a>
    </div>
 </div>
<div class="w-[20rem] pt-14 font-medium  text-center">
	<div class="backdrop-blur bg-[#fff] rounded-xl bg-opacity-40  p-4  ">
	   <img src="image 30.png" alt="" class="w-[46%] rounded-xl ml-20 " />
	   <p class="pt-7 text-xl">Soda Shop</p>
	 <span>    
		"A delightful virtual soda shop experience! Our web combines HTML, CSS, and JavaScript to showcase a charming soda menu, interactive ordering, and a vibrant ambiance."
		                        
	 </span>
	 <a class="mt-3 button" href="https://github.com/Prajjwal-08/soda-shop/tree/eba2eba3a982ac203cc30727a2efedf989efb5fa/soda%20shop">Link to Project</a>
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
  
  .button svg path {
	transition: 400ms;
  }
  
  .button:hover {
	background-color: transparent;
  }
  
  .button:hover .text {
	color: #181717;
  }
  
  .button:hover svg path {
	fill: #181717;
  }</style>
