<script>
   import Navbar from "$lib/components/navbar.svelte";
</script>

<Navbar />

<div class="text-white ">
   <div class="text-5xl flex gap-3 pt-20 px-20">
      <p class="">
         Technical
         <span class="text-teal-300">Skills</span>
      </p>
   </div>
   <div class="">
   <img src="learn.png" alt=" " class="absolute right-24 w-[380px] md:w-[300px] sm:w-60  sm:block" /></div>
   <div class=" pl-20 pt-4 flex">
      <p class="xl w-1/2">
         I possess a diverse set of technical skills that enable me to tackle
         complex challenges with ease. From developing innovative solutions to
         analyzing data and optimizing processes, I bring a versatile and
         adaptable approach. My expertise lies in leveraging technology to drive
         efficiency, enhance user experiences, and achieve business objectives.
      </p>
   </div>

   <div class="">
      <div class="flex gap-14 pl-20 pt-14 text-center">
         <div class="w-24">
            <div
               class="backdrop-blur bg-[#4B4B4B] rounded-xl bg-opacity-40 w-fit p-4"
            >
               <img src="html.png" alt="" class="p-2 flip-horizontal" />
            </div>
            <p class="p-3 text-base">HTML</p>
         </div>
         <div class="w-24">
            <div
               class="backdrop-blur bg-[#4B4B4B] rounded-xl bg-opacity-40 w-fit p-4"
            >
               <img src="css.png" alt="" class="p-4 flip-horizontal" />
            </div>
            <p class="p-3 text-base">CSS</p>
         </div>
         <div class="w-24">
            <div
               class="backdrop-blur bg-[#4B4B4B] rounded-xl bg-opacity-40 w-fit p-4"
            >
               <img src="svelte.png" alt="" class="p-4 flip-horizontal" />
            </div>
            <p class="p-3 text-base">Svelte</p>
         </div>
         <div class="w-24">
            <div
               class="backdrop-blur bg-[#4B4B4B] rounded-xl bg-opacity-40 w-fit p-4"
            >
               <img src="Tailwind.png" alt="" class="flip-horizontal" />
            </div>
            <p class="p-3 text-base">Tailwind CSS</p>
         </div>
      </div>
      <div class="flex gap-[3.25rem] pl-20 text-center">
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
               class="backdrop-blur bg-[#4B4B4B] rounded-xl bg-opacity-40 w-fit p-1"
            >
               <img src="firebase.png" alt="" class="p-6 flip-horizontal" />
            </div>
            <p class="p-3 text-base">Firebase</p>
         </div>
         <div class="w-24">
            <div
               class="backdrop-blur bg-[#4B4B4B] rounded-xl bg-opacity-40 w-fit p-4"
            >
               <img src="js1.png" alt="" class="p-2 flip-horizontal" />
            </div>
            <p class="p-3 text-base">JavaScript</p>
         </div>
         <div class="w-24">
            <div
               class="backdrop-blur bg-[#4B4B4B] rounded-xl bg-opacity-40 w-fit p-1"
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
      animation: flip-horizontal 0.9s infinite;
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
