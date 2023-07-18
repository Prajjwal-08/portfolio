<script>
   import Navbar from "$lib/components/navbar.svelte";
   
</script>

<Navbar />

<div class="text-white  w-full ">
   <div class="text-5xl flex gap-3 pt-20 px-20 max-sm:px-5 max-sm:w-full">
      <p class="">
         Technical
         <span class="text-teal-300">Skills</span>
      </p>
   </div>
   <div class=" pl-20 pt-4 max-sm:px-5 grid grid-cols-2 sm:grid-cols-1 w-full ">
      <p class="text-2xl md:text-xl md:w-[70%] lg:w-[60%] max-sm:w-full ">
         I possess a diverse set of technical skills that enable me to tackle
         complex challenges with ease. From developing innovative solutions to
         analyzing data and optimizing processes, I bring a versatile and
         adaptable approach. My expertise lies in leveraging technology to drive
         efficiency, enhance user experiences, and achieve business objectives.
      </p>
     
      <img src="learn.png" alt=" " class="hidden sm:block lg:top-12 md:right-0 lg:absolute md:mt-10  max-w-1/2 xl:w-max  w-80 lg:right-10 sm:top-40 " />
   </div>
   <div class="lg:w-[50rem]  lg:mt-[10rem] md:mt-[40rem]  ">
      <div class="grid lg:grid-cols-4 md:grid-cols-4  max-sm:grid-cols-2 pl-20 max-sm:px-7 pt-14 text-center ">
         <div class="w-[6.5rem] ">
            <div
               class="backdrop-blur bg-[#4B4B4B] rounded-xl bg-opacity-40 w-fit p-2"
            >
               <img src="html.png" alt="" class="p-4 flip-horizontal" />
            </div>
            <p class="p-3 text-base">HTML</p>
         </div>
         <div class="w-24">
            <div
               class="backdrop-blur bg-[#4B4B4B] rounded-xl bg-opacity-40 w-fit p-2"
            >
               <img src="css.png" alt="" class="p-4 flip-horizontal" />
            </div>
            <p class="p-3 text-base">CSS</p>
         </div>
         <div class="w-24">
            <div
               class="backdrop-blur bg-[#4B4B4B] rounded-xl bg-opacity-40 w-fit p-2"
            >
               <img src="svelte.png" alt="" class="p-4 flip-horizontal" />
            </div>
            <p class="p-3 text-base">Svelte</p>
         </div>
         <div class="w-[6.5rem]">
            <div
               class="backdrop-blur bg-[#4B4B4B] rounded-xl bg-opacity-40 w-fit p-4"
            >
               <img src="Tailwind.png" alt="" class="flip-horizontal" />
            </div>
            <p class="p-3 text-base">Tailwind CSS</p>
         </div>
      </div>
      <div class="grid lg:grid-cols-4 md:grid-cols-4 max-sm:px-7 max-sm:grid-cols-2 sm:grid-cols-2 pl-20 text-center">
         <div class="w-24">
            <div
               class="backdrop-blur bg-[#4B4B4B] rounded-xl bg-opacity-40 w-fit p-1"
            >
               <img src="figma.png" alt="" class="flip-horizontal" />
            </div>
            <p class="p-3 text-base">Figma</p>
         </div>
         <div class="w-24">
            <div
               class="backdrop-blur bg-[#4B4B4B] rounded-xl bg-opacity-40 w-fit "
            >
               <img src="firebase.png" alt="" class="p-6 flip-horizontal" />
            </div>
            <p class="p-3 text-base">Firebase</p>
         </div>
         <div class="w-24">
            <div
               class="backdrop-blur bg-[#4B4B4B] rounded-xl bg-opacity-40 w-fit "
            >
               <img src="js1.png" alt="" class="p-6 flip-horizontal" />
            </div>
            <p class="p-3 text-base">JavaScript</p>
         </div>
         <div class="w-24">
            <div
               class="backdrop-blur bg-[#4B4B4B] rounded-xl bg-opacity-40 w-fit "
            >
               <img src="wordpress.png" alt="" class="p-5 flip-horizontal" />
            </div>
            <p class="p-3 text-base">WordPress</p>
         </div>
      </div>
   </div>
</div>

<style>
   .flip-horizontal:hover {
      animation: flip-horizontal 1.0s infinite;
   }

   @keyframes flip-horizontal {
      0% {
         transform: scaleX(1);
      }
      100% {
         transform: scaleX(-1);
      }
   }
</style>
